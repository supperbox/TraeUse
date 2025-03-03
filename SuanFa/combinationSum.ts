/**
 * 找出所有可能的组合，使得组合中的数字之和等于目标值
 * 数组中的数字可以重复使用
 * @param candidates 候选数字数组
 * @param target 目标值
 * @returns 所有可能的组合
 */
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  function backtrack(remain: number, current: number[], start: number) {
    if (remain === 0) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remain) continue;

      current.push(candidates[i]);
      backtrack(remain - candidates[i], current, i); // 注意这里传入i而不是i+1，因为可以重复使用
      current.pop();
    }
  }

  backtrack(target, [], 0);
  return result;
}

// 测试用例
const testCases = [
  {
    candidates: [2, 3, 6, 7],
    target: 7,
    description: "基本测试用例",
  },
  {
    candidates: [2, 3, 5],
    target: 8,
    description: "多个解的测试用例",
  },
  {
    candidates: [2],
    target: 1,
    description: "无解的测试用例",
  },
  {
    candidates: [],
    target: 1,
    description: "空数组测试用例",
  },
  {
    candidates: [1],
    target: 3,
    description: "单个数字重复使用的测试用例",
  },
  {
    candidates: [-1, 1],
    target: 0,
    description: "包含负数的测试用例",
  },
];

// 运行测试用例
testCases.forEach((testCase, index) => {
  console.log(`\n测试用例 ${index + 1}: ${testCase.description}`);
  console.log(`输入数组: [${testCase.candidates}]`);
  console.log(`目标值: ${testCase.target}`);
  const result = combinationSum(testCase.candidates, testCase.target);
  console.log("结果:", result);
  console.log(`找到 ${result.length} 个组合`);
});
