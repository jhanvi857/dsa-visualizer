import React from "react";
import { bubbleSort,selectionSort,insertionSort,mergeSort,quickSort,heapSort, createBoxes } from "../Algorithms/sortingAlgo";
import { createBox, createBoxList, getContainer,delay } from "./utils/visualHelpers";
import { visualOperations } from "./utils/visualizer";
import { useState } from "react";
import { redirectToVisualizer } from "../classical_questions/queVisualize";
import { climbingStairsDP, prefixDiffCombined, slidingWindowSum, toggleBitAnimation } from "./animation/algoAnimation";
export function SearchingSorting() {
  const sortingAlgorithms = [
  { name: "Bubble Sort", func:()=> bubbleSort([2,1,3,8,7])},
  { name: "Selection Sort", func:()=> selectionSort([2,1,3,4,8,7])},
  { name: "Insertion Sort", func: ()=> insertionSort([2,4,5,1,3,7]) },
  { name: "Merge Sort", func: () => {
    const container = getContainer();
      const arr = [2, 7, 13, 11, 4, 8];
      createBoxes(arr); 
      mergeSort(arr); 
    } 
  },
  { name: "Quick Sort", func: () =>{ 
    const arr = [2, 7, 13, 11, 4, 8];
    createBoxes(arr); 
    quickSort(arr)} },
  { name: "Heap Sort", func: () =>{
    const arr = [2, 7, 13, 11, 4, 8];
    createBoxes(arr)
    heapSort(arr)
  }  }
];
  return (
    <>
      <div className="px-16">
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
              onClick={algo.func}
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
            >
              Visualize →
            </a>
          </div>
        ))}
      </div>
        <hr />
      {/* Visualization UI below */}
      <VisualizeArea/>
    </div>
    </>
  );
}

export function RecBackTrack() {
  const [activeTab, setActiveTab] = useState("explanation");

  const explanation = `
Recursion is when a function calls itself to solve a smaller part of the original problem.
Think of it as breaking down a big problem into smaller and smaller ones until you reach a base case.

Example: Fibonacci Series
fib(n) = fib(n-1) + fib(n-2)
Base cases: fib(0) = 0, fib(1) = 1

Backtracking is a type of recursion where you try out all possibilities (like in a maze or combinations), 
and undo your previous step if it leads to a dead end.

Key Concept: "Try → Explore → Undo (Backtrack)"
`;

  const pseudocode = `
Function fib(n):
  if n == 0:
    return 0
  if n == 1:
    return 1
  return fib(n-1) + fib(n-2)
`;

  return (
    <div className="px-12">
      <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Recursion & Backtracking
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-10 bg-white/20 rounded-lg flex flex-col items-center">
        <h2 className=" text-white text-2xl p-4">
         Recursion Example: Fibonacci Series (Recursive)
        </h2>
        <a
              href="#visualize"
              onClick={()=>startFibAnimation(4)}
              className="bg-cyan-500 mb-4 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
            >
              Visualize →
            </a>
      </div>
      {/* Backtracking */}
      <div className="mb-10 bg-white/20 rounded-lg flex flex-col items-center">
        <h2 className=" text-white text-2xl p-4">
         Backtracking Example: subsets of an array
        </h2>
        <a
              href="#visualize"
              onClick={()=>startBacktrackingAnimation()}
              className="bg-cyan-500 mb-4 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
            >
              Visualize →
            </a>
      </div>
      </div>
      <hr />
      <VisualizeArea/>
    </div>
  );
}

