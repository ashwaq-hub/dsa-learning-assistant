import { NextRequest, NextResponse } from 'next/server';

interface ResolveRequest {
  code: string;
  language: string;
  problemDescription: string;
  error?: string;
  testResults?: Array<{ passed: boolean; message: string }>;
}

/**
 * POST /api/resolve
 * Use Gemini API to resolve code issues and suggest fixes
 */
export async function POST(request: NextRequest) {
  try {
    const body: ResolveRequest = await request.json();
    const { code, language, problemDescription, error, testResults } = body;

    if (!code || !language || !problemDescription) {
      return NextResponse.json(
        { error: 'Code, language, and problem description are required' },
        { status: 400 }
      );
    }

    // Get Gemini API key from environment
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set GOOGLE_GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Prepare the prompt for Gemini
    const failedTests = testResults?.filter(t => !t.passed) || [];
    const prompt = `You are a helpful coding assistant. Help me fix this ${language} code that is failing tests.

## Problem Description
${problemDescription}

## Current Code
\`\`\`${language}
${code}
\`\`\`

${error ? `## Error Message\n${error}\n` : ''}

${failedTests.length > 0 ? `## Failed Test Cases\n${failedTests.map(t => `- ${t.message}`).join('\n')}\n` : ''}

Please analyze the code and provide:
1. The main issues causing the failures
2. A step-by-step explanation of the fix
3. The corrected code

Be concise and focus on the critical issues first.`;

    // Call Gemini API
    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API error:', errorData);
      throw new Error(
        errorData.error?.message || `Gemini API error: ${geminiResponse.statusText}`
      );
    }

    const result = await geminiResponse.json();
    const resolution =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Unable to generate resolution';

    return NextResponse.json({
      success: true,
      resolution,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resolution error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to resolve code issue',
        success: false,
      },
      { status: 500 }
    );
  }
}
