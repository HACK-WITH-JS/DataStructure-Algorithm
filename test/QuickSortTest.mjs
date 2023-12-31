import { QuickSort } from "../QuickSort.mjs";

let arr = [4, 2, 3, 1];

console.log("===== 정렬 전 =====");
console.log(arr);

QuickSort(arr, 0, arr.length - 1);

console.log("===== 정렬 후 =====");
console.log(arr);
