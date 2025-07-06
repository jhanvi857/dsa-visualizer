import React from 'react';
import {createBox,createStatus,createGrid,createTitle, createBoxList, resetContainer, delay, getContainer,highlight} from "../utils/visualHelpers";
export async function euclideanGCD(a, b) {
  const container = getContainer();
  resetContainer("flex flex-col items-center",container);
  const status = createStatus(container);

  while (b !== 0) {
    container.appendChild(createBox(`a = ${a}`));
    await delay(400);
    container.appendChild(createBox(`b = ${b}`));
    await delay(400);
    status.innerText = `Calculating: a = ${a}, b = ${b}, a % b = ${a % b}`;
    await delay(1000);

    const temp = b;
    b = a % b;
    a = temp;

    resetContainer("flex flex-col items-center");
    createStatus(container,`Updated a = ${a}, b = ${b}`);
    await delay(700);
  }

  createStatus(container,`✅ GCD is ${a}`);
}

export async function sieveOfEratosthenes(n) {
  const container = getContainer();
  resetContainer("flex flex-wrap justify-center");
  const status = createStatus(container,"Building Sieve...");

  const isPrime = Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  const boxes = createBoxList(Array.from({ length: n + 1 }, (_, i) => i),container);

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      boxes[i].classList.replace("bg-cyan-600", "bg-green-500");
      status.innerText = `Marking multiples of ${i}`;
      await delay(900);

      for (let j = i * i; j <= n; j += i) {
        if (isPrime[j]) {
          isPrime[j] = false;
          boxes[j].classList.replace("bg-cyan-600", "bg-red-500");
          await delay(900);
        }
      }
    }
  }

  status.innerText = `✅ Primes marked green`;
}
export async function modExpo(a, b, mod) {
  const container = getContainer();
  resetContainer("flex items-center");
  const status = createStatus(container,"Running Modular Exponentiation...");
  await delay(500);

  let result = 1;
  a = a % mod;

  while (b > 0) {
    const step = `a=${a}, b=${b}, res=${result}`;
    // status.innerText = step;
    const stepBox = createBox(step);
    container.appendChild(stepBox);
    await delay(800);

    if (b % 2 === 1) {
      result = (result * a) % mod;
      const res = createBox(`b odd → res = ${result}`);
      container.appendChild(res);
      await delay(800);
    }

    a = (a * a) % mod;
    b = Math.floor(b / 2);
  }

  status.innerText = `✅ Final Result: ${result}`;
}
export async function fermatsLittleTheorem(a, p) {
  const container = getContainer();
  resetContainer("flex justify-center items-center");
  const status = createStatus(container,`Checking ${a}^(p-1) mod ${p}`);
  await delay(800);

  let result = 1;
  let base = a % p;
  let exp = p - 1;

  while (exp > 0) {
    const step = `base=${base}, exp=${exp}, res=${result}`;
    const stepBox = createBox(step);
    container.appendChild(stepBox);
    await delay(800);

    if (exp % 2 === 1) {
      result = (result * base) % p;
      container.appendChild(createBox(`exp odd → res = ${result}`));
      await delay(800);
    }

    base = (base * base) % p;
    exp = Math.floor(exp / 2);
  }

  status.innerText = `Result: ${a}^${p - 1} % ${p} = ${result}`;
  await delay(500);
  if (result === 1) {
    status.innerText = "✅ Fermat’s Theorem holds true";
  } else {
    status.innerText = "❌ Fermat’s Theorem violated";
  }
}
// dp..
export async function longestCommonSubsequence(str1, str2) {
  const container = getContainer();
  resetContainer("flex flex-col items-center",container);
  const m = str1.length, n = str2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  const matrix = dp.map(row => row.slice());
  const flatBoxes = [];

  createTitle("DP Matrix (LCS)",container);

  createGrid(matrix,container, flatBoxes);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        await delay(600);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        await delay(600);
      }

      const idx = i * (n + 1) + j;
      flatBoxes[idx].innerText = dp[i][j];
      flatBoxes[idx].classList.add("bg-cyan-600");
      await delay(800);
    }
  }

  const status = createStatus(container,`LCS length: ${dp[m][n]}`);
  status.classList.remove("absolute","top-full");
}
export async function coinChange(coins, amount) {
  const container = getContainer();
  resetContainer("flex flex-col items-center",container);
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  const matrix = [dp];
  const flatBoxes = [];

  createTitle("DP Array (Coin Change)",container);
  createGrid(matrix,container, flatBoxes);

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }

    flatBoxes[i].innerText = dp[i] === Infinity ? "∞" : dp[i];
    flatBoxes[i].classList.add("bg-yellow-500");
    await delay(600);
  }

  createStatus(container,
    dp[amount] === Infinity
      ? "No combination possible."
      : `Min coins: ${dp[amount]}`
  );
}
export async function toggleBitAnimation(num, k) {
  const container = getContainer();
  container.innerHTML = "";

  const bin = num.toString(2).padStart(8, "0").split("");

  bin.forEach((bit, idx) => {
    const box = createBox(bit);
    if (idx === 8 - k) box.classList.add("bg-yellow-400");
    container.appendChild(box);
  });

  await delay(1000);

  bin[8 - k] = bin[8 - k] === "1" ? "0" : "1";

  container.innerHTML = "";
  bin.forEach((bit) => container.appendChild(createBox(bit)));
}
export async function slidingWindowSum(arr, k) {
  const container = document.getElementById("visualize");
  resetContainer("flex gap-4 items-end justify-center");
  container.innerHTML = "";

  const n = arr.length;
  const boxes = arr.map((val) => {
    const box = createBox(val);
    container.appendChild(box);
    return box;
  });

  const status = createStatus(container, "Initializing first window...");
  let sum = 0;
  let maxSum = 0;

  // Initial window setup
  for (let i = 0; i < k; i++) {
    boxes[i].classList.add("bg-yellow-400");
    sum += arr[i];
    status.innerText = `Adding arr[${i}] = ${arr[i]} to window, sum = ${sum}`;
    await delay(1200);
  }

  maxSum = sum;
  status.innerText = `Initial window sum = ${sum}`;
  await delay(1000);

  // Slide the window
  for (let i = k; i < n; i++) {
    const removeIdx = i - k;

    // Remove leftmost
    boxes[removeIdx].classList.remove("bg-yellow-400");
    boxes[removeIdx].classList.add("bg-red-400");
    sum -= arr[removeIdx];
    status.innerText = `Removed arr[${removeIdx}] = ${arr[removeIdx]}, sum = ${sum}`;
    await delay(600);

    // Add rightmost
    boxes[i].classList.add("bg-yellow-400");
    sum += arr[i];
    status.innerText = `Added arr[${i}] = ${arr[i]}, new sum = ${sum}`;
    await delay(800);

    maxSum = Math.max(maxSum, sum);

    const sumBox = createBox(`Window Sum: ${sum}`);
    sumBox.classList.add("w-28", "bg-blue-500", "text-xs");
    container.appendChild(sumBox);
    await delay(600);
  }

  // Final Result
  status.innerText = `Maximum Sum of any window = ${maxSum}`;
  const resultBox = createBox(`Max Sum: ${maxSum}`);
  resultBox.classList.add("w-32", "bg-green-500", "text-sm", "mt-4");
  container.appendChild(resultBox);
}


