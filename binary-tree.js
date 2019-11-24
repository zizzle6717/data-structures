class TreeNode {
  constructor(value, data, left = null, right = null) {
    this.value = value;
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;

    this.getRoot = this.getRoot.bind(this);
    this.find = this.find.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.searchTree = this.searchTree.bind(this);
  }

  add(value, data) {
    if (!this.root) {
    // Set intitial node as root
      this.root = new TreeNode(value, data)
      return;
    }

    return this.searchTree(this.root, value, data);
  }

  searchTree(node, value, data) {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new TreeNode(value, data);
        return;
      }
      return this.searchTree(node.left, value, data);
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = new TreeNode(value, data);
        return;
      }
      return this.searchTree(node.right, value, data);
    }
    
    // node already exists
    return null;
  }

  getRoot() {
    if (!this.root) {
      throw new Error('Tree is empty!');
    }
    return this.root;
  }

  find(value) {
    if (!value) {
      return;
    }
    let current = this.getRoot();
    while (current.value !== value) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      }

      // Node with value does not exist
      if (!current) {
        break;
      }
    }

    return current && current.data;
  }

  findMin() {
    let current = this.getRoot();
    while (current.left) {
      current = current.left;
    }

    return current.data
  }

  findMax() {
    let current = this.getRoot();
    while (current.right) {
      current = current.right;
    }

    return current.data;
  }

  findMinHeight(node = this.root) {
    if (!node) {
      return -1;
    }
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    }

    return right + 1;
  }

  findMaxHeight(node = this.root) {
    if (!node) {
      return -1;
    }
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left < right) {
      return left + 1;
    }

    return right + 1;
  }

  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }

  nodeExists(value) {
    return !!this.find(value);
  }

  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(node, value) {
    if (!node) {
      return;
    }
    if (value === node.value) {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      let tempNode = node.right;
      while (!!tempNode.left) {
        tempNode = tempNode.left;
      }
      node.value = tempNode.value;
      node.right = this.removeNode(node.right, tempNode.value)
    }
    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
      return node;
    }
    if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    }
  }

  sortDFInOrder() {
    const rootNode = this.getRoot();

    let result = [];
    function traverseInOrder(node) {
      node.left && traverseInOrder(node.left);
      result.push([node.value, node.data]);
      node.right && traverseInOrder(node.right);
    }
    traverseInOrder(rootNode);
    return result;
  }

  sortDFPreOrder() {
    const rootNode = this.getRoot();

    let result = [];
    function traverseInOrder(node) {
      result.push([node.value, node.data]);
      node.left && traverseInOrder(node.left);
      node.right && traverseInOrder(node.right);
    }
    traverseInOrder(rootNode);
    return result;
  }

  sortDFPostOrder() {
    const rootNode = this.getRoot();

    let result = [];
    function traverseInOrder(node) {
      node.left && traverseInOrder(node.left);
      node.right && traverseInOrder(node.right);
      result.push([node.value, node.data]);
    }
    traverseInOrder(rootNode);
    return result;
  }

  sortBF() {
    const rootNode = this.getRoot();
    let result = [];
    let queue = [rootNode];
    while(queue.length > 0) {
      let node = queue.shift();
      result.push([node.value, node.data]);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    return result;
  }
}

const tree = new BinarySearchTree();