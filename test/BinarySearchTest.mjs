import { binarySearch } from "../binarySearch.mjs";

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let index = binarySearch(arr, 3, 0, arr.length - 1);
console.log(`index: ${index}`);
