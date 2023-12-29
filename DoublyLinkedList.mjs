class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    printAll(){
        let currentNode = this.head;
        let text = "[";

        while(currentNode != null){
            text += currentNode.data;
            currentNode = currentNode.next;

            if(currentNode != null){
                text += ", ";
            }
        }

        text += "]";
        console.log(text);
    }

    clear(){
        this.head = null;
        this.count = 0;
    }

    /**
     * 1. head에 삽입하는 경우
     * 1-1. head에 삽입하면서 길이가 1인 경우
     * 1-2. head에 삽입하면서 길이가 1보다 큰 경우
     * 
     * 2. tail에 삽입하는 경우
     * 
     * 3. 중간에 삽입하는 경우
     */
    insertAt(index, data) {
        if(index < 0 || index > this.count) {
            throw new Error("범위를 넘어 섰습니다.");
        }

        let newNode = new Node(data);

        if(index === 0) {
            newNode.next = this.head;

            if(this.head !== null) {
                this.head.prev = newNode;
            }
            this.head = newNode;
        } else if (index === this.count) {
            newNode.prev = this.tail;

            if(this.tail !== null) {
                this.tail.next = newNode;
            }
        } else {
            let currentNode = this.head;

            for(let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next;
            }

            newNode.prev = currentNode;
            newNode.next = currentNode.next;
            currentNode.next.prev = newNode;
            currentNode.next = newNode;
        }

        if(newNode.next === null) {
            this.tail = newNode;
        }

        this.count++;
    }

    insertLast(data) {
        this.insertAt(this.count, data);
    }

    /**
     * 1. head를 삭제 하는경우
     * 1-1 head를 삭제하는데 길이가 1인 경우
     * 1-2 head를 삭제하는데 길이가 1보다 큰 경우
     * 
     * 2. tail을 삭제하는 경우
     * 
     * 3. 중간을 삭제 하는 경우
     */
    deleteAt(index) {
        if(index >= this.count || index < 0){
            throw new Error("제거할 수 없습니다.");
        }


        if(index === 0) {
            let deletedNode = this.head;
            
            if(this.head.next === null) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
            this.count--;
            return deletedNode;
        } else if(index === this.count - 1) {
            let deletedNode = this.tail;
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
            this.count--;
            return deletedNode;
        } else {
            for(let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next;
            }

            let deletedNode = currentNode.next;
            currentNode.next = currentNode.next.next;
            currentNode.next.prev = currentNode;
            this.count--;
            return deletedNode;
        }
    }

    deleteLast(){
        return this.deleteAt(this.count - 1);
    }

    getNodeAt(index){
        if(index >= this.count || index < 0){
            throw new Error("범위를 넘어갔습니다.");
        }

        let currentNode = this.head;
        for(let i = 0; i < index; i++){
            currentNode = currentNode.next;
        }

        return currentNode;
    }
}

export { Node, DoublyLinkedList }