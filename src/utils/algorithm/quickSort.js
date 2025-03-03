export function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = start;
  let base = arr[end];

  for (let i = start; i < end; i++) {
    if (arr[i] < base) {
      [arr[i], arr[index]] = [arr[index], arr[i]];
      index++;
    }
  }
  [arr[end], arr[index]] = [arr[index], arr[end]];

  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
  return arr;
}

console.log(quickSort([1, 2, 4, 5, 6, 7, 8, 9, 10, 3], 0, 9));
