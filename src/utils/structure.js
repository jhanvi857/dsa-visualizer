import {
  createStatus,
  resetContainer,
  createBox,
  createArrow,
  getContainer,
  delay,
} from "./visualHelpers";
const container = document.getElementById("visualize");
export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  insertAtStart(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  insertAtEnd(value) {
    const newNode = new Node(value);
    if (this.head == null) {
      this.head = newNode;
      return;
    }
    let temp = this.head;
    while (temp.next != null) {
      temp = temp.next;
    }
    temp.next = newNode;
    this.size++;
  }
  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let prev = null;
    let curr = this.head;
    let count = 0;
    while (count < index) {
      prev = curr;
      curr = curr.next;
      count++;
    }
    prev.next = curr.next;
    this.size--;
  }
  search(value) {
    let curr = this.head;
    let index = 0;
    while (curr) {
      if (curr.value === value) return index;
      curr = curr.next;
      index++;
    }
    return -1;
  }
  updateAtIndex(index, newValue) {
    if (index < 0 || index >= this.size) return false;
    let curr = this.head;
    let count = 0;
    while (count < index) {
      curr = curr.next;
      count++;
    }
    curr.value = newValue;
    return true;
  }
  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}
// tree
export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export let root = null;

export function setRoot(value) {
  root = value;
}

export function getRoot() {
  return root;
}
export function insertTreeNode(current, value) {
  if (!current) return new TreeNode(value);

  if (value < current.value) {
    current.left = insertTreeNode(current.left, value);
  } else {
    current.right = insertTreeNode(current.right, value);
  }

  return current;
}

export function renderTree(rootNode) {
  // const container = document.getElementById("visualize");
  const container = getContainer();
  container.innerHTML = "";
  container.style.position = "relative";

  let positions = [];
  let xCounter = 0;

  function assignCoordinates(node, depth = 0) {
    if (!node) return;
    assignCoordinates(node.left, depth + 1);
    positions.push({ node, x: xCounter++, y: depth });
    assignCoordinates(node.right, depth + 1);
  }

  assignCoordinates(rootNode);

  const spacingX = 80;
  const spacingY = 100;

  positions.forEach(({ node, x, y }) => {
    const div = document.createElement("div");
    div.className =
      "absolute w-12 h-12 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center scale-0 transition-transform duration-300";
    div.innerText = node.value;
    div.style.left = `${x * spacingX}px`;
    div.style.top = `${y * spacingY}px`;

    container.appendChild(div);

    requestAnimationFrame(() => div.classList.replace("scale-0", "scale-100"));
  });
  // Step 1: Create a map from node to its visual position
  const nodeMap = new Map();
  positions.forEach(({ node, x, y }) => {
    nodeMap.set(node, { x: x * spacingX + 24, y: y * spacingY + 24 }); // center of node
  });

  // Step 2: Draw arrows from parent to children
  nodeMap.forEach((parentPos, node) => {
    if (node.left) {
      const childPos = nodeMap.get(node.left);
      drawArrow(parentPos, childPos);
    }
    if (node.right) {
      const childPos = nodeMap.get(node.right);
      drawArrow(parentPos, childPos);
    }
  });
}
export function drawArrow(from, to) {
  const arrow = document.createElement("div");
  arrow.className = "absolute text-white text-2xl";

  // Decide the direction (↙ or ↘)
  const dx = to.x - from.x;
  const arrowChar = dx < 0 ? "↙" : "\u2937";

  arrow.innerText = arrowChar;
  arrow.style.left = `${(from.x + to.x) / 2}px`;
  arrow.style.top = `${(from.y + to.y) / 2 - 10}px`; // adjust vertically a bit
  arrow.style.transform = "translate(-50%, -50%)";
  const container = getContainer();
  container.appendChild(arrow);
}
export async function highlightNode(value) {
  const allNodes = document.querySelectorAll("#visualize div");
  for (const node of allNodes) {
    if (node.innerText == value) {
      node.classList.add("bg-green-500");
      await sleep(700);
      node.classList.remove("bg-green-500");
      break;
    }
  }
}

export async function inorderTraversal(node) {
  if (!node) return;
  await inorderTraversal(node.left);
  await highlightNode(node.value);
  await inorderTraversal(node.right);
}

