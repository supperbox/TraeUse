/**
 * 二叉树节点的定义
 */
import { TreeNode } from "./treeNode.js";

/**
 * 判断二叉树是否对称
 * 一个二叉树是对称的，当且仅当它的左右子树镜像对称
 */
function isSymmetric(root) {
  if (root === null) return true;
  return isMirror(root.left, root.right);
}

/**
 * 判断两个子树是否镜像对称
 * 两个树互为镜像当且仅当：
 * 1. 它们的根节点值相等
 * 2. 每个树的左子树与另一个树的右子树镜像对称
 */
function isMirror(left, right) {
  // 如果两个节点都为空，则对称
  if (left === null && right === null) return true;

  // 如果只有一个节点为空，则不对称
  if (left === null || right === null) return false;

  // 当前节点值相等，且左右子树互为镜像
  return (
    left.val === right.val &&
    isMirror(left.left, right.right) &&
    isMirror(left.right, right.left)
  );
}

// 测试用例
function createSymmetricTree() {
  //      1
  //     / \
  //    2   2
  //   / \ / \
  //  3  4 4  3
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(2);
  root.left.left = new TreeNode(3);
  root.left.right = new TreeNode(4);
  root.right.left = new TreeNode(4);
  root.right.right = new TreeNode(3);
  return root;
}

function createAsymmetricTree() {
  //      1
  //     / \
  //    2   2
  //   / \ / \
  //  3  4 3  4
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(2);
  root.left.left = new TreeNode(3);
  root.left.right = new TreeNode(4);
  root.right.left = new TreeNode(3);
  root.right.right = new TreeNode(4);
  return root;
}

// 运行测试
const symmetricTree = createSymmetricTree();
const asymmetricTree = createAsymmetricTree();

console.log("对称二叉树测试:", isSymmetric(symmetricTree));
// 预期输出: true

console.log("非对称二叉树测试:", isSymmetric(asymmetricTree));
// 预期输出: false

console.log("空树测试:", isSymmetric(null));
// 预期输出: true