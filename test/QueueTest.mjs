import { Queue } from "../Queue.mjs";

let queue = new Queue();

console.log("===== enqueue() 세 번 호출 =====");
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.front()); // 1

console.log("===== dequeue() 네 번 호출 =====");
console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.dequeue()); // 3
console.log(queue.dequeue()); // null

console.log(`isEmpty: ${queue.isEmpty()}`); // true
