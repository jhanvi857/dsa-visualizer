import React from "react";
import { bubbleSort,selectionSort,insertionSort,mergeSort,quickSort,heapSort, createBoxes } from "../Algorithms/sortingAlgo";
import { createBox, createBoxList, getContainer,delay } from "./utils/visualHelpers";
import { visualOperations } from "./utils/visualizer";
import { useState } from "react";
import { redirectToVisualizer } from "../classical_questions/queVisualize";
import { climbingStairsDP, prefixDiffCombined, slidingWindowSum, toggleBitAnimation } from "./animation/algoAnimation";
import { problemAnswers } from "./animation/problemAnimations";
import { pseudoExplain } from "../classical_questions/pseudoExplain";
import { animateLCA, buildTreeFromArray, getRoot, renderTree } from "./utils/structure";
import { useEffect } from "react";
export function SearchingSorting() {
  const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    func: () => bubbleSort([2, 1, 3, 8, 7]),
    problemName: "bubble sort",
  },
  {
    name: "Selection Sort",
    func: () => selectionSort([2, 1, 3, 4, 8, 7]),
    problemName: "selection sort",
  },
  {
    name: "Insertion Sort",
    func: () => insertionSort([2, 4, 5, 1, 3, 7]),
    problemName: "insertion sort",
  },
  {
    name: "Merge Sort",
    func: () => {
      const arr = [2, 7, 13, 11, 4, 8];
      createBoxes(arr);
      mergeSort(arr);
    },
    problemName: "merge sort",
  },
  {
    name: "Quick Sort",
    func: () => {
      const arr = [2, 7, 13, 11, 4, 8];
      createBoxes(arr);
      quickSort(arr);
    },
    problemName: "quick sort",
  },
  {
    name: "Heap Sort",
    func: () => {
      const arr = [2, 7, 13, 11, 4, 8];
      createBoxes(arr);
      heapSort(arr);
    },
    problemName: "heap sort",
  },
];
const [selectedAlgo, setSelectedAlgo] = useState(null);
  const handleAlgoClick = (algo) => {
    setSelectedAlgo(algo);
  };


  return (
    <>
      <div className="px-12">
      <h1 className="text-4xl text-center m-4 font-bold text-white">
        Searching & Sorting Algorithms
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 pb-8 gap-y-8 px-4 md:px-4">
        {sortingAlgorithms.map((algo, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/20 p-4 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-white text-center mb-4">
              {algo.name}
            </h2>
            <a
              href="#visualize"
              onClick={()=>handleAlgoClick(algo)}
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
            >
              Visualize →
            </a>
          </div>
        ))}
      </div>
        <hr />
      {/* Visualization UI below */}
      <VisualizeArea onExplain={selectedAlgo?.func}
          problemName={selectedAlgo?.problemName}/>
    </div>
    </>
  );
}

export function RecBackTrack() {
  const recBacktrackProblems = [
  {
    name: "Recursion Example: Fibonacci Series (Recursive)",
    func: () => startFibAnimation(4),
    problemName: "fibonacci (recursion)",
  },
  {
    name: "Backtracking Example: Subsets of an Array",
    func: () => startBacktrackingAnimation(),
    problemName: "backtracking - subarrays",
  },
];

  const [selectedAlgo, setSelectedAlgo] = useState(null);

  const handleAlgoClick = (algo) => {
    setSelectedAlgo(algo);
  };

  return (
    <div className="px-12">
      <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Recursion & Backtracking
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recBacktrackProblems.map((algo, idx) => (
          <div
            key={idx}
            className="mb-10 bg-white/20 rounded-lg flex flex-col items-center"
          >
            <h2 className="text-white text-2xl p-4">{algo.name}</h2>
            <a
              href="#visualize"
              onClick={() => handleAlgoClick(algo)}
              className="bg-cyan-500 mb-4 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
            >
              Visualize →
            </a>
          </div>
        ))}
      </div>

      <hr />
      <VisualizeArea
        onExplain={selectedAlgo?.func}
        problemName={selectedAlgo?.problemName}
      />
    </div>
  );
}


