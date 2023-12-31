/**
 * 단방향 연결리스트의 노드
 * @data 노드의 데이터
 * @next 다음 노드의 참조
 */
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * 단방향 연결리스트
 * @head 연결리스트의 맨 앞 노드 null가능
 * @count 연결리스트의 노드의 개수
 */
class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  printAll() {
    let currentNode = this.head;
    let text = "[";

    while (currentNode !== null) {
      text += currentNode.data;
      currentNode = currentNode.next;

      if (currentNode !== null) {
        text += ", ";
      }
    }

    text += "]";
    console.log(text);
  }

  clear() {
    this.head = null;
    this.count = 0;
  }

  /**
   * 구현시 신경 쓸 포인트
   * 1. index = 0인 경우와 아닌 경우를 분기 처리 한다.
   * 2. 0이 아닐 경우는 index - 1 까지 탐색후 노드들을 연결한다.
   */
  insertAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }

    let newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }

      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data);
  }

  /**
   * 구현시 신경 쓸 포인트
   * 1. 첫 원소를 삭제 하는지 안하는지 분기 처리한다.
   * 2. 첫 원소 삭제가 아닐 경우 삭제하기 전 원소의 노드의 참조를 찾아서 다음 다음 노드로 연결한다.
   */
  deleteAt(index) {
    if (index > this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }

    let currentNode = this.head;

    if (index === 0) {
      let deletedNode = this.head;
      this.head = this.head.next;
      this.count--;
      return deletedNode;
    } else {
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }

      let deletedNode = currentNode.next;
      currentNode.next = currentNode.next.next;
      this.count--;
      return deletedNode;
    }
  }

  deleteLast() {
    return this.deleteAt(this.count - 1);
  }

  getNodeAt(index) {
    if (index > this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }

    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}

export { Node, LinkedList };
