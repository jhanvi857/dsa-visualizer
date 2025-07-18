import React, { useEffect } from "react";
import {
  dijkstra, topoSort, bellmanFord, floydWarshall,
  kruskal, prim, kosaraju, tarjans
} from "../src/animation/graph";
import { graph } from "../src/utils/structure";
import { LLAnimate } from "../src/animation/LLAnimation";
import { problemAnswers } from "../src/animation/problemAnimations";
// import { fermatsLittleTheorem, modExpo, sieveOfEratosthenes } from "../src/animation/graph";
import { euclideanGCD,sieveOfEratosthenes,fermatsLittleTheorem, modExpo } from "../src/animation/algoAnimation";
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

    if (pseudoExplain[cleanKey]) {
      const { explanation, pseudocode } = pseudoExplain[cleanKey];
      pseudoBox.textContent = `${explanation.trim()}\n\nPseudocode:\n${pseudocode.trim()}`;
    } else {
      pseudoBox.textContent = "Explanation and pseudocode not available.";
    }

    switch (algo.toLowerCase()) {
      case "dijkstra's algorithm":
        graph.reset(); graph.addDemoGraph(); await dijkstra(graph, "a"); break;
      case "bellman ford algorithm":
        graph.reset(); graph.addDemoGraph(); bellmanFord(graph, "a"); break;
      case "topological sort":
        graph.reset(); graph.addDemoGraph(); topoSort(graph); break;
      case "floyd-warshall algorithm":
        graph.reset(); graph.addDemoGraph(); floydWarshall(graph); break;
      case "kruskal's algorithm":
        graph.reset(); graph.addDemoGraph(); kruskal(graph); break;
      case "prim's algorithm":
        graph.reset(); graph.addDemoGraph(); prim(graph, "b"); break;
      case "kosaraju’s (scc)":
        graph.reset(); graph.addDemoGraph(); kosaraju(graph); break;
      case "tarjan’s algorithm":
        graph.reset(); graph.addDemoGraph(); tarjans(graph); break;
      case "floyd’s cycle detection":
        LLAnimate["detect and remove cycle"](); break;
      case "dutch national flag algorithm":
        problemAnswers["sort an array with 0s 1s and 2s"]([0, 1, 2, 0, 0, 1, 2, 0]); break;
      case "kadane’s algorithm":
        problemAnswers["maximum subarray sum"](); break;
      case "moore's algorithm":
        problemAnswers["majority element"](); break;
      case "euclidean algorithm (gcd)":
        euclideanGCD(20, 28); break;
      case "sieve of eratosthenes":
        sieveOfEratosthenes(20); break;
      case "modular exponentiantation":
        modExpo(10, 20, 0); break;
      case "fermart's theorem":
        fermatsLittleTheorem(5, 3); break;
      default:
        alert("Animation not defined yet.");
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 pt-8 pb-20 text-white" id="algorithmsHeading">
      {headings.map((heading) => (
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
      ))}
      <div id="visualize" className="mt-10 p-4 bg-gray-900 rounded-md">
        <pre id="pseudocodeText" className="whitespace-pre-wrap text-white font-mono text-sm"></pre>
      </div>
    </div>
  );
};

export default AlgoHome;