export function DP() {
  const dpCards = [
  {
    title: "Definition",
    content:
      "Dynamic Programming (DP) solves complex problems by breaking them into simpler subproblems and storing results to avoid redundant work.",
  },
  {
    title: "Properties",
    isList: true,
    content: [
      "Overlapping Subproblems",
      "Optimal Substructure",
      "Memoization (Top-Down) and Tabulation (Bottom-Up)",
      "Avoids repeated calculations",
    ],
  },
  {
    title: "Types",
    isList: true,
    content: [
      "Memoization (Top-Down with caching)",
      "Tabulation (Bottom-Up with iteration)",
      "Bitmask DP",
      "Digit DP",
      "State-Space Compression",
    ],
  },
  {
    title: "Operations",
    isList: true,
    content: [
      "Identify the state and define DP[i]",
      "Set base cases",
      "Write recurrence relation",
      "Apply memoization or tabulation",
      "Optimize space if needed",
    ],
  },
  {
    title: "Time & Space Complexity",
    isList: true,
    content: [
      "Time: O(n), O(n*m), O(n²) based on state space",
      "Space: O(n) or O(n²)",
      "Memoization uses recursion stack space",
      "Tabulation allows space optimization",
    ],
  },
  {
    title: "Applications",
    isList: true,
    content: [
      "Longest Common Subsequence (LCS)",
      "0/1 Knapsack Problem",
      "Fibonacci Number",
      "Coin Change Problem",
      "Matrix Chain Multiplication",
      "Palindrome Partitioning",
    ],
  },
];
  const dpProblems = [
    {
      name :"climbing stairs",
      func : ()=>climbingStairsDP(7),
      problemName : "climbing stairs"
    }
  ]
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  const handleAlgoClick = (algo) => {
    setSelectedAlgo(algo);
  };
useEffect(() => {
    setSelectedAlgo(dpProblems[0]);
  }, []);
  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Dynamic Programming
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-12 pb-8 gap-y-8">
      {dpCards.map((card,idx)=>(
        <AlgoCard key={idx} {...card} />

      ))}
    </div>
<hr />
      {/* Visualizer Section */}
      <VisualizeArea
        onExplain={selectedAlgo?.func}
        problemName={selectedAlgo?.problemName}
      />
    </>
  );
}
export function Greedy() {
  const greedyCards = [
    {
      title: "Definition",
      content:
        "Greedy algorithms build up a solution piece by piece, always choosing the next piece that offers the most immediate benefit.",
    },
    {
      title: "Properties",
      isList: true,
      content: [
        "Greedy Choice Property",
        "Optimal Substructure",
        "No revisiting or backtracking",
        "Efficient & fast (O(n log n) or O(n))",
      ],
    },
    {
      title: "Types",
      isList: true,
      content: [
        "Pure Greedy",
        "Greedy with Sorting",
        "Greedy with Priority Queue",
        "Interval Scheduling",
      ],
    },
    {
      title: "Operations",
      isList: true,
      content: [
        "Sort data based on a strategy",
        "Iterate and pick best local choice",
        "Check for constraints",
        "Build solution incrementally",
      ],
    },
    {
      title: "Time & Space Complexity",
      isList: true,
      content: [
        "Time: O(n log n) (due to sorting)",
        "Space: O(1) to O(n)",
        "Faster than DP for suitable problems",
      ],
    },
    {
      title: "Optimization Techniques",
      isList: true,
      content: [
        "Greedy with custom comparator",
        "Greedy with heap/priority queue",
        "Greedy in hybrid with DP",
        "Greedy with greedy-choice test",
      ],
    },
  ];
  const greedyProblem = [
    {
      name :"container with most water",
      func : ()=> problemAnswers["container with most water"]([1, 8, 6, 2, 5, 4, 8, 3, 7]),
      problemName : "container with most water"
    }
  ];
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  useEffect(() => {
    setSelectedAlgo(greedyProblem[0]);
  }, []);

  return (
    <>
      <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Greedy Algorithms
      </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-12 pb-8 gap-y-8">
      {greedyCards.map((card, i) => (
        <AlgoCard key={i} {...card} />
      ))}
      </div>
      <hr />
      <VisualizeArea
        onExplain={selectedAlgo?.func}
        problemName={selectedAlgo?.problemName}
      />
    </>
  );
}

