/**
 * 二叉树节点的定义
 */
import { TreeNode } from "./treeNode.js";

/**
 * 前序遍历（递归实现）
 * 遍历顺序：根节点 -> 左子树 -> 右子树
 */
function preorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) return;

    result.push(node.val); // 访问根节点
    traverse(node.left); // 遍历左子树
    traverse(node.right); // 遍历右子树
  }

  traverse(root);
  return result;
}

/**
 * 中序遍历（递归实现）
 * 遍历顺序：左子树 -> 根节点 -> 右子树
 */
function inorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) return;

    traverse(node.left); // 遍历左子树
    result.push(node.val); // 访问根节点
    traverse(node.right); // 遍历右子树
  }

  traverse(root);
  return result;
}

/**
 * 后序遍历（递归实现）
 * 遍历顺序：左子树 -> 右子树 -> 根节点
 */
function postorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) return;

    traverse(node.left); // 遍历左子树
    traverse(node.right); // 遍历右子树
    result.push(node.val); // 访问根节点
  }

  traverse(root);
  return result;
}

// 测试用例
function createTestTree() {
  //     1
  //    / \
  //   2   3
  //  / \   \
  // 4   5   6
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  root.right.right = new TreeNode(6);
  return root;
}

// 运行测试
const testTree = createTestTree();

console.log("前序遍历结果:", preorderTraversal(testTree));
// 预期输出: [1, 2, 4, 5, 3, 6]

console.log("中序遍历结果:", inorderTraversal(testTree));
// 预期输出: [4, 2, 5, 1, 3, 6]

console.log("后序遍历结果:", postorderTraversal(testTree));
// 预期输出: [4, 5, 2, 6, 3, 1]