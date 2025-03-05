/**
 * 0-1背包问题 (0-1 Knapsack Problem)
 *
 * 问题描述：
 * 给定n个物品，每个物品有一个重量weight和一个价值value。
 * 现在有一个容量为capacity的背包，请问如何选择物品放入背包，使得物品的总重量不超过背包容量，且物品的总价值最大。
 * 每个物品只能使用一次（0-1）。
 *
 * 示例：
 * 输入:
 * weights = [2, 3, 4, 5]
 * values = [3, 4, 5, 6]
 * capacity = 8
 *
 * 输出: 10
 * 解释: 选择重量为3和5的物品，总重量为8，总价值为10
 *
 * 约束条件：
 * 1 <= n <= 1000
 * 1 <= capacity <= 1000
 * 1 <= weights[i], values[i] <= 1000
 */

function knapsack(weights, values, capacity) {
  // 在这里实现你的解决方案
}

// 测试用例
const testCases = [
  {
    weights: [2, 3, 4, 5],
    values: [3, 4, 5, 6],
    capacity: 8,
    expected: 10,
    description: "基本测试用例",
  },
  {
    weights: [1, 2, 3],
    values: [6, 10, 12],
    capacity: 5,
    expected: 22,
    description: "小型背包测试用例",
  },
  {
    weights: [2, 2, 2, 2],
    values: [2, 2, 2, 2],
    capacity: 7,
    expected: 6,
    description: "相同重量和价值的测试用例",
  },
  {
    weights: [1, 3, 4, 5],
    values: [1, 4, 5, 7],
    capacity: 7,
    expected: 9,
    description: "需要精确选择的测试用例",
  },
];

// 运行测试
testCases.forEach((test, index) => {
  const result = knapsack(test.weights, test.values, test.capacity);
  console.log(`测试用例 ${index + 1} (${test.description}):`);
  console.log(`重量: [${test.weights}]`);
  console.log(`价值: [${test.values}]`);
  console.log(`容量: ${test.capacity}`);
  console.log(`期望输出: ${test.expected}`);
  console.log(`实际输出: ${result}`);
  console.log(`结果: ${result === test.expected ? "通过" : "失败"}\n`);
});
