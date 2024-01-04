const RED = false;
const BLACK = true;

class BinaryTree {
  constructor(data) {
    this.data = data;
    this.leftTree = null;
    this.rightTree = null;
    this.parentTree = null;

    this.color = RED;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeftSubTree() {
    return this.leftTree;
  }

  getRightSubTree() {
    return this.rightTree;
  }

  setLeftSubTree(tree) {
    this.leftTree = tree;
  }

  setRightSubTree(tree) {
    this.rightTree = tree;
  }

  preOrderTraversal(tree) {
    if (tree === null) {
      return;
    }

    console.log(tree.data);
    this.preOrderTraversal(tree.getLeftSubTree());
    this.preOrderTraversal(tree.getRightSubTree());
  }

  inOrderTraversal(tree) {
    if (tree === null) {
      return;
    }

    this.inOrderTraversal(tree.getLeftSubTree());
    console.log(tree.data);
    this.inOrderTraversal(tree.getRightSubTree());
  }

  postOrderTraversal(tree) {
    if (tree === null) {
      return;
    }

    this.postOrderTraversal(tree.getLeftSubTree());
    this.postOrderTraversal(tree.getRightSubTree());
    console.log(tree.data);
  }

  removeLeftSubTree() {
    let deletingNode = this.getLeftSubTree();
    this.setLeftSubTree(null);
    return deletingNode;
  }

  removeRightSubTree() {
    let deletingNode = this.getRightSubTree();
    this.setRightSubTree(null);
    return deletingNode;
  }

  getParent() {
    return this.parentTree;
  }

  setParent(tree) {
    this.parentTree = tree;
  }
}

export { BinaryTree, RED, BLACK };
