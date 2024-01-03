import { AvlTree } from "../avlTree/AvlTree.mjs";

let avlTree = new AvlTree();
console.log("======== insert ========");
avlTree.insert(avlTree.root, 1);
avlTree.insert(avlTree.root, 2);
avlTree.insert(avlTree.root, 3);
avlTree.insert(avlTree.root, 4);
avlTree.insert(avlTree.root, 5);
avlTree.insert(avlTree.root, 6);
avlTree.insert(avlTree.root, 7);

console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);

console.log("======== remove ========");
avlTree.remove(avlTree.root, 2);
avlTree.remove(avlTree.root, 3);
avlTree.remove(avlTree.root, 1);

console.log(avlTree.root);

avlTree.root.inOrderTraversal(avlTree.root);

console.log("======== search ========");
console.log(avlTree.search(7));
