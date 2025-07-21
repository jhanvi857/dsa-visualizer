// navbar mobile toggle..
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
// dynamic change in content..
const contentData = {
  array: {
    definition:
      "An array is a data structure that stores elements at contiguous memory locations. It's used for fast access and manipulation.",
    properties: [
      "Fixed-size collection of elements of the same type",
      "Index-based access (O(1) for access)",
      "Stored in contiguous memory",
    ],
    types: [
      "One dimensional Array",
      "Two dimensional Array",
      "Multi dimensional Array",
    ],
    operations: ["Access", "Insert", "Delete", "Update"],
    complexity: ["Access: O(1)", "Search: O(n)", "Insert/Delete: O(n)"],
    applications: [
      "Implementing other data structures",
      "Mathematical vectors and matrix",
      "Efficient data storage and retrival",
    ],
    visualOperations: {
      buttons: ["Access", "Insert", "Delete", "Update"],
      pseudocode: {
        Access: `function accessElement(arr, index) {
  return arr[index];
}`,
        Insert: `function insertElement(arr, index, value) {
  for (i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1];
  }
  arr[index] = value;
}`,
        Delete: `function deleteElement(arr, index) {
  for (i = index; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length--;
}`,
        Update: `function updateElement(arr, index, value) {
  arr[index] = value;
}`,
      },
    },
    algorithms: [
      "Find missing number",
      "Majority element",
      "Two sum problem",
      "Kadane’s Algorithm",
    ],
  },
  string: {
    definition: "A string is a sequence of characters used to represent text.",
    properties: [
      "Immutable in most languages",
      "Supports indexing and slicing",
      "Can be concatenated and compared",
    ],
    types: [
      "Immutable Strings (Java String)",
      "Mutable Strings (StringBuilder in Java)",
    ],
    operations: [
      "Reverse a string",
      "Check substring",
      "Convert to uppercase/lowercase",
      "Trim spaces",
    ],
    complexity: ["Access: O(1)", "Search: O(n)", "Concatenation: O(n)"],
    commonQs: [
      "Check if two strings are anagrams",
      "Find the longest palindrome substring",
      "String compression",
    ],
    visualizeDesc:
      "Perform basic string operations like insert, delete, update, and see the pseudocode.",
    visualOperations: {
      buttons: ["Reverse", "Substring", "Uppercase", "Trim"],
      pseudocode: {
        Reverse: `function reverseString(str) {
  si = 0,ei = str.length-1;
  while(si<=ei) {
      temp = str.charAt(si);
      str.charAt(si) = str.charAt(ei);
      str.charAt(ei) = temp;
  }
  return str;
}`,
        Substring: `function checkSubstring(str, substr) {
  return str.substring(startIdx,endIdx(excluded));
}`,
        Uppercase: `function toUpperCase(str) {
  return str.toUpperCase();
}`,
        Trim: `function trimSpaces(str) {
  return str.trim();
}`,
      },
    },
    algorithms: [
      "Anagram check",
      "Longest palindrome substring",
      "String compression",
      "Z-algorithm",
    ],
  },
  // LL..
  linkedlist: {
    definition:
      "a linear data structure where each node contains both data and a pointer to the next node in the list",
    properties: [
      "Non-contiguous Memory Allocation",
      "Dynamic Size",
      "Linear Structure",
    ],
    types: [
      "Singular linked list",
      "Doubly linked list",
      "Circular linked list",
    ],
    operations: [
      "Insert at front",
      "Insert at last",
      "Delete the first node",
      "Delete the last node",
    ],
    complexity: ["Insert:O(1)", "Delete : O(1)", "Traverse : O(n)"],
    applications: [
      "Representing polinomials",
      "Implementing stacks and queues",
      "Dynamic memory managment",
    ],
    visualOperations: {
      buttons: ["InsertFront", "InsertEnd", "DeleteNode", "search","traverse","Update"],
      pseudocode: {
        "InsertFront": `function insertFront(head, data) {
  const newNode = { data, next: head };
  return newNode;
}`,
        "Insert End": `function insertEnd(head, data) {
  current = head;
  while (current.next !== null) current = current.next;
  current.next = { data, next: null };
}`,
        "Delete Node": `function deleteNode(head, key) {
  if (head.data === key) return head.next;
  curr = head;
  while (curr.next && curr.next.data !== key) {
    curr = curr.next;
  }
  if (curr.next) curr.next = curr.next.next;
  return head;
}`,
        Traverse: `function traverse(head) {
  curr = head;
  while (curr !== null) {
    console.log(curr.data);
    curr = curr.next;
  }
}`,
      },
    },
    algorithms: [
      "Detect cycle",
      "Reverse a list",
      "Merge two sorted lists",
      "Find middle node",
    ],
  },
  // stacks..
  stack: {
    definition:
      "A linear data structure that operates on the principle of Last In, First Out (LIFO)",
    properties: [
      "LIFO (Last-In, First-Out)",
      "Single Point of Access",
      "Overflow and Underflow",
    ],
    types: ["No type"],
    operations: ["push", "Pop", "display"],
    complexity: ["Push : O(1)", "Pop : O(1)", "display : O(n)"],
    applications: [
      "Managing function calls",
      "Evaluating expressions",
      "Syntax correctness",
    ],
    visualOperations: {
      buttons: ["Push", "Pop", "Peek"],
      pseudocode: {
        Push: `function push(stack, item) {
  stack[top + 1] = item;
  top++;
}`,
        Pop: `function pop(stack) {
  if (top == -1) return "Underflow";
  item = stack[top];
  top--;
  return item;
}`,
        Peek: `function peek(stack) {
  return stack[top];
}`,
      },
    },
    algorithms: [
      "Generate parantheses",
      "Next greater element",
      "Valid parantheses",
      "Stock span",
    ],
  },
  // queue
  queue: {
    definition:
      "A linear collection of elements that follows the First-In, First-Out (FIFO) principle",
    properties: ["Linear structure", "FIFO principle", "Two ends"],
    types: [
      "Simple queue",
      "Circular queue",
      "Double ended queue",
      "Priority queue",
    ],
    operations: ["Enqueue", "Dequeue", "Peek/Front", "isEmpty", "isFull"],
    complexity: ["Enqueue : O(1)", "Dequeue : O(1)", "Peek/front : O(1)"],
    applications: ["Task scheduling", "CPU scheduling", "BFS algorithms"],
    visualOperations: {
      buttons: ["Enqueue", "Dequeue", "Peek"],
      pseudocode: {
        Enqueue: `function enqueue(queue, item) {
  queue.push(item);
}`,
        Dequeue: `function dequeue(queue) {
  return queue.shift();
}`,
        Peek: `function peek(queue) {
  return queue[0];
}`,
      },
    },
    algorithms: [
      "Sliding window maximum",
      "First non-repeating character in stream",
      "Circular tour",
      "Binary tree level order traversal",
    ],
  },
  // trees
  tree: {
    definition:
      "A hierarchical, non-linear data structure consisting of nodes connected by edges",
    properties: [
      "Root: The topmost node in the tree.",
      "Nodes: Elements containing data and connections to other nodes.",
      "Edges: Lines connecting nodes.",
    ],
    types: ["Binary tree", "Binary search tree", "AVL tree", "K-ary tree"],
    operations: ["Insertion", "Deletion", "Searching", "traversal"],
    complexity: [
      "Insert O:(n)",
      "Delete : O(n)",
      "Traverse : O(n)",
      "Search : O(n) for BST : O(log n)",
    ],
    applications: [
      "Efficient data storage and retrival",
      "File systems",
      "Search engines",
    ],
    visualOperations: {
      buttons: ["Insert", "Delete", "InorderTraversal","PreorderTraversal","PostorderTraversal","LevelorderTraversal"],
      pseudocode: {
        Insert: `function insert(root, key) {
  if (root == null) return { key, left: null, right: null };
  if (key < root.key) root.left = insert(root.left, key);
  else root.right = insert(root.right, key);
  return root;
}`,
        Delete: `function delete(root, key) {
  // handle three cases (no child, one child, two children)
  // see standard BST deletion
}`,
        Search: `function search(root, key) {
  if (!root || root.key === key) return root;
  return key < root.key ? search(root.left, key) : search(root.right, key);
}`,
        Traverse: `function inorder(root) {
  if (root) {
    inorder(root.left);
    console.log(root.key);
    inorder(root.right);
  }
}`,
      },
    },
    algorithms: [
      "Lowest common ancestor",
      "Diameter of binary tree",
      "Height of tree",
      "Balanced tree check",
    ],
  },
  // graph
  graph: {
    definition:
      "A collection of nodes (also called vertices) connected by edges",
    properties: ["Connectivity", "Path existance", "Cycles"],
    types: ["Directed graph", "Undirected graph", "Weighted graph", "Unweighted graph"],
    operations: [
      "Adding removing vertices",
      "Adding/removing edges",
      "Finding paths",
      "Checking for element presence",
    ],
    complexity: ["General time complexity : O(V+E)"],
    applications: ["Social networks", "Route planning", "Computer networks"],
    visualOperations: {
      buttons: ["AddVertex", "AddEdge", "DFS", "BFS"],
      pseudocode: {
        "Add Vertex": `function addVertex(graph, vertex) {
  if (!graph[vertex]) graph[vertex] = [];
}`,
        "Add Edge": `function addEdge(graph, v1, v2) {
  graph[v1].push(v2);
  graph[v2].push(v1);
}`,
        DFS: `function dfs(node, visited) {
  visited[node] = true;
  for (neighbor of graph[node]) {
    if (!visited[neighbor]) dfs(neighbor, visited);
  }
}`,
        BFS: `function bfs(start) {
  const queue = [start], visited = {};
  visited[start] = true;
  while (queue.length) {
    node = queue.shift();
    for (n of graph[node]) {
      if (!visited[n]) {
        visited[n] = true;
        queue.push(n);
      }
    }
  }
}`,
      },
    },
    algorithms: [
      "Dijkstra’s algorithm",
      "Detect cycle",
      "Topological sort",
      "Minimum spanning tree",
    ],
  },
  // hashmap
  hashmap: {
    definition:
      "A data structure that stores key-value pairs for efficient retrieval using a hash function.",
    properties: [
      "Unordered collection",
      "Constant time complexity for average case operations",
      "Uses hashing for quick access",
    ],
    types: [
      "HashMap (Java)",
      "HashTable",
      "LinkedHashMap",
      "TreeMap (ordered variant)",
    ],
    operations: [
      "Insert key-value pair",
      "Delete key",
      "Update value",
      "Retrieve value by key",
    ],
    complexity: ["Insert: O(1)", "Search: O(1)", "Delete: O(1)"],
    applications: [
      "Implementing caches",
      "Counting frequency of elements",
      "Indexing for databases",
    ],
    visualizeDesc:
      "Visualize key-value insertion and see how collisions are handled using chaining or open addressing.",
    visualOperations: {
      buttons: ["Insert", "Delete", "Search"],
      pseudocode: {
        Insert: `function insert(map, key, value) {
  map[key] = value;
}`,
        Delete: `function delete(map, key) {
  delete map[key];
}`,
        Search: `function search(map, key) {
  return map[key];
}`,
      },
    },
    algorithms: [
      "Two sum",
      "Group anagrams",
      "Longest consecutive sequence",
      "Subarray sum equals K",
    ],
  },
  // hashset
  hashset: {
    definition:
      "A collection that contains no duplicate elements and allows constant-time access using hashing.",
    properties: [
      "No duplicate elements",
      "Unordered",
      "Backed by a HashMap internally (in Java)",
    ],
    types: ["HashSet", "LinkedHashSet (insertion order)", "TreeSet (sorted)"],
    operations: [
      "Add element",
      "Remove element",
      "Check presence",
      "Clear set",
    ],
    complexity: ["Add: O(1)", "Remove: O(1)", "Search: O(1)"],
    applications: [
      "Removing duplicates",
      "Set operations (union, intersection)",
      "Membership testing",
    ],
    visualizeDesc:
      "Observe how duplicates are ignored and how hashing helps with fast lookup and removal.",
    visualOperations: {
      buttons: ["Insert", "Delete", "Search"],
      pseudocode: {
        Add: `function add(set, item) {
  set.add(item);
}`,
        Remove: `function remove(set, item) {
  set.delete(item);
}`,
        Check: `function has(set, item) {
  return set.has(item);
}`,
      },
    },
    algorithms: [
      "Longest consecutive sequence",
      "Union and intersection",
      "Detect duplicates",
      "Happy number",
    ],
  },
  mapsAndSets: {
  definition:
    "Maps and Sets are hash-based data structures that provide efficient access and storage. Maps store key-value pairs, while Sets store unique values.",
  properties: [
    "Unordered collections",
    "Constant time average case for insertion, deletion, and search",
    "HashMap stores key-value pairs, HashSet stores only unique values",
    "Backed by hashing mechanism for performance",
  ],
  types: [
    "HashMap",
    "HashTable",
    "LinkedHashMap",
    "TreeMap (ordered)",
    "HashSet",
    "LinkedHashSet (insertion order)",
    "TreeSet (sorted)",
  ],
  operations: [
    "Insert key-value pair (Map)",
    "Delete key (Map)",
    "Update value (Map)",
    "Retrieve value by key (Map)",
    "Add element (Set)",
    "Remove element (Set)",
    "Check presence (Set)",
    "Clear all elements",
  ],
  complexity: [
    "Insert: O(1)",
    "Delete: O(1)",
    "Search: O(1)",
    "Update: O(1)",
  ],
  applications: [
    "Caching and indexing (Map)",
    "Counting frequency of elements (Map)",
    "Membership testing (Set)",
    "Removing duplicates (Set)",
    "Set operations like union and intersection (Set)",
  ],
  visualizeDesc:
    "Visualize key-value pairs in maps and unique elements in sets. See how collisions are handled in maps and how sets ignore duplicates using hashing.",
  visualOperations: {
    buttons: ["insertHashmap", "deleteHashmap", "searchHashmap","insertHashset", "deleteHashset", "searchHashset"],
    pseudocode: {
      Insert: `// For Map
function insert(map, key, value) {
  map[key] = value;
}
// For Set
function add(set, item) {
  set.add(item);
}`,
      Delete: `// For Map
function delete(map, key) {
  delete map[key];
}
// For Set
function remove(set, item) {
  set.delete(item);
}`,
      Search: `// For Map
function search(map, key) {
  return map[key];
}
// For Set
function has(set, item) {
  return set.has(item);
}`,
    },
  },
  algorithms: [
    "Two sum (Map)",
    "Group anagrams (Map)",
    "Subarray sum equals K (Map)",
    "Longest consecutive sequence (Set/Map)",
    "Detect duplicates (Set)",
    "Union and intersection (Set)",
    "Happy number (Set)",
  ],
},
};

