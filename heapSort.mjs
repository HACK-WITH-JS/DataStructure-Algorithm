import { Heap } from "./heap/Heap.mjs";

let heap = new Heap();

heap.insert(5);
heap.insert(3);
heap.insert(2);
heap.insert(4);
heap.insert(1);

let arr = [];
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());

console.log(arr);