export function BitM() {
  const bitManipulationCards = [
  {
    title: "Definition",
    content: "Bit Manipulation involves using binary representations of integers to perform operations like AND, OR, XOR, shifts, and masking to solve problems efficiently.",
  },
  {
    title: "Operations",
    isList: true,
    content: [
      "Set, clear, toggle bits",
      "Check if bit is set",
      "Count set bits",
      "Left/Right shift",
      "Bitmasking subsets",
    ],
  },
  {
    title: "Types",
    isList: true,
    content: [
      "Basic Bit Tricks",
      "Masking Techniques",
      "Bitmask DP",
      "XOR-based logic",
    ],
  },
  {
    title: "Applications",
    isList: true,
    content: [
      "Subsets using bitmasks",
      "Optimized DP",
      "Security algorithms",
      "Graph encoding",
    ],
  },
  {
    title: "Time & Space Complexity",
    isList: true,
    content: [
      "Time: O(1) for individual ops",
      "Time: O(n × bits) for full traversal",
      "Space: O(1) unless bitsets used",
    ],
  },
  {
    title: "Common Mistakes",
    isList: true,
    content: [
      "Incorrect shift direction",
      "Wrong precedence of operators",
      "1-based vs 0-based bit indexing",
    ],
  },
];
const bitManipulation = [
  {
    name : "change bit at position",
    func :()=>toggleBitAnimation(8,2),
    problemName : "change bit at position"
  }
];
    const [selectedAlgo, setSelectedAlgo] = useState(null);

useEffect(() => {
    setSelectedAlgo(bitManipulation[0]);
  }, []);
  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Bit manipulation
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-12 pb-8 gap-y-8">
      {bitManipulationCards.map((card, i) => (
        <AlgoCard key={i} {...card} />
      ))}
    </div>
    <hr/>
    <VisualizeArea
        onExplain={selectedAlgo?.func}
        problemName={selectedAlgo?.problemName}
      />
    </>
  );
}
export function Tree() {
  const LCA = async () => {
    const arr = [1, 2, 3, 4, 5];
    const root = buildTreeFromArray(arr);
    renderTree(root);
    await animateLCA(root, 5, 4);
  };

  const treeProblems = [
    {
      name: "lowest common ancestor",
      func: () => LCA(),
      problemName: "lowest common ancestor",
    },
  ];

  const [selectedAlgo, setSelectedAlgo] = useState(null);

  useEffect(() => {
    setSelectedAlgo(treeProblems[0]);
  }, []);

  return (
    <>
      <h1 className="text-white text-4xl text-center mb-8 font-semibold">
        Tree Algorithms
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 pb-8 gap-y-8">
        <div className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
          <h1 className="text-xl md:text-3xl font-semibold text-white text-center mb-4">
            Tree <br /> Traversals
          </h1>
          <div className="flex justify-center items-center h-16">
            <a
              href="#"
              onClick={() => redirectToVisualizer("tree")}
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
            >
              Visualize →
            </a>
          </div>
        </div>

        <div className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
          <h1 className="text-xl md:text-3xl font-semibold text-white text-center mb-4">
            Lowest Common Ancestor
          </h1>
          <div className="flex justify-center items-center h-16">
            <a
              href="#visualize"
              onClick={() => setSelectedAlgo(treeProblems[0])}
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
            >
              Visualize →
            </a>
          </div>
        </div>
      </div>
      <hr />
      <VisualizeArea
        onExplain={selectedAlgo?.func}
        problemName={selectedAlgo?.problemName}
      />
    </>
  );
}
export function SlidingWindow( ) {
  const slidingWindowCards = [
  {
    title: "Definition",
    content: "Sliding Window is a technique to efficiently calculate values over subarrays of fixed or dynamic size by maintaining a window over the array and updating its content.",
  },
  {
    title: "Operations",
    isList: true,
    content: [
      "Maintain window bounds",
      "Add/remove elements as window moves",
      "Track min/max/sum in window",
    ],
  },
  {
    title: "Types",
    isList: true,
    content: [
      "Fixed-size window",
      "Variable-size window",
      "Two-pointer sliding window",
    ],
  },
  {
    title: "Applications",
    isList: true,
    content: [
      "Max sum subarray of size k",
      "Longest substring without repeat",
      "Minimum window substring",
    ],
  },
  {
    title: "Time & Space Complexity",
    isList: true,
    content: [
      "Time: O(n)",
      "Space: O(1) or O(k)",
    ],
  },
  {
    title: "Common Mistakes",
    isList: true,
    content: [
      "Wrong window initialization",
      "Incorrect index range (i vs i+k-1)",
      "Not shrinking/growing window properly",
    ],
  },
];
  const slidingWindow = [
    {
      name :"sliding window",
      func:() =>slidingWindowSum([1, 3, 2, 5, 4, 1], 3),
      problemName :"sliding window - max sum"
    }
  ]
const [selectedAlgo, setSelectedAlgo] = useState(null);

  useEffect(() => {
    setSelectedAlgo(slidingWindow[0]);
  }, []);


  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Sliding window algorithm
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-12 pb-8 gap-y-8">
      {slidingWindowCards.map((card, i) => (
        <AlgoCard key={i} {...card} />
      ))}
    </div>
    <hr/>
    <VisualizeArea onExplain={selectedAlgo?.func}
        problemName={selectedAlgo?.problemName}/>
    </>
  );
}
export function PreSumDiffArr( ) {
  const prefixSumDiffCards = [
  {
    title: "Definition",
    content: "Prefix Sum stores cumulative sums to answer range sum queries in O(1). Difference Array allows fast range updates by storing changes rather than applying them immediately.",
  },
  {
    title: "Operations",
    isList: true,
    content: [
      "Build prefix sum array: prefix[i] = prefix[i-1] + arr[i]",
      "Build diff array: diff[l] += val; diff[r+1] -= val;",
      "Apply prefix sum on diff array to get final result",
    ],
  },
  {
    title: "Types",
    isList: true,
    content: [
      "1D prefix sum",
      "2D prefix sum (matrix)",
      "Difference array",
      "Sparse range updates",
    ],
  },
  {
    title: "Applications",
    isList: true,
    content: [
      "Range sum queries",
      "Range update queries",
      "Histogram problems",
      "Time-series optimizations",
    ],
  },
  {
    title: "Time & Space Complexity",
    isList: true,
    content: [
      "Build Time: O(n)",
      "Query Time: O(1)",
      "Range Update with Diff: O(1) per update",
    ],
  },
  {
    title: "Common Mistakes",
    isList: true,
    content: [
      "Incorrect prefix initialization",
      "Wrong difference array updates",
      "Index off-by-one errors",
    ],
  },
];
const preDiffArr = [
  {
    name: "prefix sum difference array",
    func : ()=>problemAnswers["product of array except itself"]([1,2,3,4]),
    problemName:"prefix sum"
  }
]
const [selectedAlgo, setSelectedAlgo] = useState(null);

  useEffect(() => {
    setSelectedAlgo(preDiffArr[0]);
  }, []);

  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Prefix sum & difference array
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-12 pb-8 gap-y-8">
      {prefixSumDiffCards.map((card, i) => (
        <AlgoCard key={i} {...card} />
      ))}
    </div>
    <hr />
    <VisualizeArea onExplain={selectedAlgo?.func}
        problemName={selectedAlgo?.problemName}/>
    </>
  );
}

