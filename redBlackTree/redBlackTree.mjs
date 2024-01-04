import { BinaryTree, RED, BLACK } from "./BinaryTree.mjs";

/**
 * 이진 탐색 트리에서 원하는 노드를 찾기 위해서 보통 부모 노드의 참조를 가지면서 내려간다.
 * 삽입 또는 삭제할 때 부모노드의 참조를 가지고 있어야 하기 때문이다.
 */

class RedBlackTree {
  constructor(rootNode = null) {
    this.root = rootNode;
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

  rotateLeft(node) {
    let parent = node.getParent();
    let rightChild = node.getRightSubTree();

    node.setRightSubTree(rightChild.getLeftSubTree());

    if (rightChild.getLeftSubTree() !== null) {
      rightChild.getLeftSubTree().setParent(node);
    }

    rightChild.setLeftSubTree(node);
    node.setParent(rightChild);

    this.replaceParentsChild(parent, node, rightChild);
  }

  rotateRight(node) {
    let parent = node.getParent();
    let leftChild = node.getLeftSubTree();

    node.setLeftSubTree(leftChild.getRightSubTree());

    if (leftChild.getRightSubTree() !== null) {
      leftChild.getRightSubTree().setParent(node);
    }

    leftChild.setRightSubTree(node);
    node.setParent(leftChild);

    this.replaceParentsChild(parent, node, leftChild);
  }

  replaceParentsChild(parent, oldChild, newChild) {
    if (parent === null) {
      this.root = newChild;
    } else if (parent.getLeftSubTree() === oldChild) {
      parent.setLeftSubTree(newChild);
    } else if (parent.getRightSubTree() === oldChild) {
      parent.setRightSubTree(newChild);
    }

    if (newChild !== null) {
      newChild.setParent(parent);
    }
  }

  insert(data) {
    let current = this.root;
    let parent = null;

    while (current !== null) {
      parent = current;
      if (data < current.getData()) {
        current = current.getLeftSubTree();
      } else if (data > current.getData()) {
        current = current.getRightSubTree();
      } else {
        return;
      }
    }

    let newNode = new BinaryTree(data);

    if (parent === null) {
      this.root = newNode;
    } else if (data < parent.getData()) {
      parent.setLeftSubTree(newNode);
    } else {
      parent.setRightSubTree(newNode);
    }

    newNode.setParent(parent);
    this.rebalanceAfterInsertion(newNode);
  }

  rebalanceAfterInsertion(node) {
    let parent = node.getParent();

    if (parent === null) {
      node.color = BLACK;
      return;
    }

    if (parent.color === BLACK) {
      return;
    }
    // 여기 오면 부모 노드는 무조건 빨간색
    let uncle = this.getUncle(parent);
    let grandParent = parent.getParent();
    if (uncle !== null && uncle.color === RED) {
      parent.color = BLACK;
      uncle.color = BLACK;
      grandParent.color = RED;
      this.rebalanceAfterInsertion(grandParent);
    } else if (this.isBlack(uncle)) {
      if (
        grandParent.getRightSubTree() === parent &&
        parent.getLeftSubTree() === node
      ) {
        this.rotateRight(parent);
        this.rotateLeft(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
      } else if (
        grandParent.getLeftSubTree() === parent &&
        parent.getRightSubTree() === node
      ) {
        this.rotateLeft(parent);
        this.rotateRight(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
      } else if (
        grandParent.getRightSubTree() === parent &&
        parent.getRightSubTree() === node
      ) {
        this.rotateLeft(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      } else if (
        grandParent.getLeftSubTree() === parent &&
        parent.getLeftSubTree() === node
      ) {
        this.rotateRight(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      }
    }
  }

  getUncle(parent) {
    let grandParent = parent.getParent();
    if (grandParent.getLeftSubTree() === parent) {
      return grandParent.getRightSubTree();
    } else if (grandParent.getRightSubTree() === parent) {
      return grandParent.getLeftSubTree();
    }

    return null;
  }

  isBlack(node) {
    return node === null || node.color === BLACK;
  }

  remove(data) {
    let currentNode = this.root;

    while (currentNode !== null && currentNode.getData() !== data) {
      if (data < currentNode.getData()) {
        currentNode = currentNode.getLeftSubTree();
      } else if (data > currentNode.getData()) {
        currentNode = currentNode.getRightSubTree();
      }
    }

    if (currentNode === null) {
      return;
    }

    let replaceNode = null;
    let deleteNodeColor = RED;

    if (
      currentNode.getLeftSubTree() === null ||
      currentNode.getRightSubTree() === null
    ) {
      replaceNode = this.removeWithZeroOneChild(currentNode);
      deleteNodeColor = currentNode.color;
    } else {
      let succesor = this.getBiggestNode(currentNode.getLeftSubTree());
      currentNode.setData(succesor.getData());
      replaceNode = this.removeWithZeroOneChild(succesor);
      deleteNodeColor = currentNode.color;
    }

    if (deleteNodeColor === BLACK) {
      this.rebalanceAfterDeletion(replaceNode);

      if (replaceNode instanceof NilNode) {
        this.replaceParentsChild(replaceNode.getParent(), replaceNode, null);
      }
    }
  }

  removeWithZeroOneChild(node) {
    if (node.getLeftSubTree() !== null) {
      this.replaceParentsChild(node.getParent(), node, node.getLeftSubTree());
      return node.getLeftSubTree();
    } else if (node.getRightSubTree() !== null) {
      this.replaceParentsChild(node.getParent(), node, node.getRightSubTree());
      return node.getRightSubTree();
    } else {
      let newChild = node.color === BLACK ? new NilNode() : null;
      this.replaceParentsChild(node.getParent(), node, newChild);
      return newChild;
    }
  }

  getBiggestNode(node) {
    while (node.getRightSubTree() !== null) {
      node = node.getRightSubTree();
    }

    return node;
  }

  rebalanceAfterDeletion(node) {
    if (node === this.root) {
      node.color === BLACK;
      return;
    }

    let sibling = this.getSibling(node);

    if (sibling.color === RED) {
      this.handleRedSibling(node, sibling);
      sibling = this.getSibling(node);
    }

    if (this.isBlack(sibling)) {
      if (
        this.isBlack(sibling.getLeftSubTree()) &&
        this.isBlack(sibling.getRightSubTree())
      ) {
        if (node.getParent().color === RED) {
          sibling.color = RED;
          node.getParent().color = BLACK;
        } else {
          sibling.color = RED;
          this.rebalanceAfterDeletion(node.getParent());
        }
      } else {
        this.handleBlackSiblingWithAtLeastOneRedChild(node, sibling);
      }
    }
  }

  getSibling(node) {
    let parent = node.getParent();

    if (node === parent.getLeftSubTree()) {
      return parent.getRightSubTree();
    } else if (node === parent.getRightSubTree()) {
      return parent.getLeftSubTree();
    }
  }

  handleRedSibling(node, sibling) {
    sibling.color = BLACK;
    node.getParent().color = RED;

    if (node.getParent().getLeftSubTree() === node) {
      this.rotateLeft(node.getParent());
    } else {
      this.rotateRight(node.getParent());
    }
  }

  handleBlackSiblingWithAtLeastOneRedChild(node, sibling) {
    let nodeIsLeftChild = node.getParent().getLeftSubTree() === node;

    if (nodeIsLeftChild === true && this.isBlack(sibling.getRightSubTree())) {
      sibling.getLeftSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateRight(sibling);
      sibling = node.getParent().getRightSubTree();
    } else if (
      nodeIsLeftChild === false &&
      this.isBlack(sibling.getLeftSubTree())
    ) {
      sibling.getRightSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateLeft(sibling);
      sibling = node.getParent().getLeftSubTree();
    }

    sibling.color = node.getParent().color;
    node.getParent().color = BLACK;

    if (nodeIsLeftChild) {
      sibling.getRightSubTree().color = BLACK;
      this.rotateLeft(node.getParent());
    } else {
      sibling.getLeftSubTree().color = BLACK;
      this.rotateRight(node.getParent());
    }
  }
}

class NilNode extends BinaryTree {
  constructor() {
    super(0);
    this.color = BLACK;
  }
}

export { RedBlackTree };
