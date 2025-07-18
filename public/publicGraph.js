import { drawEdgeArrow,highlightNode,highlightEdge ,sleep, renderGraph,updateWeightDisplay} from "../utils/structure";
import { createStatus, getContainer } from "../utils/visualHelpers";
export async function dijkstra(graph, start) {
  const container = getContainer();
  const dist = {};
  const visited = {};
  const pq = [];

  for (let v of graph.getVertices()) {
    dist[v] = Infinity;
  }
  dist[start] = 0;

  pq.push({ node: start, distance: 0 });

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance);
    const { node: current } = pq.shift();

    if (visited[current]) continue;
    visited[current] = true;

    await highlightNode(current, "yellow");
    await sleep(600);

    for (const { node: neighbor, weight } of graph.getNeighbors(current)) {
      if (!visited[neighbor] && dist[current] + weight < dist[neighbor]) {
        dist[neighbor] = dist[current] + weight;
        pq.push({ node: neighbor, distance: dist[neighbor] });

        drawEdgeArrow(current, neighbor, `(${weight})`, "#60a5fa");
      }
    }

    await highlightNode(current, "green");
  }

  createStatus(container,`Shortest distances:\n${JSON.stringify(dist,null,2)}`);
}
export async function topoSort(graph) {
  const container = getContainer();
    renderGraph(graph);
  const indegree = {};
  const result = [];
  const queue = [];

  // Step 1: Initialize indegrees
  for (const node of graph.getVertices()) {
    indegree[node] = 0;
  }

  // Step 2: Count actual indegrees
  for (const node of graph.getVertices()) {
    for (const neighbor of graph.getNeighbors(node)) {
      indegree[neighbor.node]++;
    }
  }

  // Step 3: Enqueue nodes with indegree 0
  for (const node in indegree) {
    if (indegree[node] === 0) queue.push(node);
  }

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);
    await highlightNode(current, "yellow");
    await sleep(500);

    for (const neighbor of graph.getNeighbors(current)) {
      indegree[neighbor.node]--;

      drawEdgeArrow(current, neighbor.node, `↓`, "#facc15"); // yellow edge

      await sleep(400); // delay to view edge change

      if (indegree[neighbor.node] === 0) {
        queue.push(neighbor.node);
      }
    }

    await highlightNode(current, "green");
  }

  createStatus(container,"Topological Order: " + result.join(" → "));
}
//  Bellman ford
export async function bellmanFord(graph, start) {
  const container = getContainer();
  const dist = {};
  graph.getVertices().forEach(v => dist[v] = Infinity);
  dist[start] = 0;

  const edges = graph.getAllEdges();
    console.log("all edeges =",edges);
    for (let i = 0; i < graph.getVertices().length - 1; i++) {
        for (const { from: u, to: v, weight: w } of edges) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                await highlightNode(v);
                drawEdgeArrow(u, v);
                updateWeightDisplay(v, dist[v]);
            }
        }
    }
    createStatus(container,`Shortest distances from ${start}: ${JSON.stringify(dist)}`);

}

// Floyd Warshall
export async function floydWarshall(graph) {
  const container = getContainer();
    renderGraph(graph)
  const V = graph.getVertices();
  const dist = {};

  for (let i of V) {
    dist[i] = {};
    for (let j of V) {
      dist[i][j] = i === j ? 0 : Infinity;
    }
  }

  for (const { from: u, to: v, weight: w } of graph.getAllEdges()) {
    dist[u][v] = w;
  }

  for (let k of V) {
    for (let i of V) {
      for (let j of V) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          await highlightNode(i);
          await highlightNode(j);
          highlightEdge(i, j);
        }
      }
    }
  }
  createStatus(container,`Shortest distance between all pairs of vertices : ${JSON.stringify(dist)}`);
}

