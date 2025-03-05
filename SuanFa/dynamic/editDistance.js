/**
 * 编辑距离 (Edit Distance)
 *
 * 问题描述：
 * 给定两个字符串word1和word2，返回将word1转换成word2所使用的最少操作数。
 * 你可以对一个字符串进行如下三种操作：
 * 1. 插入一个字符
 * 2. 删除一个字符
 * 3. 替换一个字符
 *
 * 示例：
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将'h'替换为'r')
 * rorse -> rose (删除'r')
 * rose -> ros (删除'e')
 *
 * 约束条件：
 * 0 <= word1.length, word2.length <= 500
 * word1 和 word2 由小写英文字母组成
 */

function minDistance(word1, word2) {
  // 获取两个字符串的长度
  const m = word1.length;
  const n = word2.length;

  // 创建dp数组，dp[i][j]表示word1的前i个字符转换到word2的前j个字符需要的最小操作数
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  // 初始化第一行和第一列
  // 第一行表示word1为空时，转换到word2需要的操作数（即插入操作）
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  // 第一列表示word2为空时，转换到word2需要的操作数（即删除操作）
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  // 填充dp数组
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 如果当前字符相同，不需要操作
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 如果当前字符不同，取三种操作中的最小值
        // 1. 替换操作：dp[i-1][j-1] + 1
        // 2. 插入操作：dp[i][j-1] + 1
        // 3. 删除操作：dp[i-1][j] + 1
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // 替换
          dp[i][j - 1] + 1, // 插入
          dp[i - 1][j] + 1 // 删除
        );
      }
    }
  }

  // 返回右下角的值，即将word1转换为word2所需的最小操作数
  return dp[m][n];
}

// 测试用例
const testCases = [
  {
    word1: "horse",
    word2: "ros",
    expected: 3,
    description: "基本测试用例",
  },
  {
    word1: "intention",
    word2: "execution",
    expected: 5,
    description: "较长字符串测试用例",
  },
  {
    word1: "",
    word2: "abc",
    expected: 3,
    description: "空字符串测试用例",
  },
  {
    word1: "abc",
    word2: "abc",
    expected: 0,
    description: "相同字符串测试用例",
  },
  {
    word1: "plasma",
    word2: "altruism",
    expected: 6,
    description: "完全不同的字符串测试用例",
  },
];

// 运行测试
testCases.forEach((test, index) => {
  const result = minDistance(test.word1, test.word2);
  console.log(`测试用例 ${index + 1} (${test.description}):`);
  console.log(`输入1: "${test.word1}"`);
  console.log(`输入2: "${test.word2}"`);
  console.log(`期望输出: ${test.expected}`);
  console.log(`实际输出: ${result}`);
  console.log(`结果: ${result === test.expected ? "通过" : "失败"}\n`);
});
