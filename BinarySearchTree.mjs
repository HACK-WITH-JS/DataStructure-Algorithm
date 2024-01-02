import { BinaryTree } from "./binaryTree.mjs";

/**
 * 이진 탐색 트리에서 원하는 노드를 찾기 위해서 보통 부모 노드의 참조를 가지면서 내려간다.
 * 삽입 또는 삭제할 때 부모노드의 참조를 가지고 있어야 하기 때문이다.
 */

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  insert(data) {
    if (this.root === null) {
      this.root = new BinaryTree(data);
      return;
    }
    console.log("삽입할 데이터", data);
    let currentNode = this.root;
    let parentNode = null;

    // currentNode를 통해서 노드가 들어갈 자리를 찾는다.
    // 중복 원소를 허용하지 않으므로 else문에 들어가면 종료한다.
    while (currentNode !== null) {
      parentNode = currentNode;
      console.log("----------------------------------");
      console.log(currentNode);
      console.log("----------------------------------");
      if (currentNode.getData() > data) {
        currentNode = currentNode.getLeftSubTree();
      } else if (currentNode.getData() < data) {
        currentNode = currentNode.getRightSubTree();
      } else {
        return;
      }
    }

    let newNode = new BinaryTree(data);

    // 부모노드와 새로운 노드의 값을 비교하여 서브트리를 연결한다.
    if (parentNode.getData() > data) {
      parentNode.setLeftSubTree(newNode);
    } else {
      parentNode.setRightSubTree(newNode);
    }
  }

  search(targetData) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.getData() === targetData) {
        return currentNode;
      } else if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null;
  }

  remove(targetData) {
    // 가짜 부모 노드를 만든다.
    let fakeParentRootNode = new BinaryTree(0);
    let parentNode = fakeParentRootNode;
    let currentNode = this.root;
    let deletingNode = null;

    fakeParentRootNode.setRightSubTree(this.root);

    while (currentNode !== null && currentNode.getData() !== targetData) {
      parentNode = currentNode;

      if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    // 삭제할 노드가 없는 경우
    if (currentNode === null) {
      return;
    }

    deletingNode = currentNode;

    // deletingNode가 삭제될 때 3가지 경우의 수가 존재
    // 1. 삭제할 노드의 자식 노드가 0개인 경우
    // 2. 삭제할 노드의 자식노드가 1개인 경우
    // 2-1. 삭제할 노드의 자식노드가 왼쪽 노드인 경우
    // 2-2. 삭제할 노드의 자식노드가 오른쪽 노드인 경우
    // 3. 삭제할 노드의 자식노드가 2개인 경우

    if (
      deletingNode.getLeftSubTree() === null &&
      deletingNode.getRightSubTree() === null
    ) {
      // 삭제할 노드의 자식 노드가 0개인 경우
      if (parentNode.getLeftSubTree() === deletingNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else if (
      deletingNode.getLeftSubTree() !== null ||
      deletingNode.getRightSubTree() !== null
    ) {
      //삭제할 노드의 자식 노드가 한개인 경우
      let deletingNodeChild;

      if (deletingNode.getLeftSubTree() !== null) {
        deletingNodeChild = deletingNode.getLeftSubTree();
      } else {
        deletingNodeChild = deletingNode.getRightSubTree();
      }

      if (parentNode.getLeftSubTree() === deletingNode) {
        parentNode.setLeftSubTree(deletingNodeChild);
      } else {
        parentNode.setRightSubTree(deletingNodeChild);
      }
    } else {
      // 삭제할 노드의 자식 노드가 2개인 경우 삭제할 노드의 자식중에서 가장 큰 노드를 올려준다.
      let replacingNode = deletingNode.getLeftSubTree();
      let replacingNodeParent = deletingNode;

      while (replacingNode.getRightSubTree() !== null) {
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      let deletingNodeData = deletingNode.getData();
      deletingNode.setData(replacingNode.getData());

      // TODO 유일하게 이해 안가는 코드;
      if (replacingNodeParent.getLeftSubTree() === replacingNode) {
        // 대체될 노드의 오른쪽에는 더 큰 노드가 없다. => 자식 노드를 부모 노드랑 연결
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else {
        // 대체될 노드의 오른쪽에는 더 큰 노드가 없다.(자식 노드 중 가장 큰 값이므로) => 자식 노드를 부모 노드랑 연결
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }

      deletingNode = replacingNode;
      deletingNode.setData(deletingNodeData);
    }

    if (fakeParentRootNode.getRightSubTree() !== this.root) {
      this.root = fakeParentRootNode.getRightSubTree();
    }

    return deletingNode;
  }
}

export { BinarySearchTree };
