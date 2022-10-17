const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    function addNode(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (value === node.data) {
        return node;
      }
      if (value < node.data) {
        node.left = addNode(node.left, value);
      } else {
        node.right = addNode(node.right, value);
      }
      return node;
    }

    this.rootTree = addNode(this.rootTree, data);
  }

  has(data) {
    function findNode(node, value) {
      if (!node) {
        return false;
      }
      if (value === node.data) {
        return true;
      }
      return value < node.data
        ? findNode(node.left, value)
        : findNode(node.right, value);
    }

    return findNode(this.rootTree, data);
  }

  find(data) {
    function findNode(node, value) {
      if (!node) {
        return null;
      }
      if (value === node.data) {
        return node;
      }
      return value < node.data
        ? findNode(node.left, value)
        : findNode(node.right, value);
    }

    return findNode(this.rootTree, data);
  }

  remove(data) {
    function removeNode(node, value) {
      if (!node) {
        return null;
      }
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minNode = node.right;
        while (minNode.left) {
          minNode = minNode.left;
        }
        node.data = minNode.data;
        node.right = removeNode(node.right, minNode.data);
        return node;
      }
    }

    this.root = removeNode(this.rootTree, data);
  }

  min() {
    if (!this.rootTree) {
      return null;
    }
    let node = this.rootTree;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootTree) {
      return null;
    }
    let node = this.rootTree;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }

  //см.теорию бинарное дерево на JS: https://www.youtube.com/watch?v=loLjdVaaDKs
}

module.exports = {
  BinarySearchTree
};