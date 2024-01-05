import { Heap } from "../heap/Heap.mjs";

let heap = new Heap();
heap.insert(4);
heap.insert(2);
heap.insert(5);
heap.insert(1);
heap.insert(7);

heap.root.inOrderTraversal(heap.root);

console.log(heap.root);

console.log("========== remove ============");
console.log(heap.remove(1));

heap.root.inOrderTraversal(heap.root);
