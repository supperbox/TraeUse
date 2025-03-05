/**
 * 二叉树的最近公共祖先
 *
 * 问题描述：
 * 给定一个二叉树，找到该树中两个指定节点的最近公共祖先（LCA）。
 * 最近公共祖先是指：对于有根树T的两个节点p、q，最近公共祖先表示为一个节点x，
 * 满足x是p、q的祖先且x的深度尽可能大。
 *
 * 说明：
 * - 所有节点的值都是唯一的。
 * - p、q 为不同节点且均存在于给定的二叉树中。
 */

import { TreeNode } from "./treeNode.js";

/**
 * 查找二叉树中两个节点的最近公共祖先
 * @param {TreeNode} root - 二叉树的根节点
 * @param {TreeNode} p - 第一个节点
 * @param {TreeNode} q - 第二个节点
 * @return {TreeNode} - 最近公共祖先节点
 */
function lowestCommonAncestor(root, p, q) {
  // 基本情况：如果根节点为空，或者根节点是p或q中的一个，则返回根节点
  if (root === null || root === p || root === q) {
    return root;
  }

  // 递归搜索左右子树
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果左子树为空，返回右子树的结果
  if (left === null) {
    return right;
  }
  // 如果右子树为空，返回左子树的结果
  if (right === null) {
    return left;
  }
  // 如果左右子树都不为空，说明p和q分别在左右子树中，当前节点就是LCA
  return root;
}

// 测试用例
function runTests() {
  // 构建测试用例的二叉树
  //       3
  //      / \
  //     5   1
  //    / \ / \
  //   6  2 0  8
  //     / \
  //    7   4
  const root = new TreeNode(3);
  root.left = new TreeNode(5);
  root.right = new TreeNode(1);
  root.left.left = new TreeNode(6);
  root.left.right = new TreeNode(2);
  root.right.left = new TreeNode(0);
  root.right.right = new TreeNode(8);
  root.left.right.left = new TreeNode(7);
  root.left.right.right = new TreeNode(4);

  // 测试用例1：p = 5, q = 1
  // 预期结果：3
  const result1 = lowestCommonAncestor(root, root.left, root.right);
  console.log("测试用例1 - 节点5和节点1的LCA:", result1.val);
  // 预期输出: 3

  // 测试用例2：p = 5, q = 4
  // 预期结果：5
  const result2 = lowestCommonAncestor(root, root.left, root.left.right.right);
  console.log("测试用例2 - 节点5和节点4的LCA:", result2.val);
  // 预期输出: 5

  // 测试用例3：p = 6, q = 4
  // 预期结果：5
  const result3 = lowestCommonAncestor(
    root,
    root.left.left,
    root.left.right.right
  );
  console.log("测试用例3 - 节点6和节点4的LCA:", result3.val);
  // 预期输出: 5
}

// 运行测试
runTests();
