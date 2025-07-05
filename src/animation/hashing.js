import { getContainer } from "../utils/visualHelpers";
import * as visualizers from "../utils/visualizeFunc";
import { hashKey } from "../utils/visualizeFunc";
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
// 2sum problem
export async function twoSum () {
  const container = getContainer();
  container.innerHTML = "";
  const nums = [2, 7, 11, 15]; // Example input array
  const target = 9;
  const bucketSize = 7;
  const hashmap = {}; // Simulate HashMap for visualization

  // Create input array display
  const arrayBoxes = nums.map((num, i) => {
    const box = createBox(num);
    box.id = `arr-${i}`;
    return box;
  });

  // Display array on top
  const arrayContainer = document.createElement("div");
  arrayContainer.className = "flex gap-2 mb-4 justify-center";
  arrayBoxes.forEach(box => arrayContainer.appendChild(box));
  container.appendChild(arrayContainer);

  // Create buckets for hashmap
  const buckets = Array.from({ length: bucketSize }, (_, i) => {
    const box = createBox("");
    box.id = `bucket-${i}`;
    return box;
  });

  const hashmapContainer = document.createElement("div");
  hashmapContainer.className = "flex gap-2 justify-center";
  buckets.forEach(bucket => hashmapContainer.appendChild(bucket));
  container.appendChild(hashmapContainer);

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;
    const compHash = hashKey(complement.toString(), bucketSize);

    // Highlight current array element
    arrayBoxes[i].classList.add("bg-yellow-200");
    const status = createStatus(container,`Looking for complement: ${complement}`);

    // Check if complement exists
    if (hashmap[complement] !== undefined) {
      visualizers.highlightBucket(compHash, `Found complement ${complement}`, complement.toString());
      await visualizers.sleep(1000);
      arrayBoxes[i].classList.add("bg-green-300");
      arrayBoxes[hashmap[complement]].classList.add("bg-green-300");
      status.innerText = `Pair found: ${nums[hashmap[complement]]} + ${num} = ${target}`;
      return;
    }

    await visualizers.sleep(1000);

    // Insert into hashmap
    const hash = visualizers.hashKey(num.toString(), bucketSize);
    visualizers.highlightBucket(hash, `Storing {${num}: ${i}}`, num.toString());
    buckets[hash].textContent = `${num}: ${i}`;
    buckets[hash].classList.add("bg-green-200");
    hashmap[num] = i;

    await visualizers.sleep(800);
    arrayBoxes[i].classList.remove("bg-yellow-200");
  }

createStatus(container,"No pair found");
}
