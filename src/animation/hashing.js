import { getContainer } from "../utils/visualHelpers";
import { resetContainer,delay,createBox,createStatus } from "../utils/visualHelpers";
export async function animateLRUCache(operations, capacity) {
    const container = getContainer();
  resetContainer("flex flex-col items-start gap-4",container);
  
  const title = document.createElement("div");
  title.innerText = `LRU Cache (Capacity = ${capacity})`;
  title.className = "text-white font-bold mb-2";
  container.appendChild(title);

  const cacheRow = document.createElement("div");
  cacheRow.className = "flex gap-2";
  container.appendChild(cacheRow);

  const cacheMap = new Map();

  for (const [op, ...args] of operations) {
    await delay(800);
    
    const status = document.createElement("div");
    status.className = "text-white mb-1 font-semibold";
    container.appendChild(status);

    if (op === "put") {
      const [key, value] = args;
      status.innerText = `Put(${key}, ${value})`;

      if (cacheMap.has(key)) {
        cacheMap.delete(key); // remove from position
      } else if (cacheMap.size >= capacity) {
        const lruKey = cacheMap.keys().next().value;
        cacheMap.delete(lruKey);
        const lruBox = document.getElementById(`lru-${lruKey}`);
        if (lruBox) {
          lruBox.classList.add("bg-red-600");
          await delay(500);
          lruBox.remove();
        }
      }

      cacheMap.set(key, value);

      renderLRU(cacheMap, cacheRow);
    }

    if (op === "get") {
      const [key] = args;
      if (cacheMap.has(key)) {
        status.innerText = `Get(${key}) → ${cacheMap.get(key)}`;
        const val = cacheMap.get(key);
        cacheMap.delete(key);
        cacheMap.set(key, val); // move to end (most recently used)
      } else {
        status.innerText = `Get(${key}) → -1`;
      }

      renderLRU(cacheMap, cacheRow, key);
    }
  }

  const status = createStatus(container,"LRU Cache operations complete.");
  status.classList.add("relative");
}

function renderLRU(cacheMap, row, highlightKey = null) {
  row.innerHTML = "";
  for (const [key, value] of cacheMap) {
    const box = createBox(`${key}:${value}`);
    box.id = `lru-${key}`;
    if (highlightKey === key) {
      box.classList.add("bg-yellow-500");
    } else {
      box.classList.add("bg-green-600");
    }
    row.appendChild(box);
  }
}
