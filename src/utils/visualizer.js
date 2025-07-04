import * as visualizers from "./visualizeFunc";
import {
  LinkedList,
  Node,
  insertTreeNode,
  renderTree,
  drawArrow,
  root,
  getRoot,
  setRoot,
  TreeNode,
  deleteTreeNode,
  highlightNode,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  levelOrderTraversal,
} from "./structure";
import { graph,dfsCycle} from "./structure";
const myList = new LinkedList();
// const container = document.getElementById("visualize");
export const visualOperations = {
  array: {
    insert: function (index, value) {
      const container = document.getElementById("visualize");
      const box = createBox(value);
      container.insertBefore(box, container.children[index]);
      requestAnimationFrame(() => box.classList.add("scale-100"));
    },
    delete: function (index) {
      const container = document.getElementById("visualize");
      const box = container.children[index];
      if (box) {
        box.classList.remove("scale-100");
        setTimeout(() => box.remove(), 800);
      }
    },
    access: function (index) {
      const container = document.getElementById("visualize");
      const box = container.children[index];
      if (box) {
        box.classList.add("bg-yellow-400");
        setTimeout(() => box.classList.remove("bg-yellow-400"), 5000);
      }
    },
    update: function (index, newValue) {
      const container = document.getElementById("visualize");
      const box = container.children[index];
      if (!box) {
        alert("Invalid index!!");
        return;
      } // If index invalid, exit
      box.classList.add("bg-yellow-400");
      setTimeout(() => {
        box.innerText = newValue;
        box.classList.add("pulse");
        setTimeout(() => {
          box.classList.remove("bg-yellow-400");
          box.classList.remove("pulse");
        }, 600);
      }, 500);
    },
  },
  // string animation...
  string: {
    reverse: async function (str) {
      const container = document.getElementById("visualize");
      container.innerHTML = "";
      const chars = str.split("");
      chars.forEach((char, i) => {
        const box = createBox(char);
        box.id = `char-${i}`;
        container.appendChild(box);
        requestAnimationFrame(() => {
          box.classList.add("scale-100");
        });
      });
      await delay(900);
      let left = 0;
      let right = chars.length - 1;

      while (left < right) {
        const leftBox = document.getElementById(`char-${left}`);
        const rightBox = document.getElementById(`char-${right}`);
        leftBox.classList.add("bg-yellow-500");
        rightBox.classList.add("bg-yellow-500");
        await delay(1200);
        const temp = leftBox.innerText;
        leftBox.innerText = rightBox.innerText;
        rightBox.innerText = temp;
        leftBox.classList.remove("bg-yellow-500");
        rightBox.classList.remove("bg-yellow-500");

        left++;
        right--;
        await delay(1000);
      }
    },
    substring: function (inputStr, str) {
      const container = document.getElementById("visualize");
      container.innerHTML = "";
      const enteredStr = document.createElement("h1");
      enteredStr.innerText =
        "Entered string : " + inputStr + "\n" + "substring : ";
      enteredStr.className = "text-white text-2xl font-semibold mb-8";
      container.appendChild(enteredStr);
      const chars = str.split("");
      chars.forEach((char) => {
        const box = createBox(char);
        container.appendChild(box);
        requestAnimationFrame(() => box.classList.add("scale-100"));
      });
    },
    uppercase: async function (str) {
      const container = document.getElementById("visualize");
      container.innerHTML = "";
      const chars = str.split("");
      chars.forEach((char, i) => {
        const box = createBox(char);
        box.id = `char-${i}`;
        container.appendChild(box);
        requestAnimationFrame(() => box.classList.add("scale-100"));
      });
      for (let i = 0; i < chars.length; i++) {
        await delay(700);
        const box = document.getElementById(`char-${i}`);
        box.innerText = box.innerText.toUpperCase();
        box.classList.add("bg-yellow-400");
        await delay(500);
        box.classList.remove("bg-yellow-400");
      }
    },

    trim: async function (str) {
      const container = document.getElementById("visualize");
      container.innerHTML = "";
      const chars = str.split("");

      // Create boxes for all chars
      chars.forEach((char, i) => {
        const box = createBox(char === " " ? "␣" : char); // Show visible space symbol
        box.id = `char-${i}`;
        container.appendChild(box);
        requestAnimationFrame(() => box.classList.add("scale-100"));
      });

      await delay(1000);
      let start = 0;
      while (start < chars.length && chars[start] === " ") start++;
      let end = chars.length - 1;
      while (end >= 0 && chars[end] === " ") end--;
      for (let i = 0; i < start; i++) {
        const box = document.getElementById(`char-${i}`);
        box.classList.add("bg-red-500", "line-through");
        await delay(300);
      }
      for (let i = chars.length - 1; i > end; i--) {
        const box = document.getElementById(`char-${i}`);
        box.classList.add("bg-red-500", "line-through");
        await delay(300);
      }

      await delay(500);

      // Highlight trimmed string chars
      for (let i = start; i <= end; i++) {
        const box = document.getElementById(`char-${i}`);
        box.classList.add("bg-yellow-400");
        await delay(300);
      }

      // Optionally show final trimmed string below
      await delay(800);
      const trimmedStr = str.trim();
      const result = document.createElement("h1");
      result.innerText = `Trimmed string: "${trimmedStr}"`;
      result.className = "text-white text-2xl font-semibold mt-8";
      container.appendChild(result);
    },
  },
  linkedlist: {
    render: function (list) {
      const container = document.getElementById("visualize");
      container.innerHTML = "";
      let curr = list.head;
      let index = 0;
      while (curr) {
        const box = createBox(curr.value);
        box.id = `node-${index}`;
        container.appendChild(box);

        if (curr.next) {
          const arrow = document.createElement("span");
          arrow.innerText = "→";
          arrow.id = `arrow-${index}`; // 👈 Important
          arrow.className = "text-white text-4xl mx-2";
          container.appendChild(arrow);
        }

        curr = curr.next;
        index++;
      }
    },

    insertfront: function (list, value) {
      list.insertAtStart(value);
      this.render(list);
    },

    insertend: function (list, value) {
      list.insertAtEnd(value);
      this.render(list);
    },

    deletenode: function (list, index) {
      list.deleteAtIndex(index);
      this.render(list);
    },

    search: async function (list, value) {
      const container = document.getElementById("visualize");
      let curr = list.head;
      let index = 0;
      while (curr) {
        const box = document.getElementById(`node-${index}`);
        if (box) box.classList.add("bg-yellow-400");
        if (curr.value === value) {
          if (box) box.classList.add("bg-green-500");
          alert(`Value ${value} found at index ${index}`);
          break;
        }
        await delay(1000);
        if (box) box.classList.remove("bg-yellow-400");
        curr = curr.next;
        index++;
      }
      if (!curr) alert(`Value ${value} not found`);
    },

    update: function (list, index, newValue) {
      const updated = list.updateAtIndex(index, newValue);
      if (!updated) {
        alert("Invalid index!");
      } else {
        this.render(list);
      }
    },
  },
  stack: {
    push: function (value) {
      const container = document.getElementById("visualize");
      container.classList.add("flex-col-reverse");
      const box = document.createElement("div");
      box.className =
        "w-32 h-12 bg-cyan-600 text-white font-bold flex items-center justify-center rounded-md shadow-md transform scale-0 transition-transform duration-300";
      box.innerText = value;

      container.appendChild(box);

      // Animation
      requestAnimationFrame(() => {
        box.classList.add("scale-100");
      });
    },
    pop: function () {
      const container = document.getElementById("visualize");
      const topBox = container.lastElementChild;

      if (!topBox) {
        alert("Stack is empty!");
        return;
      }
      topBox.classList.remove("scale-100");
      topBox.classList.add("scale-0");

      setTimeout(() => {
        container.removeChild(topBox);
      }, 300); // Wait for animation to finish
    },
    peek: function () {
      const container = document.getElementById("visualize");
      const topBox = container.lastElementChild;
      if (!topBox) {
        alert("Stack is empty!");
        return;
      }
      topBox.classList.remove("bg-cyan-600");
      topBox.classList.add("bg-yellow-400");

      // Revert to cyan after 500ms
      setTimeout(() => {
        topBox.classList.remove("bg-yellow-400");
        topBox.classList.add("bg-cyan-600");
      }, 800);
    },
  },
  queue: {
    enqueue: function (value) {
      const container = document.getElementById("visualize");
      const box = createBox(value);
      container.appendChild(box);

      // Animate the enqueue
      requestAnimationFrame(() => box.classList.add("scale-100"));

      // Remove old labels
      container.querySelectorAll(".queue-label").forEach((el) => el.remove());

      // Add "Front" label to first element
      if (container.firstElementChild) {
        const frontLabel = document.createElement("div");
        frontLabel.innerText = "Front";
        frontLabel.className = "queue-label text-xs text-white mt-1";
        container.firstElementChild.appendChild(frontLabel);
      }

      // Add "Rear" label to last element
      if (container.lastElementChild) {
        const rearLabel = document.createElement("div");
        rearLabel.innerText = "Rear";
        rearLabel.className = "queue-label text-xs text-white mt-1";
        container.lastElementChild.appendChild(rearLabel);
      }
    },

    dequeue: function () {
      const container = document.getElementById("visualize");
      const frontBox = container.firstElementChild;

      if (!frontBox) {
        alert("Queue is empty!");
        return;
      }
      frontBox.classList.remove("scale-100");
      frontBox.classList.add("scale-0");

      setTimeout(() => {
        container.removeChild(frontBox);

        // Re-label after dequeue
        container.querySelectorAll(".queue-label").forEach((el) => el.remove());

        if (container.firstElementChild) {
          const newFrontLabel = document.createElement("div");
          newFrontLabel.innerText = "Front";
          newFrontLabel.className = "queue-label text-xs text-white mt-1";
          container.firstElementChild.appendChild(newFrontLabel);
        }

        if (container.lastElementChild) {
          const newRearLabel = document.createElement("div");
          newRearLabel.innerText = "Rear";
          newRearLabel.className = "queue-label text-xs text-white mt-1";
          container.lastElementChild.appendChild(newRearLabel);
        }
      }, 300); // Wait for animation to finish
    },
    peek: function () {
      const container = document.getElementById("visualize");
      const frontBox = container.firstElementChild;

      if (!frontBox) {
        alert("Queue is empty!");
        return;
      }
      frontBox.classList.remove("bg-cyan-600");
      frontBox.classList.add("bg-yellow-400");

      // Revert to cyan after 500ms
      setTimeout(() => {
        frontBox.classList.remove("bg-yellow-400");
        frontBox.classList.add("bg-cyan-600");
      }, 800);
    },
  },
  // tree
  tree: {
    insert: function () {
      const value = visualizers.intInput();
      if (isNaN(value)) return;
      const updatedRoot = insertTreeNode(getRoot(), value); // ✅ insert new node in existing tree
      setRoot(updatedRoot); // ✅ update root in state
      renderTree(updatedRoot);
    },
    delete: function () {
    const value = visualizers.intInput();
    if (isNaN(value)) return;
    const updatedRoot = deleteTreeNode(getRoot(), value);
    setRoot(updatedRoot);
    renderTree(updatedRoot);
  },
    inordertraversal: async function () {
      const root = getRoot();
      if (!root) return;
      await inorderTraversal(root);
    },
    preordertraversal: async function () {
      const root = getRoot();
      if (!root) return;
      await preorderTraversal(root);
    },
    postordertraversal: async function () {
      const root = getRoot();
      if (!root) return;
      await postorderTraversal(root);
    },
    levelordertraversal: async function () {
      const root = getRoot();
      if (!root) return;
      await levelOrderTraversal(root);
    },
    // later: delete, traverse, search
  },
  graph: {
    addvertex: function (v=null) {
      const val = v??prompt("Enter vertex label (e.g., A):");
      if (val) graph.addVertex(val.trim());
    },
    addedge: function (u = null, v = null) {
            if (!u || !v) {
              u = prompt("From vertex:");
              v = prompt("To vertex:");
            }
            if (u && v) graph.addEdge(u.trim(), v.trim());
    },
    bfs: async function () {
  const start = prompt("Enter start node:").trim().toLowerCase();

  if (!graph.adjList || !graph.adjList[start]) {
    alert("Start node not found in graph!");
    return;
  }

  const visited = {};
  const queue = [];

  visited[start] = true;
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift();
    await highlightNode(current);

    for (const neighborObj of graph.adjList[current]) {
      const neighbor = neighborObj.node;
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
},

    dfs: async function () {
  const start = prompt("Enter start node:").trim().toLowerCase();

  if (!graph.adjList || !graph.adjList[start]) {
    alert("Start node not found!");
    return;
  }

  const visited = {};

  async function dfsVisit(node) {
    if (!node || visited[node]) return;
    visited[node] = true;
    await highlightNode(node);

    for (const neighborObj of graph.adjList[node]) {
      const neighbor = neighborObj.node;
      await dfsVisit(neighbor);
    }
  }

  await dfsVisit(start);
},

    cycleDetect: async function () {
      const visited = {};
      const parent = {};
      const nodes = Object.keys(graph.adjList);

      for (let node of nodes) {
        if (!visited[node]) {
          const hasCycle = await dfsCycle(node, visited, parent, null);
          if (hasCycle) {
            alert("Cycle detected!");
            return;
          }
        }
      }
      alert("No cycle detected!");
    }
  },
  mapsandsets: {
  inserthashmap: async function () {
    const container = document.getElementById("visualize");
    const key = visualizers.strInput();
    const value = visualizers.intInput();
    container.innerHTML = "";
    const bucketSize = 7;

    const buckets = Array.from({ length: bucketSize }, (_, i) => {
      const box = createBox("");
      box.id = `bucket-${i}`;
      return box;
    });

    buckets.forEach((bucket) => container.appendChild(bucket));

    const hash = visualizers.hashKey(key, bucketSize);
    visualizers.highlightBucket(hash, `Inserting {${key}: ${value}}`, key);
    await visualizers.sleep(1000);
    buckets[hash].textContent = `${key}: ${value}`;
    buckets[hash].classList.add("bg-green-200");
  },

  deletehashmap: async function () {
        const container = document.getElementById("visualize");
    const key = visualizers.strInput();
    const bucketSize = 7;
    const hash = visualizers.hashKey(key, bucketSize);
    const bucket = document.getElementById(`bucket-${hash}`);

    if (bucket && bucket.textContent.startsWith(`${key}:`)) {
      visualizers.highlightBucket(hash, `Deleting key "${key}"`, key);
      await visualizers.sleep(1000);
      bucket.textContent = "";
      bucket.classList.remove("bg-green-200");
      bucket.classList.add("bg-red-100");
    } else {
      visualizers.showMessage(`Key "${key}" not found`);
    }
  },

  searchhashmap: async function () {
    const key = visualizers.strInput();
    const bucketSize = 7;
    const hash = visualizers.hashKey(key, bucketSize);
    const bucket = document.getElementById(`bucket-${hash}`);

    visualizers.highlightBucket(hash, `Searching key "${key}"`, key);
    await visualizers.sleep(1000);

    if (bucket && bucket.textContent.startsWith(`${key}:`)) {
      bucket.classList.add("border-4", "border-blue-400");
    } else {
      visualizers.showMessage(`Key "${key}" not found`);
    }
  },

  inserthashset: async function () {
    const container = document.getElementById("visualize");
    const value = visualizers.intInput();
    container.innerHTML = "";
    const bucketSize = 7;

    const buckets = Array.from({ length: bucketSize }, (_, i) => {
      const box = createBox("");
      box.id = `bucket-${i}`;
      return box;
    });

    buckets.forEach((bucket) => container.appendChild(bucket));

    const hash = value % bucketSize;
    visualizers.highlightBucket(hash, "Inserting", value);
    await visualizers.sleep(1000);

    buckets[hash].textContent = value;
    buckets[hash].classList.add("bg-green-500");
  },

  deletehashset: async function () {
    const value = visualizers.intInput();
    const bucketSize = 7;
    const hash = value % bucketSize;
    const bucket = document.getElementById(`bucket-${hash}`);

    if (bucket && bucket.textContent == value.toString()) {
      visualizers.highlightBucket(hash, "Deleting", value);
      await visualizers.sleep(1000);
      bucket.textContent = "";
      bucket.classList.remove("bg-green-500");
      bucket.classList.add("bg-red-100");
    }
  },

  searchhashset: async function () {
    const value = visualizers.intInput();
    const bucketSize = 7;
    const hash = value % bucketSize;
    const bucket = document.getElementById(`bucket-${hash}`);

    visualizers.highlightBucket(hash, "Searching", value);
    await visualizers.sleep(1000);

    if (bucket && bucket.textContent == value.toString()) {
      bucket.classList.add("border-4", "border-blue-400");
    } else {
      visualizers.showMessage("Not found");
    }
  },
},
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// global function
window.runVisualOperation = function (dsType, operation) {
  const ds = visualOperations[dsType?.toLowerCase()];
  if (!ds || !ds[operation.toLowerCase()]) {
    alert("Operation not supported yet.");
    return;
  }
  try {
    if (dsType === "array") {
      switch (operation) {
        case "insert":
          visualizers.handleInsert();
          break;
        case "delete":
          visualizers.handleDelete();
          break;
        case "update":
          visualizers.handleUpdate();
          break;
        case "access":
          visualizers.handleAccess();
          break;
        default:
          alert("No operation found !!");
      }
    } else if (dsType === "string") {
      switch (operation) {
        case "reverse":
          const inputStr = visualizers.strInput("reverse");
          if (inputStr) {
            visualOperations.string.reverse(inputStr);
          }
          break;
        case "substring":
          const fullStr = visualizers.strInput("get substring");
          if (!fullStr) {
            alert("No input string provided.");
            return;
          }
          const idx1 = parseInt(prompt("Enter the starting index:"));
          const idx2 = parseInt(prompt("Enter the ending index (excluded):"));
          if (
            isNaN(idx1) ||
            isNaN(idx2) ||
            idx1 < 0 ||
            idx2 > fullStr.length ||
            idx1 >= idx2
          ) {
            alert("Invalid indices!");
            return;
          }
          const sub = visualizers.substr(idx1, idx2, fullStr);
          visualOperations.string.substring(fullStr, sub);
          break;
        case "uppercase":
          const toUpperStr = visualizers.strInput("get uppercase substring");
          visualOperations.string.uppercase(toUpperStr);
          break;
        case "trim":
          const toTrim = visualizers.strInput("get trimmed string");
          visualOperations.string.trim(toTrim);
          break;
      }
    } else if (dsType.toLowerCase() === "linkedlist") {
      switch (operation.toLowerCase()) {
        case "insertfront":
          const userInput1 = visualizers.intInput();
          visualOperations.linkedlist.insertfront(myList, userInput1);
          break;

        case "insertend":
          const userInput2 = visualizers.intInput();
          visualOperations.linkedlist.insertend(myList, userInput2);
          break;

        case "deletenode":
          const delIndex = parseInt(prompt("Enter the index to delete:"));
          if (!isNaN(delIndex)) {
            visualOperations.linkedlist.deletenode(myList, delIndex);
          }
          break;

        case "traverse":
          alert("Linked List: " + myList.toArray().join(" → "));
          break;

        case "search":
          const value = visualizers.intInput();
          visualOperations.linkedlist.search(myList, value);
          break;

        case "update":
          const updateIndex = parseInt(prompt("Enter the index to update:"));
          const newVal = visualizers.intInput();
          if (!isNaN(updateIndex)) {
            visualOperations.linkedlist.update(myList, updateIndex, newVal);
          }
          break;

        default:
          alert("LinkedList operation not supported!");
      }
    } else if (dsType.toLowerCase() === "stack") {
      switch (operation) {
        case "push":
          const value = visualizers.intInput();
          visualOperations.stack.push(value);
          break;
        case "pop":
          visualOperations.stack.pop();
          break;
        case "peek":
          visualOperations.stack.peek();
          break;
      }
    } else if (dsType.toLowerCase() === "queue") {
      switch (operation) {
        case "enqueue":
          const val = visualizers.intInput();
          visualOperations.queue.enqueue(val);
          break;
        case "dequeue":
          visualOperations.queue.dequeue();
          break;
        case "peek":
          visualOperations.queue.peek();
      }
    } else if (dsType.toLowerCase() === "tree") {
      switch (operation) {
        case "insert":
          visualOperations.tree.insert();
          break;
        case "delete":
          visualOperations.tree.delete();
          break;
        case "inordertraversal":
          visualOperations.tree.inordertraversal();
          break;
        case "preordertraversal":
          visualOperations.tree.preordertraversal();
          break;
        case "postordertraversal":
          visualOperations.tree.postordertraversal();
          break;
        case "levelordertraversal":
          visualOperations.tree.levelordertraversal();
          break;
      }
    } else if (dsType.toLowerCase() === "graph") {
      switch (operation) {
        case "addvertex":
          visualOperations.graph.addvertex();
          break;
        case "addedge":
          visualOperations.graph.addedge();
          break;
        case "bfs":
          // const startNodeG = visualizers.strInput();
          visualOperations.graph.bfs();
          break;
        case "dfs":
          visualOperations.graph.dfs();
          break;
      }
    } else if (dsType.toLowerCase() === "mapsandsets") {
      switch (operation) {
        case "inserthashmap":
      visualOperations.mapsandsets.inserthashmap();
      break;
    case "deletehashmap":
      visualOperations.mapsandsets.deletehashmap();
      break;
    case "searchhashmap":
      visualOperations.mapsandsets.searchhashmap();
      break;
    case "inserthashset":
      visualOperations.mapsandsets.inserthashset();
      break;
    case "deletehashset":
      visualOperations.mapsandsets.deletehashset();
      break;
    case "searchhashset":
      visualOperations.mapsandsets.searchhashset();
      break;
      }
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong in visualization.");
  }
};
// createBox function
function createBox(value) {
  const box = document.createElement("div");
  box.className =
    "w-16 h-16 bg-cyan-600 mr-2 text-white font-bold flex items-center justify-center rounded-md shadow-md transform transition-transform duration-300";
  box.innerText = value;
  return box;
}