export function DP() {
  const dpProblems = [
  {
    name: "Climbing Stairs",
    func: () => climbingStairsDP(7),
  }
];

  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Dynamic Programming
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-16 pb-8 gap-y-8">
  {/* <!-- Definition --> */}
  <div className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Definition</h1>
    <p className="text-lg text-justify px-4" id="definition">Dynamic Programming (DP) is an optimization technique used to solve complex problems by breaking them down into simpler subproblems and storing the results of subproblems to avoid redundant computation.</p>
  </div>

  {/* <!-- Properties --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Properties</h1>
    <ul className="list-disc text-justify text-lg px-4" id="properties">
  <li>Overlapping Subproblems: Repeated calls with the same inputs.</li>
  <li>Optimal Substructure: Optimal solution can be constructed from optimal solutions of its subproblems.</li>
  <li>Memoization (Top-Down) and Tabulation (Bottom-Up) approaches.</li>
  <li>Used when recursion leads to repeated calculations.</li>
</ul>
  </div>

  {/* <!-- Types --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Types</h1>
    <ul className="list-disc text-justify text-lg px-4" id="types"><li>Memoization (Top-Down with caching)</li>
  <li>Tabulation (Bottom-Up with iteration)</li>
  <li>Bitmask DP</li>
  <li>Digit DP</li>
  <li>State-Space Compression</li></ul>
  </div>

  {/* <!-- Operations --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Operations</h1>
    <ul className="list-disc text-lg text-justify px-4" id="operations"><li>Identify the state and define DP[i] meaning.</li>
  <li>Set base cases correctly.</li>
  <li>Write recurrence relation / transition formula.</li>
  <li>Implement memoization or tabulation.</li>
  <li>Optimize space if needed.</li></ul>
  </div>

  {/* <!-- Time & Space Complexity --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Time & Space Complexity</h1>
    <ul className="text-lg list-disc text-justify px-4" id="complexity"><li>Time: O(n), O(n * m), O(n²), depending on state space.</li>
  <li>Space: O(n) or O(n²), reducible in many problems.</li>
  <li>Memoization uses extra space for recursion stack.</li>
  <li>Tabulation allows easy optimization of space.</li></ul>
  </div>

  {/* <!-- Applications --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Applications</h1>
    <ul className="list-disc text-lg text-justify px-4" id="applications"><li>Longest Common Subsequence (LCS)</li>
  <li>0/1 Knapsack Problem</li>
  <li>Fibonacci Number</li>
  <li>Coin Change Problem</li>
  <li>Matrix Chain Multiplication</li>
  <li>Palindrome Partitioning</li></ul>
  </div>
</div>

<hr />
{/* <!-- Visualization Area --> */}
<VisualizeArea onExplain={()=>climbingStairsDP(7)}/>
    </>
  );
}
export function Greedy() {
  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Greedy algorithms
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-16 pb-8 gap-y-8">
  {/* <!-- Definition --> */}
  <div className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Definition</h1>
    <p className="text-lg text-justify px-4">
      Greedy algorithms build up a solution piece by piece, always choosing the next piece that offers the most immediate benefit. The decision made at each step is locally optimal in the hope it leads to a globally optimal solution.
    </p>
  </div>

  {/* <!-- Properties --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Properties</h1>
    <ul className="list-disc text-justify text-lg px-4">
      <li>Greedy Choice Property</li>
      <li>Optimal Substructure</li>
      <li>No revisiting or backtracking</li>
      <li>Efficient & fast (O(n log n) or O(n))</li>
    </ul>
  </div>

  {/* <!-- Types --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Types</h1>
    <ul className="list-disc text-justify text-lg px-4">
      <li>Pure Greedy</li>
      <li>Greedy with Sorting</li>
      <li>Greedy with Priority Queue</li>
      <li>Interval Scheduling</li>
    </ul>
  </div>

  {/* <!-- Operations --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Operations</h1>
    <ul className="list-disc text-lg text-justify px-4">
      <li>Sort data based on a strategy (profit, weight, deadline)</li>
      <li>Iterate and pick the best local choice</li>
      <li>Check for constraints (capacity, conflicts, overlaps)</li>
      <li>Build solution incrementally</li>
    </ul>
  </div>

  {/* <!-- Time & Space Complexity --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Time & Space Complexity</h1>
    <ul className="text-lg list-disc text-justify px-4">
      <li>Time: O(n log n) (due to sorting)</li>
      <li>Space: O(1) to O(n), depends on implementation</li>
      <li>Faster than DP for suitable problems</li>
    </ul>
  </div>
  {/* <!-- Optimization Techniques --> */}
  <div className="flex flex-col items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
    <h1 className="text-3xl font-semibold text-white text-center m-4">Optimization Techniques</h1>
    <ul className="list-disc text-lg text-justify px-4">
      <li>Greedy with sorting (custom comparator)</li>
      <li>Greedy with heap/priority queue for dynamic choices</li>
      <li>Use greedy in hybrid with DP for some problems</li>
      <li>Greedy with greedy-choice test (mathematical proof)</li>
    </ul>
  </div>
</div>
<hr />
{/* Visualization area*/}
    <VisualizeArea/>
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

  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Bit manipulation
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-16 pb-8 gap-y-8">
      {bitManipulationCards.map((card, i) => (
        <AlgoCard key={i} {...card} />
      ))}
    </div>
    <hr/>
    <VisualizeArea onExplain={()=>toggleBitAnimation(8,2)}/>
    </>
  );
}
export function Tree() {
  return (
    <>
      <h1 className="text-white text-4xl text-center mb-8 font-semibold">
          Tree Algorithms
        </h1>
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 pb-8 gap-y-8"
        >
          <div
            className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            <h1
              className="text-xl md:text-3xl font-semibold text-white text-center mb-4"
            >
              Tree <br/> Traversals
            </h1>
            <div className="flex justify-center items-center h-16">
              <a
                href="#"
                onClick={()=>redirectToVisualizer("tree")}
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Visualize &#8594;
              </a>
            </div>
          </div>
          <div
            className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            <h1
              className="text-xl md:text-3xl font-semibold text-white text-center mb-4"
            >
              Lowest Common Ancestor
            </h1>
            <div className="flex justify-center items-center h-16">
              <a
                href=""
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Visualize &#8594;
              </a>
            </div>
          </div>
          <div
            className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            <h1
              className="text-xl md:text-3xl font-semibold text-white text-center mb-4"
            >
              BST <br/> Operations
            </h1>
            <div className="flex justify-center items-center h-16">
              <a
                href="#"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Visualize &#8594;
              </a>
            </div>
          </div>
          <div
            className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            <h1
              className="text-xl md:text-3xl font-semibold text-white text-center mb-4"
            >
              Segment <br/> Tree
            </h1>
            <div className="flex justify-center items-center h-16">
              <a
                href=""
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Visualize &#8594;
              </a>
            </div>
          </div>
        </div>
        <hr/>
        <VisualizeArea/>
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

  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Sliding window algorithm
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-16 pb-8 gap-y-8">
      {slidingWindowCards.map((card, i) => (
        <AlgoCard key={i} {...card} />
      ))}
    </div>
    <hr/>
    <VisualizeArea onExplain={()=>slidingWindowSum([1, 3, 2, 5, 4, 1], 3)}/>
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
  return (
    <>
    <h1 className="text-white text-center text-3xl sm:text-4xl mb-6 font-semibold">
        Prefix sum & difference array
      </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-16 pb-8 gap-y-8">
      {prefixSumDiffCards.map((card, i) => (
        <AlgoCard key={i} {...card} />
      ))}
    </div>
    <hr />
    <VisualizeArea onExplain={()=>prefixDiffCombined()}/>
    </>
  );
}

//
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

export function VisualizeArea ({onExplain}) {
  return (
    <>
    <div className="px-16">
    <section className="bg-white/20 py-8 px-4 sm:px-6 md:px-10 lg:px-16 rounded-lg shadow-md shadow-cyan-500/50 mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-6">
          Visualize
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium text-white transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
          onClick={onExplain} >
            Explanation
          </button>
          <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium text-white transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400">
            Pseudocode
          </button>
        </div>
        <div className="mt-6 bg-white/20 rounded-xl p-4 sm:p-6 mb-8">
          <pre
            className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm sm:text-lg text-white font-mono"
            id="pseudocodeText"
          >
            The output will be shown here
          </pre>
        </div>
        <div
          className="bg-white/20 border-2 border-dashed border-gray-300 rounded-xl h-52 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center text-gray-400 text-sm sm:text-lg text-center px-4"
          id="visualize"
        >
          {/* Visual output will appear here */}
        </div>
      </section>
      </div>
    </>
  )
}