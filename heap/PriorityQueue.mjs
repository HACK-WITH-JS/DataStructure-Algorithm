import { Heap } from "./Heap.mjs";

class PriorityQueue {
  constructor() {
    this.heap = new Heap();
  }

  enqueue(data) {
    this.heap.insert(data);
  }

  dequeue() {
    return this.heap.remove();
  }
}
