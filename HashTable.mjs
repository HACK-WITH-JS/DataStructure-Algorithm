import { DoublyLinkedList } from "./DoublyLinkedList.mjs";

class HashData {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

/**
 * 길이가 10인 배열을 통해서 해쉬테이블을 만든다.
 * 간단한 구현을 위해 정수만 이용하여 테이블에 분배한다.
 * 충돌이 일어날 경우 연결리스트에 넣어준다.
 */
class HashTable {
    constructor() {
        this.arr = [];

        for(let i = 0; i < 10; i++) {
            this.arr[i] = new DoublyLinkedList();
        }
    }

    hashFunction(number) {
        return number % 10;
    }

    set(key, value) {
        this.arr[this.hashFunction(key)].insertAt(0, new HashData(key, value));
    }

    get(key) {
        let currentNode = this.arr[this.hashFunction(key)].head;

        while(currentNode !== null) {
            if(currentNode.data.key === key) {
                return currentNode.data.value;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    remove(key) {
        let list = this.arr[this.hashFunction(key)];
        let currentNode = list.head;
        let deletedIndex = 0;
        
        while(currentNode !== null) {
            if(currentNode.data.key === key) {
                return list.deleteAt(deletedIndex);
            }
            currentNode = currentNode.next;
            deletedIndex++;
        }

        return null;
    }
}

export { HashTable };