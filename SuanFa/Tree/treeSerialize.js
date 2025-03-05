/**
 * 二叉树的序列化与反序列化
 *
 * 问题描述：
 * 设计一个算法，来序列化和反序列化二叉树。序列化是将一个数据结构或对象转换为
 * 一个位序列的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，
 * 以便稍后在同一个或另一个计算机环境中重建。
 *
 * 注意：不限制你的序列化/反序列化算法。你只需要确保二叉树可以被序列化为字符串，
 * 并且这个字符串可以被反序列化为原始的树结构。
 */

import { TreeNode } from "./treeNode.js";

/**
 * 将二叉树序列化为字符串
 * @param {TreeNode} root - 二叉树的根节点
 * @return {string} - 序列化后的字符串
 */
function serialize(root) {
  // 在这里实现序列化逻辑
  if (root === null) {
    return ["null"];
  }
  let res = [];
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    if (node === null) {
      res.push("null");
    } else {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  return res;
}

/**
 * 将字符串反序列化为二叉树
 * @param {string} data - 序列化的字符串
 * @return {TreeNode} - 重建的二叉树根节点
 */
function deserialize(data) {
  // 在这里实现反序列化逻辑
  if (!data.length) {
    return null;
  }

  let root = new TreeNode(data.shift());
  let queue = [root];

  while (queue.length) {
    let node = queue.shift();
    if (data.length) {
      const temp = data.shift();
      node.left = temp === "null" ? null : new TreeNode(temp);
      if (node.left) {
        queue.push(node.left);
      }
      const temp2 = data.shift();
      node.right = temp2 === "null" ? null : new TreeNode(temp2);
      if (node.right) {
        queue.push(node.right);
      }
    } else {
      node.left = null;
      node.right = null;
    }
  }

  return root;
}

// 测试用例
function runTests() {
  // 测试用例1：普通二叉树
  const tree1 = new TreeNode(1);
  tree1.left = new TreeNode(2);
  tree1.right = new TreeNode(3);
  tree1.left.left = new TreeNode(4);
  tree1.right.right = new TreeNode(5);

  console.log("测试用例1 - 普通二叉树");
  const serialized1 = serialize(tree1);
  console.log("序列化结果:", serialized1);
  const deserialized1 = deserialize(serialized1);
  console.log("反序列化后进行前序遍历:", preorderTraversal(deserialized1));
  // 预期输出: [1, 2, 4, 3, 5]

  // 测试用例2：空树
  console.log("\n测试用例2 - 空树");
  const serialized2 = serialize(null);
  console.log("序列化结果:", serialized2);
  const deserialized2 = deserialize(serialized2);
  console.log("反序列化结果是否为null:", deserialized2 === null);
  // 预期输出: true

  // 测试用例3：单节点树
  const tree3 = new TreeNode(1);
  console.log("\n测试用例3 - 单节点树");
  const serialized3 = serialize(tree3);
  console.log("序列化结果:", serialized3);
  const deserialized3 = deserialize(serialized3);
  console.log("反序列化后的节点值:", deserialized3.val);
  // 预期输出: 1
}

// 辅助函数：前序遍历
function preorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (node === null) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

// 运行测试
runTests();