function populateContent(data) {
  document.title = capitalizeFirstLetter(getQueryParam("type"));
  document.querySelector("h1.text-4xl").innerText = capitalizeFirstLetter(
    getQueryParam("type")
  );
  document.getElementById("definition").innerText = data.definition;
  fillList("properties", data.properties);
  fillList("types", data.types);
  fillList("operations", data.operations);
  fillList("complexity", data.complexity);
  fillList("commonQs", data.commonQs || data.applications || []);
  document.querySelector("section p.text-center").innerText =
    data.visualizeDesc || "";
  generateButtons(
    data.visualOperations?.buttons || [],
    data.visualOperations?.pseudocode || {}
  );
  // generateAlgo(data.algorithms || []);
}

// buttons...
function generateButtons(buttonNames, pseudocodeMap) {
  const container = document.getElementById("operationButtons");
  container.innerHTML = ""; // Clear existing buttons
  const pseudoDisplay = document.getElementById("pseudocodeText");

  buttonNames.forEach((btnName) => {
    const button = document.createElement("button");
    button.className =
      "bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400";
    button.innerText = btnName;
    button.onclick = () => {
      pseudoDisplay.innerText =
        pseudocodeMap[btnName] || "No pseudocode available.";

      const dsType = getQueryParam("type");
      if (window.runVisualOperation) {
        runVisualOperation(dsType, btnName.toLowerCase());
      }
    };
    container.appendChild(button);
  });
}
// algorithms..
// function generateAlgo(algoName) {
//   const algoDiv = document.getElementById("algorithms");
//   algoDiv.innerHTML = "";
//   algoName.forEach((algo) => {
//     const divs = document.createElement("div");
//     divs.className = `
//   bg-white/20 text-base text-center sm:text-lg md:text-lg lg:text-xl 
//   font-semibold 
//   p-3 sm:p-4 md:p-6 xl:p-8 
//   rounded-lg 
//   shadow-md shadow-cyan-500/50 
//   transition transform duration-300 ease-in-out 
//   hover:scale-105 hover:-translate-y-1 hover:shadow-lg
// `.trim();
//     divs.innerText = algo;
//     algoDiv.appendChild(divs);
//     divs.onclick=()=>window.location.href = "/explore-questions"
//   });
// }
function fillList(id, items) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const selectedType = getQueryParam("type");
if (selectedType && contentData[selectedType]) {
  populateContent(contentData[selectedType]);
} else {
  document.querySelector("h1.text-4xl").innerText = "Data Structure";
}
