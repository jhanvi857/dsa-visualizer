import React from "react";
import { Link } from "react-router-dom";
import {
  dijkstra, topoSort, bellmanFord, floydWarshall,
  kruskal, prim, kosaraju, tarjans
} from "../src/animation/graph";
import { graph } from "../src/utils/structure";
import { LLAnimate } from "../src/animation/LLAnimation";
import { problemAnswers } from "../src/animation/problemAnimations";
import {
  euclideanGCD, sieveOfEratosthenes,
  fermatsLittleTheorem, modExpo
} from "../src/animation/algoAnimation";
import { pseudoExplain } from "../classical_questions/pseudoExplain";

const headings = [
  "Number Theory & Math Algorithms",
  "Array algorithms & pointer techniqueues",
  "Graph Algorithms",
];

const groupedAlgorithms = {
  "Number Theory & Math Algorithms": [
    "Euclidean Algorithm (GCD)",
    "Sieve of Eratosthenes",
    "Modular exponentiantation",
    "Fermart's theorem"
  ],
  "Array algorithms & pointer techniqueues": [
    "Floyd’s Cycle Detection",
    "Dutch National Flag Algorithm",
    "Kadane’s Algorithm",
    "Moore's algorithm"
  ],
  "Graph Algorithms": [
    "Dijkstra's algorithm",
    "Bellman ford algorithm",
    "Topological sort",
    "Floyd-Warshall algorithm",
    "Kruskal's algorithm",
    "Prim's algorithm",
    "Kosaraju’s (SCC)",
    "Tarjan’s Algorithm",
  ],
};

const AlgoHome = () => {

  const handleAlgoClick = async (algo) => {
    const cleanKey = algo.toLowerCase().replace(/\n/g, "").trim();
    const pseudoBox = document.getElementById("pseudocodeText");

    // Scroll to animation section
    document.getElementById("visualize")?.scrollIntoView({ behavior: "smooth" });

    // Show explanation if available
    if (pseudoBox) {
      if (pseudoExplain[cleanKey]) {
        const { explanation, pseudocode } = pseudoExplain[cleanKey];
        pseudoBox.textContent = `${explanation.trim()}\n\nPseudocode:\n${pseudocode.trim()}`;
      } else {
        pseudoBox.textContent = "Explanation and pseudocode not available.";
      }
    }

    // Reset graph structure
    if (graph.reset) graph.reset();

    switch (cleanKey) {
      case "dijkstra's algorithm":
        graph.reset();
        graph.addDemoGraph();
        await dijkstra(graph, "a");
        break;

      case "bellman ford algorithm":
        graph.reset();
        graph.addDemoGraph();
        bellmanFord(graph, "a");
        break;

      case "topological sort":
        graph.reset();
        graph.addDemoGraph();
        topoSort(graph);
        break;

      case "floyd-warshall algorithm":
        graph.reset();
        graph.addDemoGraph();
        floydWarshall(graph);
        break;

      case "kruskal's algorithm":
        graph.reset();
        graph.addDemoGraph();
        kruskal(graph);
        break;

      case "prim's algorithm":
        graph.reset();
        graph.addDemoGraph();
        prim(graph, "b");
        break;

      case "kosaraju’s (scc)":
        graph.reset();
        graph.addDemoGraph();
        kosaraju(graph);
        break;

      case "tarjan’s algorithm":
        graph.reset();
        graph.addDemoGraph();
        tarjans(graph);
        break;

      case "floyd’s cycle detection":
        LLAnimate["detect and remove cycle"]();
        break;

      case "dutch national flag algorithm":
        problemAnswers["sort an array with 0s 1s and 2s"]([0, 1, 2, 0, 0, 1, 2, 0]);
        break;

      case "kadane’s algorithm":
        problemAnswers["maximum subarray sum"]();
        break;

      case "moore's algorithm":
        problemAnswers["majority element"]();
        break;

      case "euclidean algorithm (gcd)":
        euclideanGCD(20, 28);
        break;

      case "sieve of eratosthenes":
        sieveOfEratosthenes(20);
        break;

      case "modular exponentiantation":
        modExpo(10, 20, 3);
        break;

      case "fermart's theorem":
        fermatsLittleTheorem(5, 3);
        break;

      default:
        alert("Animation not defined yet.");
    }
  };

  return (
    <div className="min-h-screen px-4 pt-8 pb-20 text-white" id="algorithmsHeading">
      {headings.map((heading) => (
        <>
        <div key={heading} className="mb-16">
          <h1 className="text-4xl text-center mb-8 font-semibold">{heading}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {groupedAlgorithms[heading].map((algo) => (
              <div
                key={algo}
                className="bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 hover:scale-105 transition duration-300"
              >
                <h2 className="text-xl md:text-2xl text-center mb-4">{algo}</h2>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleAlgoClick(algo)}
                    className="bg-cyan-500 px-4 py-2 rounded-md hover:bg-cyan-400 transition text-lg"
                  >
                    Visualize →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        </>
      ))}
      <div className="px-4 sm:px-6 md:px-10 lg:px-10 rounded-lg mb-6">
        <section className="bg-white/20 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16 rounded-lg shadow-md shadow-cyan-500/50">
          <div className="max-w-7xl mx-auto">
            {/* <!-- Heading --> */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
              Visualize
            </h2>

            {/* <!-- Description --> */}
            <p className="text-center text-sm sm:text-base lg:text-lg mb-8"></p>
            {/* <!-- buttons --> */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 hover:cursor-pointer"
                id="ExplainationBtn"
              >
                Explaination
              </a>
              <button
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 hover:cursor-pointer"
                id="pseudocode" 
              >
                Pseudocode
              </button>
              <div className="relative inline-block text-left">
                <button
                  id="codeDropdownBtn" onClick={()=>alert("No other approach available currently !")}
                  type="button"
                  className="inline-flex w-full justify-center items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
                >
                  Other Approaches
                  <svg
                    className="-mr-1 size-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="codeDropdownMenu"
                  className="hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition ease-out duration-100"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                ></div>
              </div>
            </div>
            <div
              className="mt-10 bg-white/20 rounded-xl p-4 sm:p-6 mb-8"
              id="pseudocodeSection"
            >
              <pre
                className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm sm:text-lg text-white font-mono"
                id="pseudocodeText"
              >
                The output will be shown here
              </pre>
            </div>
          
            <div
  id="visualize"
  className=" pt-16 overflow-auto bg-white/20 border-2 border-dashed border-gray-300 rounded-xl h-52 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center text-gray-400 text-sm sm:text-lg text-center"
></div>


            <div className="mt-6 bg-white/20 rounded-xl p-4 sm:p-6 mb-8 w-full">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 text-center">
                Got a different approach? ✍️
              </h3>
              
              <div className="flex flex-col items-center sm:flex-row justify-center">
                <Link to="/">
                <button
                  className="bg-cyan-400 shadow-lg mt-2 shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
                  id="submit-approach"
                >
                  Submit your approach
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <div id="visualize" className="overflow-auto bg-white/20 border-2 border-dashed border-gray-300 rounded-xl h-52 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center text-gray-400 text-sm sm:text-lg text-center px-4">
        <pre id="pseudocodeText" className="whitespace-pre-wrap text-white font-mono text-sm"></pre>
      </div> */}
    </div>
  );
};

export default AlgoHome;
