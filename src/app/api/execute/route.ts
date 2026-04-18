import { NextRequest, NextResponse } from 'next/server';

// Judge0 API Configuration
const JUDGE0_API = 'https://ce.judge0.com';

interface ExecutionRequest {
  language: string;
  code: string;
}

// Language ID mapping for Judge0
const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
  go: 60,
  c: 50,
  cpp: 54,
  csharp: 51,
};

/**
 * POST /api/execute
 * Execute code using Judge0 API
 */
export async function POST(request: NextRequest) {
  try {
    const body: ExecutionRequest = await request.json();
    const { language, code } = body;

    // Validate input
    if (!language || !code) {
      return NextResponse.json(
        { error: 'Language and code are required' },
        { status: 400 }
      );
    }

    if (!languageMap[language]) {
      return NextResponse.json(
        { error: `Language "${language}" is not supported` },
        { status: 400 }
      );
    }

    const languageId = languageMap[language];

    // Submit code to Judge0
    const submitResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: '',
      }),
    });

    if (!submitResponse.ok) {
      throw new Error(`Judge0 API error: ${submitResponse.statusText}`);
    }

    const result = await submitResponse.json();

    return NextResponse.json({
      success: true,
      language,
      output: result.stdout || '',
      error: result.stderr || '',
      exitCode: result.status?.id === 3 ? 0 : 1,
      status: result.status?.description || 'Unknown',
    });
  } catch (error) {
    console.error('Code execution error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Code execution failed',
        success: false
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/execute
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    message: 'Code Execution API is running',
    languages: Object.keys(languageMap),
  });
}
