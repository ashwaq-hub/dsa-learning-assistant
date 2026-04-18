import { NextRequest, NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const FILE_PATH = 'src/data/customProblems.json';

function getGitHubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function getFileFromGitHub() {
  const { GITHUB_OWNER, GITHUB_REPO } = process.env;
  const url = `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
  const res = await fetch(url, { headers: getGitHubHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function GET() {
  try {
    const file = await getFileFromGitHub();
    const content = Buffer.from(file.content, 'base64').toString('utf-8');
    const problems = JSON.parse(content);
    return NextResponse.json(problems);
  } catch (error) {
    console.error('Failed to fetch problems from GitHub:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { GITHUB_OWNER, GITHUB_REPO } = process.env;
    const newProblem = await req.json();

    const file = await getFileFromGitHub();
    const currentContent = Buffer.from(file.content, 'base64').toString('utf-8');
    const problems = JSON.parse(currentContent);

    problems.push(newProblem);

    const updatedContent = Buffer.from(JSON.stringify(problems, null, 2)).toString('base64');

    const url = `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { ...getGitHubHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `feat: add problem "${newProblem.title}"`,
        content: updatedContent,
        sha: file.sha,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`GitHub commit failed: ${JSON.stringify(error)}`);
    }

    return NextResponse.json(newProblem, { status: 201 });
  } catch (error) {
    console.error('Failed to save problem to GitHub:', error);
    return NextResponse.json({ error: 'Failed to save problem' }, { status: 500 });
  }
}
