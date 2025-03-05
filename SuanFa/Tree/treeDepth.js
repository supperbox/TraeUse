/**
 * 二叉树节点的定义
 */
import { TreeNode } from "./treeNode.js";

/**
 * 计算二叉树的最大深度
 * 最大深度是从根节点到最远叶子节点的最长路径上的节点数
 */
function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * 计算二叉树的最小深度
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数
 * 注意：叶子节点是指没有子节点的节点
 */
function minDepth(root) {
  if (root === null) return 0;

  // 如果左子树为空，返回右子树的最小深度加1
  if (root.left === null) return minDepth(root.right) + 1;

  // 如果右子树为空，返回左子树的最小深度加1
  if (root.right === null) return minDepth(root.left) + 1;

  // 如果左右子树都不为空，返回较小的深度加1
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}

// 测试用例
function createTestTree() {
  //       1
  //      / \
  //     2   3
  //    /     \
  //   4       5
  //  /
  // 6
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.right.right = new TreeNode(5);
  root.left.left.left = new TreeNode(6);
  return root;
}

// 运行测试
const testTree = createTestTree();

console.log("二叉树的最大深度:", maxDepth(testTree));
// 预期输出: 4 (路径: 1->2->4->6)

console.log("二叉树的最小深度:", minDepth(testTree));
// 预期输出: 3 (路径: 1->3->5)

// 测试空树
console.log("空树的最大深度:", maxDepth(null));
// 预期输出: 0

console.log("空树的最小深度:", minDepth(null));
// 预期输出: 0