/**
 * 二叉树的路径总和
 *
 * 问题描述：
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，
 * 这条路径上所有节点值相加等于目标和。
 *
 * 说明：叶子节点是指没有子节点的节点。
 */

import { TreeNode } from "./treeNode.js";

/**
 * 判断是否存在路径总和等于目标值的路径
 * @param {TreeNode} root - 二叉树的根节点
 * @param {number} targetSum - 目标和
 * @return {boolean} - 是否存在满足条件的路径
 */
function hasPathSum(root, targetSum) {
  // 在这里实现路径总和判断逻辑
  let res = false;
  const dfs = (root, sum) => {
    if (sum === targetSum) {
      res = true;
    }
    if (!root) return;
    if (!root.left && !root.right) {
      if (sum + root.val === targetSum) res = true;
      return;
    }
    dfs(root.left, sum + root.val);
    dfs(root.right, sum + root.val);
  };

  dfs(root, 0);
  return res;
}

// 测试用例
function runTests() {
  // 测试用例1：存在满足条件的路径
  //      5
  //     / \
  //    4   8
  //   /   / \
  //  11  13  4
  // /  \      \
  //7    2      1
  const tree1 = new TreeNode(5);
  tree1.left = new TreeNode(4);
  tree1.right = new TreeNode(8);
  tree1.left.left = new TreeNode(11);
  tree1.right.left = new TreeNode(13);
  tree1.right.right = new TreeNode(4);
  tree1.left.left.left = new TreeNode(7);
  tree1.left.left.right = new TreeNode(2);
  tree1.right.right.right = new TreeNode(1);

  console.log("测试用例1 - 目标和为22:", hasPathSum(tree1, 22));
  // 预期输出: true (路径: 5->4->11->2)

  // 测试用例2：不存在满足条件的路径
  console.log("测试用例2 - 目标和为10:", hasPathSum(tree1, 10));
  // 预期输出: false

  // 测试用例3：空树
  console.log("测试用例3 - 空树:", hasPathSum(null, 0));
  // 预期输出: false

  // 测试用例4：单节点树，值等于目标和
  const tree2 = new TreeNode(1);
  console.log("测试用例4 - 单节点树，目标和为1:", hasPathSum(tree2, 1));
  // 预期输出: true

  // 测试用例5：单节点树，值不等于目标和
  console.log("测试用例5 - 单节点树，目标和为2:", hasPathSum(tree2, 2));
  // 预期输出: false
}

// 运行测试
runTests();
