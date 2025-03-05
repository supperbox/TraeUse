function bubbleSort(arr) {
  let n = arr.length;
  // 外层循环控制趟数
  for (let i = 0; i < n - 1; i++) {
    // 内层循环控制每一趟的比较次数
    for (let j = 0; j < n - 1 - i; j++) {
      // 如果前一个元素大于后一个元素，则交换它们
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 3, 8, 4, 2]));