export async function preorderTraversal(node) {
  if (!node) return;
  await highlightNode(node.value);
  await preorderTraversal(node.left);
  await preorderTraversal(node.right);
}

export async function postorderTraversal(node) {
  if (!node) return;
  await postorderTraversal(node.left);
  await postorderTraversal(node.right);
  await highlightNode(node.value);
}

export async function levelOrderTraversal(root) {
  if (!root) return;
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    await highlightNode(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}

export async function diameterOfBinaryTree(root) {
  const container = getContainer();
  let maxDiameter = 0;
  let diameterPath = [];

  function dfs(node) {
    if (!node) return { height: 0, path: [] };

    const left = dfs(node.left);
    const right = dfs(node.right);

    const height = 1 + Math.max(left.height, right.height);

    const currentDiameter = left.height + right.height;

    if (currentDiameter > maxDiameter) {
      maxDiameter = currentDiameter;
      diameterPath = [...left.path.reverse(), node, ...right.path];
    }

    const deeperPath = left.height > right.height ? left.path : right.path;
    return { height, path: [node, ...deeperPath] };
  }

  dfs(root);
  // Now animate the diameter path
  for (let node of diameterPath) {
    await highlightNode(node.value);
  }
  createStatus(
    container,
    `Diameter of the tree is (No.of edges by definition): ${maxDiameter}`
  );
  return maxDiameter;
}

// build tree from array
export function buildTreeFromArray(arr) {
  if (!arr.length || arr[0] == null) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (i < arr.length && queue.length) {
    const curr = queue.shift();

    if (i < arr.length && arr[i] != null) {
      curr.left = new TreeNode(arr[i]);
      queue.push(curr.left);
    }
    i++;

    if (i < arr.length && arr[i] != null) {
      curr.right = new TreeNode(arr[i]);
      queue.push(curr.right);
    }
    i++;
  }

  return root;
}
export function deleteTreeNode(root, key) {
  if (!root) return null;

  if (key < root.value) {
    root.left = deleteTreeNode(root.left, key);
  } else if (key > root.value) {
    root.right = deleteTreeNode(root.right, key);
  } else {
    // Node with only one child or no child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Node with two children: Get inorder successor
    let successor = root.right;
    while (successor.left) successor = successor.left;
    root.value = successor.value;
    root.right = deleteTreeNode(root.right, successor.value);
  }

  return root;
}


// graph data structure..
export const graph = {
  vertices: [],
  edges: [],
  adjList: {},

  addVertex: function (label) {
    label = label.trim().toLowerCase();
    if (!this.vertices.includes(label)) {
      this.vertices.push(label);
      this.adjList[label] = [];
      this.render();
    }
  },

  addEdge: function (from, to, weight = 1) {
    from = from.trim().toLowerCase();
    to = to.trim().toLowerCase();

    if (this.adjList[from] && this.adjList[to]) {
      this.adjList[from].push({ node: to, weight });
      this.adjList[to].push({ node: from, weight }); // for undirected graph
      this.edges.push({ from, to, weight });
      this.render();
    } else {
      alert("Add both vertices first!");
    }
  },
  getNeighbors: function (node) {
    return this.adjList[node] || [];
  },

  hasVertex: function (node) {
    return this.vertices.includes(node);
  },

  getVertices: function () {
    return this.vertices;
  },
  getAllEdges: function () {
    return this.edges || [];
  },
  render: function () {
    renderGraph(this);
  },
};
export function updateWeightDisplay(node, weight) {
  const container = document.getElementById("visualize");
  const elements = Array.from(container.children);
  for (let el of elements) {
    if (el.innerText.toLowerCase() === node.toLowerCase()) {
      el.innerText = `${node}\n${weight}`;
    }
  }
}

// cycle detection
export async function dfsCycle(current, visited, parent, from) {
  visited[current] = true;
  await highlightNode(current, "yellow"); // current visiting
  await sleep(600);

  for (let neighbor of graph.adjList[current] || []) {
    if (!visited[neighbor]) {
      parent[neighbor] = current;
      if (await dfsCycle(neighbor, visited, parent, current)) return true;
    } else if (neighbor !== from) {
      // Cycle found!
      await highlightNode(current, "red");
      await highlightNode(neighbor, "red");
      drawEdgeArrow(current, neighbor, "⚠️", "#f87171");
      return true;
    }
  }

  await highlightNode(current, "green"); // fully explored
  return false;
}

export function renderGraph(graph) {
  const container = document.getElementById("visualize");
  container.innerHTML = "";
  container.style.position = "relative";

  const radius = 150;
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;

  const nodePositions = {};

  graph.vertices.forEach((v, i) => {
    const angle = (2 * Math.PI * i) / graph.vertices.length;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    nodePositions[v] = { x, y };

    const node = document.createElement("div");
    node.className =
      "absolute w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center font-bold transition-transform scale-0";
    node.innerText = v;
    node.style.left = `${x - 20}px`;
    node.style.top = `${y - 20}px`;

    container.appendChild(node);

    requestAnimationFrame(() => node.classList.replace("scale-0", "scale-100"));
  });

  graph.edges.forEach(({ from, to }) => {
    const fromPos = nodePositions[from];
    const toPos = nodePositions[to];
    if (fromPos && toPos) {
      drawEdgeArrow(fromPos, toPos);
    }
  });
}

export function drawEdgeArrow(from, to) {
  const arrow = document.createElement("div");
  arrow.className = "absolute text-white text-xl";

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const arrowChar = dx < 0 ? "↖" : dx > 0 ? "↘" : "↓";

  arrow.innerText = arrowChar;
  arrow.style.left = `${(from.x + to.x) / 2}px`;
  arrow.style.top = `${(from.y + to.y) / 2}px`;
  arrow.style.transform = "translate(-50%, -50%)";

  document.getElementById("visualize").appendChild(arrow);
}

export async function bfs(startNode) {
  const visited = {};
  const queue = [];

  visited[startNode] = true;
  queue.push(startNode);

  while (queue.length > 0) {
    const current = queue.shift();
    await highlightNode(current);

    for (const neighbor of graph.adjList[current] || []) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
}

export async function animateBFS(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const curr = queue.shift();
    await highlightNode(curr);

    for (const neighbor of graph.getNeighbors(curr)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

export async function animateDFS(graph, start, visited = new Set()) {
  visited.add(start);
  await highlightNode(start);

  for (const neighbor of graph.getNeighbors(start)) {
    if (!visited.has(neighbor)) {
      await animateDFS(graph, neighbor, visited);
    }
  }
}

export function highlightEdge(from, to, color = "#facc15") {
  const container = document.getElementById("visualize");
  const fromNode = document.querySelector(`.node-${from}`);
  const toNode = document.querySelector(`.node-${to}`);
  if (!fromNode || !toNode) return;

  const fromRect = fromNode.getBoundingClientRect();
  const toRect = toNode.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
  const x2 = toRect.left + toRect.width / 2 - containerRect.left;
  const y2 = toRect.top + toRect.height / 2 - containerRect.top;

  const line = document.createElement("div");
  line.className = "highlighted-edge";
  line.style.position = "absolute";
  line.style.left = `${Math.min(x1, x2)}px`;
  line.style.top = `${Math.min(y1, y2)}px`;
  line.style.width = `${Math.abs(x2 - x1)}px`;
  line.style.height = `${Math.abs(y2 - y1)}px`;
  line.style.border = `2px solid ${color}`;
  line.style.zIndex = "10";

  // Optionally rotate line or use canvas/SVG for more accurate edges

  container.appendChild(line);

  // Auto-remove after a delay
  setTimeout(() => line.remove(), 800);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function huffmanEncoding(freqMap) {
  const container = getContainer();
  resetContainer("flex justify-center flex-wrap", container);
  const entries = Object.entries(freqMap).map(([char, freq]) => ({
    char,
    freq,
  }));
  entries.sort((a, b) => a.freq - b.freq);

  const boxes = entries.map((item) => {
    const box = createBox(`${item.char}:${item.freq}`);
    container.appendChild(box);
    return box;
  });
  const status = createStatus(container, "");
  await delay(800);
  while (entries.length > 1) {
    const first = entries.shift();
    const second = entries.shift();

    const merged = {
      char: first.char + second.char,
      freq: first.freq + second.freq,
    };

    entries.push(merged);
    entries.sort((a, b) => a.freq - b.freq);

    status.innerText = `Merging ${first.char}:${first.freq} + ${second.char}:${second.freq}`;
    await delay(1000);
  }

  status.innerText = "Huffman Tree formed!";
}
