import { NextRequest, NextResponse } from 'next/server';

// Judge0 API Configuration
const JUDGE0_API = 'https://ce.judge0.com';

interface ExecutionRequest {
  language: string;
  code: string;
}

// Language ID mapping for Judge0
const languageMap: Record<string, number> = {
  javascript: 63,    // Node.js
  python: 71,        // Python 3
  java: 91,          // Java (OpenJDK 13.0.1) - UPDATED
  go: 60,            // Go
  c: 50,             // C
  cpp: 54,           // C++
  csharp: 51,        // C#
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

    // Judge0 status codes: 1=Queue, 2=Processing, 3=Accepted, 4+=Error
    const isSuccess = result.status?.id === 3;
    const hasCompileError = result.status?.id === 6;
    const hasRuntimeError = result.status?.id >= 7 && result.status?.id <= 12;

    // Capture output from different possible response formats
    const output = result.stdout || result.output || '';
    const error = result.stderr || '';
    const compileError = result.compile_output || '';

    return NextResponse.json({
      success: isSuccess,
      language,
      output: output,
      error: error || compileError,
      exitCode: isSuccess ? 0 : 1,
      status: result.status?.description || 'Unknown',
      statusId: result.status?.id,
      message: isSuccess ? 'Code executed successfully' : `Execution failed with status: ${result.status?.description}`,
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
