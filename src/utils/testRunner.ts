/**
 * Test Runner Utility
 * Executes code against pre-defined test cases and validates output
 */

export interface TestCase {
  input: string;
  output: string;
  description: string;
}

export interface TestResult {
  passed: boolean;
  message: string;
  input: string;
  expected: string;
  actual: string;
}

/**
 * Parses test input based on problem type
 * Converts string format to actual values
 */
export const parseTestInput = (input: string, problemType: string): string => {
  switch (problemType) {
    case 'two-sum':
      // Format: "2,7,11,15|9"
      // Converts to: nums = [2,7,11,15], target = 9
      const [numsStr, target] = input.split('|');
      return JSON.stringify({
        nums: numsStr.split(',').map(Number),
        target: Number(target)
      });

    case 'array-sort':
      // Format: "5,2,8,1,9"
      return JSON.stringify(input.split(',').map(Number));

    case 'string-reverse':
      // Format: "hello"
      return JSON.stringify(input);

    default:
      return JSON.stringify(input);
  }
};

/**
 * Normalizes output for comparison
 * Removes whitespace, brackets, etc.
 */
export const normalizeOutput = (output: string): string => {
  return output
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[\[\]]/g, '');
};

/**
 * Compares actual output with expected output
 */
export const compareOutputs = (actual: string, expected: string): boolean => {
  const normalizedActual = normalizeOutput(actual);
  const normalizedExpected = normalizeOutput(expected);

  return normalizedActual === normalizedExpected;
};

/**
 * Runs a single test case
 */
export const runTestCase = (
  testCase: TestCase,
  actualOutput: string
): TestResult => {
  const passed = compareOutputs(actualOutput, testCase.output);

  return {
    passed,
    message: testCase.description,
    input: testCase.input,
    expected: testCase.output,
    actual: actualOutput.trim()
  };
};

/**
 * Runs all test cases and returns results
 */
export const runAllTestCases = (
  testCases: TestCase[],
  outputs: string[]
): TestResult[] => {
  return testCases.map((testCase, index) => {
    const actualOutput = outputs[index] || '';
    return runTestCase(testCase, actualOutput);
  });
};

/**
 * Generates a test summary
 */
export const generateTestSummary = (results: TestResult[]): string => {
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const percentage = Math.round((passed / total) * 100);

  const summary = `Test Results: ${passed}/${total} passed (${percentage}%)\n\n`;

  const details = results
    .map((result, idx) => {
      const icon = result.passed ? '✅' : '❌';
      return `${icon} Test ${idx + 1}: ${result.message}\n   Input: ${result.input}\n   Expected: ${result.expected}\n   Got: ${result.actual}`;
    })
    .join('\n\n');

  return summary + details;
};

/**
 * Pre-defined test cases for common problems
 */
export const PROBLEM_TEST_CASES: Record<string, TestCase[]> = {
  'two-sum': [
    {
      input: '2,7,11,15|9',
      output: '0,1',
      description: 'Example 1: nums = [2,7,11,15], target = 9'
    },
    {
      input: '3,2,4|6',
      output: '1,2',
      description: 'Example 2: nums = [3,2,4], target = 6'
    },
    {
      input: '3,3|6',
      output: '0,1',
      description: 'Duplicate values: nums = [3,3], target = 6'
    },
    {
      input: '1,2,3,4,5,6|11',
      output: '4,5',
      description: 'Larger array: nums = [1,2,3,4,5,6], target = 11'
    },
    {
      input: '-1,0,1,2,-1,-4|0',
      output: '1,2',
      description: 'Negative numbers: nums = [-1,0,1,2,-1,-4], target = 0'
    }
  ],
  'reverse-string': [
    {
      input: 'hello',
      output: 'olleh',
      description: 'Basic string: "hello"'
    },
    {
      input: 'hello world',
      output: 'dlrow olleh',
      description: 'String with space: "hello world"'
    },
    {
      input: 'a',
      output: 'a',
      description: 'Single character: "a"'
    }
  ],
  'palindrome-check': [
    {
      input: 'racecar',
      output: 'true',
      description: 'Valid palindrome: "racecar"'
    },
    {
      input: 'hello',
      output: 'false',
      description: 'Not a palindrome: "hello"'
    },
    {
      input: 'a',
      output: 'true',
      description: 'Single character: "a"'
    }
  ]
};

/**
 * Gets test cases for a problem
 */
export const getTestCases = (problemId: string): TestCase[] => {
  return PROBLEM_TEST_CASES[problemId] || [];
};

/**
 * Validates if a solution passes all test cases
 */
export const validateSolution = (
  problemId: string,
  outputs: string[]
): { passed: boolean; results: TestResult[]; summary: string } => {
  const testCases = getTestCases(problemId);
  const results = runAllTestCases(testCases, outputs);
  const passed = results.every(r => r.passed);
  const summary = generateTestSummary(results);

  return { passed, results, summary };
};
