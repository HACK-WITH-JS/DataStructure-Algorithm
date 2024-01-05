class Node {
  constructor() {
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let currentNode = this.root;

    for (let char of word) {
      if (currentNode.children[char] !== undefined) {
        currentNode = currentNode.children[char];
      } else {
        let newNode = new Node();
        currentNode.children[char] = newNode;
        currentNode = newNode;
      }
    }

    currentNode.children["*"] = 0;
  }

  search(word) {
    let currentNode = this.root;

    for (let char of word) {
      if (currentNode.children[char] !== undefined) {
        currentNode = currentNode.children[char];
      } else {
        return null;
      }
    }

    return currentNode;
  }
}

export { Trie };
