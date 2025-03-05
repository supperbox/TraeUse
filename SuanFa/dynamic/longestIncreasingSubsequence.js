/**
 * 最长递增子序列 (Longest Increasing Subsequence)
 * 
 * 问题描述：
 * 给定一个无序的整数数组nums，找到其中最长严格递增子序列的长度。
 * 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
 * 
 * 示例：
 * 输入: nums = [10,9,2,5,3,7,101,18]
 * 输出: 4
 * 解释: 最长递增子序列是 [2,3,7,101]，因此长度为 4。
 * 
 * 约束条件：
 * 1 <= nums.length <= 2500
 * -10^4 <= nums[i] <= 10^4
 */

function lengthOfLIS(nums) {
    // 在这里实现你的解决方案
}

// 测试用例
const testCases = [
    {
        input: [10,9,2,5,3,7,101,18],
        expected: 4,
        description: '基本测试用例'
    },
    {
        input: [0,1,0,3,2,3],
        expected: 4,
        description: '包含重复数字的测试用例'
    },
    {
        input: [7,7,7,7,7,7,7],
        expected: 1,
        description: '所有元素相同的测试用例'
    },
    {
        input: [1,3,6,7,9,4,10,5,6],
        expected: 6,
        description: '复杂序列测试用例'
    }
];

// 运行测试
testCases.forEach((test, index) => {
    const result = lengthOfLIS(test.input);
    console.log(`测试用例 ${index + 1} (${test.description}):`)
    console.log(`输入: [${test.input}]`);
    console.log(`期望输出: ${test.expected}`);
    console.log(`实际输出: ${result}`);
    console.log(`结果: ${result === test.expected ? '通过' : '失败'}\n`);
});