// kruskal algorithm
export async function kruskal(graph) {
  const container = getContainer();
  const edges = graph.getAllEdges().sort((a, b) => a[2] - b[2]);
  const parent = {}, find = x => (parent[x] === x ? x : parent[x] = find(parent[x]));

  graph.getVertices().forEach(v => parent[v] = v);

  for (const { from: u, to: v, weight: w } of edges) {
    const pu = find(u), pv = find(v);
    if (pu !== pv) {
      parent[pu] = pv;
      highlightEdge(u, v);
      await highlightNode(u);
      await highlightNode(v);
    }
  }
}
// prim's algorithm
export async function prim(graph, start) {
  const container = getContainer();
  const parent = {};
  const key = {};
  const mstSet = {};

  for (let v of graph.getVertices()) {
    key[v] = Infinity;
    mstSet[v] = false;
    parent[v] = null;
  }

  key[start] = 0;

  for (let i = 0; i < graph.getVertices().length; i++) {
    const u = getMinKey(key, mstSet);
    if (!u) break;

    mstSet[u] = true;
    await highlightNode(u, "yellow");
    await sleep(600);

    for (let { node: v, weight } of graph.getNeighbors(u)) {
      if (!mstSet[v] && weight < key[v]) {
        key[v] = weight;
        parent[v] = u;
      }
    }

    await highlightNode(u, "green");
  }

  // Final MST edge drawing
  for (let v of graph.getVertices()) {
    const u = parent[v];
    if (u) {
      drawEdgeArrow(u, v, `(${key[v]})`, "#10b981"); // green MST edge
    }
  }

  createStatus(container,"MST (Prim’s): " + JSON.stringify(parent));
}


export async function kosaraju(graph) {
  const container = getContainer();
  const visited = new Set();
  const stack = [];
  const transpose = {};

  // Step 1: Standard DFS to fill the stack
  async function dfs1(node) {
    visited.add(node);
    for (let neighbor of graph.getNeighbors(node)) {
      if (!visited.has(neighbor.node)) {
        await dfs1(neighbor.node);
      }
    }
    stack.push(node);
  }

  for (let v of graph.getVertices()) {
    if (!visited.has(v)) await dfs1(v);
  }

  // Step 2: Build transpose graph
  for (let v of graph.getVertices()) transpose[v] = [];
  for (let { from, to } of graph.edges) {
    transpose[to].push(from); // Reverse the direction
  }

  // Step 3: DFS on transpose
  visited.clear();
  const components = [];

  async function dfs2(node, comp) {
    visited.add(node);
    comp.push(node);
    await highlightNode(node, "yellow");
    await sleep(600);
    for (let neighbor of transpose[node]) {
      if (!visited.has(neighbor)) {
        await dfs2(neighbor, comp);
      }
    }
    await highlightNode(node, "green");
  }

  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited.has(node)) {
      const comp = [];
      await dfs2(node, comp);
      components.push(comp);
    }
  }

  createStatus(container,`Strongly Connected Components: ${JSON.stringify(components)}`);
}

export async function tarjans(graph) {
  const container = getContainer();
  let index = 0;
  const indices = {};
  const lowlink = {};
  const onStack = {};
  const stack = [];
  const result = [];

  async function strongConnect(v) {
    indices[v] = index;
    lowlink[v] = index;
    index++;
    stack.push(v);
    onStack[v] = true;

    await highlightNode(v, "yellow");
    await sleep(600);

    for (let { node: neighbor } of graph.getNeighbors(v)) {
      if (!(neighbor in indices)) {
        await strongConnect(neighbor);
        lowlink[v] = Math.min(lowlink[v], lowlink[neighbor]);
      } else if (onStack[neighbor]) {
        lowlink[v] = Math.min(lowlink[v], indices[neighbor]);
      }
    }

    if (lowlink[v] === indices[v]) {
      const scc = [];
      let w;
      do {
        w = stack.pop();
        onStack[w] = false;
        scc.push(w);
        await highlightNode(w, "green");
      } while (w !== v);
      result.push(scc);
    }
  }

  for (let v of graph.getVertices()) {
    if (!(v in indices)) {
      await strongConnect(v);
    }
  }

  createStatus(container,`Strongly Connected Components: ${JSON.stringify(result)}`);
}

export function getMinKey(keys, mstSet) {
  let min = Infinity;
  let minNode = null;

  for (let node in keys) {
    if (!mstSet[node] && keys[node] < min) {
      min = keys[node];
      minNode = node;
    }
  }

  return minNode;
}

