function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  // 合并两个数组
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      const temp = left.shift();
      result.push(temp);
    } else {
      const temp = right.shift();
      result.push(temp);
    }
  }
  // 连接剩余的元素
  return result.concat(left).concat(right);
}

console.log(mergeSort([5, 2, 9, 1, 5, 6]));
