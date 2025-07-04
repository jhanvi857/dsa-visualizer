import { dijkstra,topoSort,bellmanFord,floydWarshall, kruskal, prim, kosaraju, tarjans } from "../src/animation/graph";
import { graph } from "../src/utils/structure";
import {LLAnimate} from "../src/animation/LLAnimation";
import {problemAnswers} from "../src/animation/problemAnimations";
import { euclideanGCD, fermatsLittleTheorem, modExpo, sieveOfEratosthenes } from "../src/animation/algoAnimation";
const headings = [
  "Number Theory & Math Algorithms",
  "Array algorithms & pointer techniqueues",
  "Graph Algorithms",
  // "String Algorithms"
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
    "Dijkstra's \nalgorithm",
    "Bellman ford algorithm",
    "Topological sort",
    "Floyd-Warshall algorithm",
    "Kruskal's algorithm",
    "Prim's algorithm",
    "Kosaraju’s (SCC)",
    "Tarjan’s Algorithm",
  ],
  // "String Algorithms" : [
  //   "KMP algorithm (pattern)",
  //   "Rabin-Karp algorithm",
  //   "Trie Insertion/Search",
  //   "Z algorithm (pattern)"
  // ]
};


function displayAlgoCards(headings, groupedAlgorithms) {
  const algoDiv = document.getElementById("algorithmsHeading");

  headings.forEach((headingText) => {
    // Create and append section heading
    const heading = document.createElement("h1");
    heading.className = "text-white text-4xl text-center mb-8 font-semibold";
    heading.innerText = headingText;
    algoDiv.appendChild(heading);

    // Grid wrapper for cards
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 pb-8 gap-y-8";

    // Create each card
    groupedAlgorithms[headingText].forEach((algo) => {
      const card = document.createElement("div");
      card.className =
        "bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg";

      const title = document.createElement("h1");
      title.className =
        "text-xl md:text-3xl font-semibold text-white text-center mb-4";
      title.innerText = algo;

      const buttonWrapper = document.createElement("div");
      buttonWrapper.className = "flex justify-center items-center h-16";

      const button = document.createElement("a");
      button.href = "#visualize";
      button.setAttribute("data-algo",algo.toLowerCase());
      button.className =
        "bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400";
      button.innerHTML = "Visualize &#8594;";

      buttonWrapper.appendChild(button);
      card.appendChild(title);
      card.appendChild(buttonWrapper);
      grid.appendChild(card);
    });

    // Append full grid after heading
    algoDiv.appendChild(grid);

    // Add a separator line
    const hr = document.createElement("hr");
    algoDiv.appendChild(hr);
  });
}
displayAlgoCards(headings, groupedAlgorithms);

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("a[data-algo]").forEach((btn)=>{
    btn.addEventListener("click",async (e) => {
      const algo = btn.getAttribute("data-algo");
      if(algo==="dijkstra's algorithm") {
        graph.addVertex("a");
        graph.addVertex("b");
        graph.addVertex("c");
        graph.addVertex("d");
        graph.addEdge("a","b",3);
        graph.addEdge("b","c",2);
        graph.addEdge("a","d",5);
        graph.addEdge("d","b",4);
        await dijkstra(graph,"a");
      } else if(algo==="topological sort") {
        graph.vertices = ["a", "b", "c", "d"];
          graph.edges=  [
          { from: "a", to: "b", weight: 1 },
          { from: "a", to: "c", weight: 1 },
          { from: "b", to: "d", weight: 1 },
          { from: "c", to: "d", weight: 1 },
        ],
        graph.adjList= {
          a: [{ node: "b", weight: 1 }, { node: "c", weight: 1 }],
          b: [{ node: "d", weight: 1 },{node:"c",weight:2}],
          c: [{ node: "d", weight: 1 }],
          d: [],
        },
        topoSort(graph);
      } else if(algo==="bellman ford algorithm") {
        graph.addVertex("a");
        graph.addVertex("b");
        graph.addVertex("c");
        graph.addVertex("d");
        graph.addEdge("a","b",3);
        graph.addEdge("b","c",2);
        graph.addEdge("a","d",5);
        graph.addEdge("d","b",4);
        bellmanFord(graph,"a");
      } else if(algo==="floyd-warshall algorithm") {
        graph.vertices = ["a", "b", "c", "d"];
          graph.edges=  [
          { from: "a", to: "b", weight: 1 },
          { from: "a", to: "c", weight: 1 },
          { from: "b", to: "d", weight: 1 },
          { from: "c", to: "d", weight: 1 },
        ],
        graph.adjList= {
          a: [{ node: "b", weight: 1 }, { node: "c", weight: 1 }],
          b: [{ node: "d", weight: 1 },{node:"c",weight:2}],
          c: [{ node: "d", weight: 1 }],
          d: [],
        }
        floydWarshall(graph);
      } else if(algo==="kruskal's algorithm") {
        graph.addVertex("a");
        graph.addVertex("b");
        graph.addVertex("c");
        graph.addVertex("d");
        graph.addEdge("a","b",3);
        graph.addEdge("b","c",2);
        graph.addEdge("a","d",5);
        graph.addEdge("d","b",4);
        kruskal(graph);
      } else if(algo==="prim's algorithm") {
        graph.addVertex("a");
        graph.addVertex("b");
        graph.addVertex("c");
        graph.addVertex("d");
        graph.addEdge("a","b",3);
        graph.addEdge("b","c",2);
        graph.addEdge("a","d",5);
        graph.addEdge("d","b",4);
        prim(graph,"b");
      } else if(algo==="kosaraju’s (scc)") {
        graph.addVertex("a");
        graph.addVertex("b");
        graph.addVertex("c");
        graph.addVertex("d");
        graph.addEdge("a","b",3);
        graph.addEdge("b","c",2);
        graph.addEdge("a","d",5);
        graph.addEdge("d","b",4);
        kosaraju(graph);
      } else if(algo==="tarjan’s algorithm") {
        graph.addVertex("a");
        graph.addVertex("b");
        graph.addVertex("c");
        graph.addVertex("d");
        graph.addEdge("a","b",3);
        graph.addEdge("b","c",2);
        graph.addEdge("a","d",5);
        graph.addEdge("d","b",4);
        tarjans(graph);
      } else if(algo==="floyd’s cycle detection") {
        LLAnimate["detect and remove cycle"]();
      } else if(algo==="dutch national flag algorithm") {
        problemAnswers["sort an array with 0s 1s and 2s"]([0,1,2,0,0,1,2,0]);
      } else if(algo==="kadane’s algorithm") {
        problemAnswers["maximum subarray sum"]();
      } else if(algo==="moore's algorithm") {
        problemAnswers["majority element"]();
      } else if(algo==="euclidean algorithm (gcd)") {
        euclideanGCD(20,28);
      } else if(algo==="sieve of eratosthenes") {
        sieveOfEratosthenes(20);
      } else if(algo==="modular exponentiantation") {
        modExpo(10,20,0);
      } else if(algo==="fermart's theorem") {
        fermatsLittleTheorem(5,3);
      }
    })
  })
})