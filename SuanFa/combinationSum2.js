/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  let result = [];
  candidates = candidates.sort();
  let map = new Map();
  function Find(newTarget, arr, start) {
    if (newTarget === 0) {
      let str = arr.join("");
      console.log(str);
      if (!map.has(str)) {
        result.push(arr.slice());
      } else {
        map.set(str, str);
      }
      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i] <= newTarget && i > start) {
        arr.push(candidates[i]);
        Find(newTarget - candidates[i], arr, i);
        arr.pop();
      }
    }
  }

  Find(target, [], -1);
  return result;
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
