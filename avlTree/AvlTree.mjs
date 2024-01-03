import { BinaryTree } from "./BinaryTree.mjs";
/**
 * 이진 탐색 트리에서 원하는 노드를 찾기 위해서 보통 부모 노드의 참조를 가지면서 내려간다.
 * 삽입 또는 삭제할 때 부모노드의 참조를 가지고 있어야 하기 때문이다.
 */

class AvlTree {
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

  getHeight(node) {
    if (node === null) {
      return 0;
    } else {
      return node.height;
    }
  }

  updateHeight(node) {
    let leftChildHeight = this.getHeight(node.getLeftSubTree());
    let rightChildHeight = this.getHeight(node.getRightSubTree());
    node.height = Math.max(leftChildHeight, rightChildHeight) + 1;
  }

  getBalanceFactor(node) {
    return (
      this.getHeight(node.getLeftSubTree()) -
      this.getHeight(node.getRightSubTree())
    );
  }

  rotateLeft(node) {
    let childNode = node.getRightSubTree();
    node.setRightSubTree(childNode.getLeftSubTree());
    childNode.setLeftSubTree(node);

    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  rotateRight(node) {
    let childNode = node.getLeftSubTree();
    node.setLeftSubTree(childNode.getRightSubTree());
    childNode.setRightSubTree(node);

    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  rotation(targetNode, data) {
    let balanceFactor = this.getBalanceFactor(targetNode);
    let isRootNode = false;

    if (targetNode === this.root) {
      isRootNode = true;
    }

    // LL 회전이 필요한 경우
    if (balanceFactor < -1 && data > targetNode.getRightSubTree().getData()) {
      targetNode = this.rotateLeft(targetNode);
    } else if (
      balanceFactor > 1 &&
      data < targetNode.getLeftSubTree().getData()
    ) {
      // RR 회전이 필요한 경우
      targetNode = this.rotateRight(targetNode);
    } else if (
      balanceFactor > 1 &&
      data > targetNode.getLeftSubTree().getData()
    ) {
      // LR회전이 필요한 경우
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree()));
      targetNode = this.rotateRight(targetNode);
    } else if (
      balanceFactor < -1 &&
      data < targetNode.getRightSubTree().getData()
    ) {
      // RL회전이 필요한 경우
      targetNode.setRightSubTree(
        this.rotateRight(targetNode.getRightSubTree())
      );
      targetNode = this.rotateLeft(targetNode);
    }

    if (isRootNode) {
      this.root = targetNode;
    }

    return targetNode;
  }

  getUnBalanceNode(targetRootNode, unBalanceNode = null) {
    if (
      targetRootNode.getLeftSubTree() === null &&
      targetRootNode.getRightSubTree() === null
    ) {
      unBalanceNode = targetRootNode;
      return unBalanceNode;
    }

    let balanceFactor = this.getBalanceFactor(targetRootNode);
    if (balanceFactor > 0) {
      unBalanceNode = this.getBalanceFactor(
        targetRootNode.getLeftSubTree(),
        unBalanceNode
      );
    } else if (balanceFactor < 0) {
      unBalanceNode = this.getUnBalanceNode(
        targetRootNode.getRightSubTree(),
        unBalanceNode
      );
    } else {
      unBalanceNode = targetRootNode.getRightSubTree();
    }

    return unBalanceNode;
  }

  insert(targetRootNode, data) {
    if (targetRootNode === null) {
      targetRootNode = new BinaryTree(data);
    }

    if (this.root === null) {
      this.root = targetRootNode;
    } else if (targetRootNode.getData() === data) {
      return targetRootNode;
    } else if (targetRootNode.getData() > data) {
      targetRootNode.setLeftSubTree(
        this.insert(targetRootNode.getLeftSubTree(), data)
      );
    } else {
      targetRootNode.setRightSubTree(
        this.insert(targetRootNode.getRightSubTree(), data)
      );
    }

    this.updateHeight(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, data);

    return targetRootNode;
  }

  remove(targetRootNode, data, parentNode = null) {
    if (
      targetRootNode.getData() > data &&
      targetRootNode.getLeftSubTree() !== null
    ) {
      targetRootNode.setLeftSubTree(
        this.remove(targetRootNode.getLeftSubTree(), data, targetRootNode)
      );
    } else if (
      targetRootNode.getData() < data &&
      targetRootNode.getRightSubTree() !== null
    ) {
      targetRootNode.setRightSubTree(
        this.remove(targetRootNode.getRightSubTree(), data, targetRootNode)
      );
    } else if (targetRootNode.getData() === data) {
      targetRootNode = this.removeHelper(targetRootNode, parentNode);

      if (parentNode === null && targetRootNode !== null) {
        this.updateHeight(targetRootNode);
        let unBalanceNode = this.getUnBalanceNode(targetRootNode);
        targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());
      }

      return targetRootNode;
    }

    this.updateHeight(targetRootNode);
    let unBalanceNode = this.getUnBalanceNode(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());
    return targetRootNode;
  }

  removeHelper(deletingNode, parentNode) {
    let fakeParentRootNode = new BinaryTree(0);
    fakeParentRootNode.setRightSubTree(this.root);

    if (parentNode == null) {
      parentNode = fakeParentRootNode;
    }

    let deletingNodeChild = null;
    if (
      deletingNode.getLeftSubTree() == null &&
      deletingNode.getRightSubTree() == null
    ) {
      if (parentNode.getLeftSubTree() == deletingNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else if (
      deletingNode.getLeftSubTree() == null ||
      deletingNode.getRightSubTree() == null
    ) {
      if (deletingNode.getLeftSubTree() != null) {
        deletingNodeChild = deletingNode.getLeftSubTree();
      } else {
        deletingNodeChild = deletingNode.getRightSubTree();
      }

      if (parentNode.getLeftSubTree() == deletingNode) {
        parentNode.setLeftSubTree(deletingNodeChild);
      } else {
        parentNode.setRightSubTree(deletingNodeChild);
      }
    } else {
      let replacingNode = deletingNode.getLeftSubTree();
      let replacingNodeParent = deletingNode;

      while (replacingNode.getRightSubTree() != null) {
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      let deletingNodeData = deletingNode.getData();
      deletingNode.setData(replacingNode.getData());

      if (replacingNodeParent.getLeftSubTree() == replacingNode) {
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else {
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }

      deletingNodeChild = deletingNode;
    }

    if (fakeParentRootNode.getRightSubTree() != this.root) {
      this.root = fakeParentRootNode.getRightSubTree();
    }

    return deletingNodeChild;
  }
}

export { AvlTree };
