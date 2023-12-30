import { InsertionSort } from "../InsertionSort.mjs";

let arr = [4,1,5,3,6,2];

console.log("===== 정렬 전 =====");
console.log(arr);

InsertionSort(arr);

console.log("===== 정렬 후 =====");
console.log(arr);