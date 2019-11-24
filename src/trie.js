class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(input, node = this.root) {
    if (!input.length) {
      node.setEnd();
      return;
    }
    if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new TrieNode());
    }
    return this.add(input.substr(1), node.keys.get(input[0]));
  }

  isWord(word) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      }
      node = node.keys.get(word[0]);
      word = word.substr(1);
    }
    return !!(node.keys.has(word) && node.keys.get(word).isEnd())
  }
}

class TrieNode {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }

  setEnd() {
    this.end = true;
  }

  isEnd() {
    return this.end;
  }
}
