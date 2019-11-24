const deckData = [];
const faceCards = ['ace', 'king', 'queen', 'jack'];
const colors = ['black', 'red'];
const suits = ['spades', 'clubs', 'hearts', 'diamonds'];
const numerals = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const colorMap = {
  spades: colors[0],
  clubs: colors[0],
  hearts: colors[1],
  diamonds: colors[1],
};

function addCardsBySuit(cards, suit) {
  faceCards.concat(numerals).forEach((card) => {
    const cardObj = {
      id: deckData.length + 1,
      color: colorMap[suit],
      value: card,
      suit,
    }
    deckData.push(cardObj);
  });
}

class TreeStore {
  constructor(rootNodeData, classifications) {
    this.classfications = classifications;
    this.rootNode = new TreeNode(rootNodeData);
  }

  addClassifierNode(data, parent, classification) {
    let node = parent.children.find((child) => child.data.type === 'classifier' && child.data.value === data[classification]);
    if (!node) {
      node = new TreeNode({ type: 'classifier', key: classification, value: data[classification]});
      parent.children.push(node);
    }
    return node;
  }

  addLeafNode(data) {
    let parentNode = this.growBranch(data);
    parentNode.children.push(new TreeNode(data));
  }

  growBranch(data) {
    const classifierNodes = [this.rootNode];
    classifications.forEach((classification, index) => {
      classifierNodes.push(this.addClassifierNode(data, classifierNodes[index], classification));
    });
    // Return child-most node
    return classifierNodes[classifierNodes.length - 1];
  }

  search(criteria) {
    // TODO
    console.log(criteria);
  }
}

class TreeNode {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}

// RUN
// build data
const classifications = ['color', 'suit', 'value']; // order matters
suits.forEach((suit) => {
  addCardsBySuit(faceCards.concat(numerals), suit);
});
console.log('Total Cards: ' + deckData.length);

const rootNodeData = {};
const cardsTreeStore = new TreeStore(rootNodeData, classifications);
deckData.forEach((cardData) => {
  cardsTreeStore.addLeafNode(cardData);
});
console.log(cardsTreeStore);