export async function prefixDiffCombined(n = 5, updates = [[1, 3, 2], [2, 4, 3]]) {
  const container = document.getElementById("visualize");
  resetContainer("flex flex-col items-center gap-6");
  container.innerHTML = "";

  const diff = new Array(n + 1).fill(0);

  // Step 1: Show updates
  const updateLog = createBox(`Applying updates: ${JSON.stringify(updates)}`);
  updateLog.classList.add("bg-yellow-200", "text-black");
  container.appendChild(updateLog);
  await delay(1000);

  // Step 2: Apply to difference array
  updates.forEach(([l, r, val]) => {
    diff[l] += val;
    if (r + 1 < diff.length) diff[r + 1] -= val;
  });

  // Step 3: Show diff array
  const diffRow = document.createElement("div");
  diffRow.className = "flex gap-2";
  diff.forEach((val) => {
    const box = createBox(val);
    box.classList.add("bg-purple-500");
    diffRow.appendChild(box);
  });
  container.appendChild(diffRow);
  await delay(1000);

  // Step 4: Apply prefix sum to get final array
  const finalRow = document.createElement("div");
  finalRow.className = "flex gap-2";
  let finalArr = new Array(n);
  finalArr[0] = diff[0];

  const box0 = createBox(finalArr[0]);
  box0.classList.add("bg-green-500");
  finalRow.appendChild(box0);
  await delay(500);

  for (let i = 1; i < n; i++) {
    finalArr[i] = finalArr[i - 1] + diff[i];
    const box = createBox(finalArr[i]);
    box.classList.add("bg-green-500");
    finalRow.appendChild(box);
    await delay(500);
  }

  container.appendChild(finalRow);
}

export async function climbingStairsDP(n) {
  const container = document.getElementById("visualize");
  resetContainer("flex justify-center items-end gap-2");
  container.innerHTML = "";

  const dp = new Array(n + 1).fill(0);
  const boxes = [];

  // Create visual DP boxes
  for (let i = 0; i <= n; i++) {
    const box = createBox(0);
    boxes.push(box);
    container.appendChild(box);
  }

  // Base cases
  dp[0] = 1;
  dp[1] = 1;
  boxes[0].innerText = "1";
  boxes[1].innerText = "1";

  // ✅ Create one shared status element under the whole container (or any single box)
  const status = createStatus(container, "Base Case: dp[0] = 1, dp[1] = 1");

  await highlight(boxes[0], "bg-green-500");
  await highlight(boxes[1], "bg-green-500");
  await delay(1000);

  for (let i = 2; i <= n; i++) {
    await highlight(boxes[i - 1], "bg-yellow-400");
    status.innerText = `Checking: dp[${i - 1}] = ${dp[i - 1]}`;
    await delay(800);

    await highlight(boxes[i - 2], "bg-yellow-400");
    status.innerText = `Checking: dp[${i - 2}] = ${dp[i - 2]}`;
    await delay(800);

    dp[i] = dp[i - 1] + dp[i - 2];
    boxes[i].innerText = dp[i];

    status.innerText = `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`;
    await highlight(boxes[i], "bg-green-500");

    await delay(1000);
  }

  status.innerText = `Result: ${dp[n]} ways to climb ${n} stairs`;
}