async function animateFib(n) {
  // Create a visual stack box
  const label = `fib(${n}) = ?`;
  visualOperations.stack.push(label);
  await delay(600);

  if (n === 0 || n === 1) {
    // Highlight top
    visualOperations.stack.peek();
    await delay(400);

    // Replace label with actual return
    const container = document.getElementById("visualize");
    const topBox = container.lastElementChild;
    topBox.innerText = `fib(${n}) = ${n}`;
    await delay(800);

    // Pop stack
    visualOperations.stack.pop();
    await delay(400);

    return n;
  }

  const left = await animateFib(n - 1);
  const right = await animateFib(n - 2);
  const result = left + right;

  // Highlight top
  visualOperations.stack.peek();
  await delay(400);

  // Update current top with return value
  const container = document.getElementById("visualize");
  const topBox = container.lastElementChild;
  if (topBox) topBox.innerText = `fib(${n}) = ${result}`;
  await delay(800);

  // Pop after visual delay
  visualOperations.stack.pop();
  await delay(400);

  return result;
}

async function startFibAnimation(n) {
  const container = getContainer();
  container.innerHTML = ""; // reset stack

  const result = await animateFib(n);
  alert(`Final result of fib(${n}) is: ${result}`);
}

// Backtracking
async function animateSubsets(arr, index = 0, path = []) {
  if (index === arr.length) {
    // Base case: show current subset
    const label = `✓ [${path.join(", ")}]`;
    visualOperations.stack.push(label);
    await delay(800);
    visualOperations.stack.pop();
    return;
  }

  // Include arr[index]
  path.push(arr[index]);
  visualOperations.stack.push(`+ ${arr[index]} → [${path.join(", ")}]`);
  await delay(600);

  await animateSubsets(arr, index + 1, path);

  // Backtrack (undo decision)
  path.pop();
  visualOperations.stack.push(`- ${arr[index]} ← [${path.join(", ")}]`);
  await delay(600);
  visualOperations.stack.pop();

  // Exclude arr[index]
  await animateSubsets(arr, index + 1, path);
}
// trigger Backtrack
async function startBacktrackingAnimation() {
const container = getContainer();
  container.innerHTML = "";
  await animateSubsets([1, 2]);
}
const AlgoCard = ({ title, content, isList = false }) => (
  <div className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center mb-4">{title}</h1>
    {isList ? (
      <ul className="list-disc text-lg text-justify px-4 space-y-1">
        {content.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-lg text-justify px-4">{content}</p>
    )}
  </div>
);
export default AlgoCard;

export function VisualizeArea({ onExplain, problemName }) {
  const [text, setText] = useState("The output will be shown here");

  const handleExplainClick = async () => {
    if (pseudoExplain[problemName]) {
      setText(pseudoExplain[problemName].explanation);
    } else {
      setText("Explanation not available.");
    }

    await delay(2000); // wait 2 seconds before running animation
    if (onExplain) await onExplain();
  };

  const handlePseudocodeClick = () => {
    if (pseudoExplain[problemName]) {
      setText(pseudoExplain[problemName].pseudocode);
    } else {
      setText("Pseudocode not available.");
    }
  };

  return (
    <section className="bg-white/20 py-8 px-4 sm:px-6 md:px-10 lg:px-12 rounded-lg shadow-md shadow-cyan-500/50 mb-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-6">
        Visualize
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium text-white transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
          onClick={handleExplainClick}
        >
          Explanation
        </button>
        <button
          className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium text-white transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
          onClick={handlePseudocodeClick}
        >
          Pseudocode
        </button>
      </div>

      {/* Explanation or Pseudocode */}
      <div className="mt-6 bg-white/20 rounded-xl p-4 sm:p-6 mb-8">
        <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm sm:text-lg text-white font-mono whitespace-pre-wrap">
          {text}
        </pre>
      </div>

      {/* Visualization Container */}
      <div
        className="bg-white/20 border-2 border-dashed border-gray-300 rounded-xl h-52 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center text-gray-400 text-sm sm:text-lg text-center px-4"
        id="visualize"
      >
        {/* Animation output appears here */}
      </div>
    </section>
  );
}

