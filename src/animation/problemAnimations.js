import {
  createBox,
  positionArrow,
  delay,
  twoPointerAnimation,
  positionArrow2D,
  createArrow,
  createStatus,
  createGrid,
  createTitle,
  resetContainer,
  createBoxList,
  getContainer,
  highlight
} from "../utils/visualHelpers";
import { visualOperations } from "../utils/visualizer";
export const problemAnswers = {
  "pair sum problem": async function (arr, target) {
    const container = getContainer();

    resetContainer("relative flex justify-center items-center", container);
    arr.sort((a, b) => a - b);
    const boxes = createBoxList(arr, container);
    const [siArrow, eiArrow] = twoPointerAnimation(container);

    let si = 0,
      ei = arr.length - 1;
    while (si < ei) {
      positionArrow(siArrow, boxes[si]);
      positionArrow(eiArrow, boxes[ei]);
      await delay(1000);

      const sum = arr[si] + arr[ei];
      if (sum === target) {
        boxes[si].classList.replace("bg-cyan-600", "bg-green-500");
        boxes[ei].classList.replace("bg-cyan-600", "bg-green-500");
        createStatus(
          container,
          `target sum found at array index ${si} and ${ei}`
        );
        return;
      }
      sum < target ? si++ : ei--;
    }

    siArrow.innerText = "✖ Not found!!";
    eiArrow.innerText = "✖ Not found!!";
  },
  "stock buy & sell": async function (prices) {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    const boxes = createBoxList(prices, container);
    let bestBuy = prices[0],
      maxProfit = 0;

    const arrow = createArrow("white", "↑");
    const status = createStatus(
      container,
      `bestBuy = ${bestBuy} | maxProfit = ${maxProfit}`
    );
    container.appendChild(arrow);

    for (let i = 1; i < prices.length; i++) {
      positionArrow(arrow, boxes[i], 5);
      boxes[i].classList.add("bg-yellow-400");
      await delay(1000);
      bestBuy = Math.min(bestBuy, prices[i]);
      if (prices[i] > bestBuy)
        maxProfit = Math.max(maxProfit, prices[i] - bestBuy);
      status.innerText = `bestBuy = ${bestBuy} | maxProfit = ${maxProfit}`;
      boxes[i].classList.remove("bg-yellow-400");
    }
    status.innerHTML += `<br><span class='text-green-400'>Done! Max profit = ${maxProfit}</span>`;
  },
  "container with most water": async function (height) {
    const container = getContainer();

    resetContainer("flex justify-center items-center");
    const boxes = createBoxList(height, container);
    let maxWater = 0;
    const status = createStatus(container, `Calculating max area...`);
    const [siArr, eiArr] = twoPointerAnimation(container);

    let si = 0,
      ei = height.length - 1;

    while (si < ei) {
      positionArrow(siArr, boxes[si], 10);
      positionArrow(eiArr, boxes[ei], 10);
      await delay(1500);

      let ht = Math.min(height[si], height[ei]);
      let wt = ei - si;
      const currWater = ht * wt;
      maxWater = Math.max(maxWater, currWater);
      status.innerText = `Current area = ${currWater}, Max area = ${maxWater}`;

      height[si] < height[ei] ? si++ : ei--;
    }
  },
  "product of array except itself": async function (nums) {
    const container = getContainer();

    resetContainer("flex flex-col items-center gap-6", container);

    const n = nums.length;
    const prefix = Array(n).fill(1);
    const suffix = Array(n).fill(1);
    const result = Array(n).fill(1);

    function createRow(title, values, idPrefix = "", color = "") {
      const wrapper = document.createElement("div");
      wrapper.className = "flex flex-col items-center";

      const label = document.createElement("div");
      label.className = "text-white font-semibold mb-1";
      label.innerText = title;

      const row = document.createElement("div");
      row.className = "flex gap-2";
      const boxes = values.map((val, i) => {
        const box = createBox(val);
        box.id = `${idPrefix}-${i}`;
        if (color) box.classList.add(color);
        row.appendChild(box);
        return box;
      });

      wrapper.appendChild(label);
      wrapper.appendChild(row);
      container.appendChild(wrapper);
      return boxes;
    }

    // Step 1: Input row
    const inputBoxes = createRow("Input Array", nums);
    await delay(1000);

    // Step 2: Prefix
    const prefixBoxes = createRow("Prefix Product", prefix, "prefix");
    for (let i = 1; i < n; i++) {
      prefix[i] = prefix[i - 1] * nums[i - 1];
      prefixBoxes[i].innerText = prefix[i];
      prefixBoxes[i].classList.add("bg-blue-600");
      await delay(600);
    }

    // Step 3: Suffix
    const suffixBoxes = createRow("Suffix Product", suffix, "suffix");
    for (let i = n - 2; i >= 0; i--) {
      suffix[i] = suffix[i + 1] * nums[i + 1];
      suffixBoxes[i].innerText = suffix[i];
      suffixBoxes[i].classList.add("bg-green-600");
      await delay(600);
    }

    // Step 4: Result
    const resultBoxes = createRow("Final Result", result, "result");
    for (let i = 0; i < n; i++) {
      result[i] = prefix[i] * suffix[i];
      resultBoxes[i].innerText = result[i];
      resultBoxes[i].classList.add("bg-purple-600");
      await delay(600);
    }

    const status = createStatus(container, "Product array built successfully.");
    status.classList.remove("absolute", "top-full");
  },
  "search in rotated sorted array": async function (arr, target) {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    const boxes = createBoxList(arr, container);
    const [siArr, eiArr] = twoPointerAnimation(container);
    const status = createStatus(container, "Starting search...");

    let si = 0,
      ei = arr.length - 1;

    while (si <= ei) {
      positionArrow(siArr, boxes[si], 10);
      positionArrow(eiArr, boxes[ei], 10);
      let mid = Math.floor(si + (ei - si) / 2);
      status.innerText = `si = ${si}, ei = ${ei}, mid = ${mid}`;
      boxes[mid].classList.replace("bg-cyan-600", "bg-yellow-400");
      await delay(1500);

      if (arr[mid] === target) {
        boxes[mid].classList.replace("bg-yellow-400", "bg-green-500");
        status.innerText = `Target ${target} found at index ${mid}`;
        return;
      }

      boxes[mid].classList.replace("bg-yellow-400", "bg-cyan-600");
      await delay(400);

      if (arr[si] <= arr[mid]) {
        target >= arr[si] && target < arr[mid]
          ? (ei = mid - 1)
          : (si = mid + 1);
      } else {
        target > arr[mid] && target <= arr[ei]
          ? (si = mid + 1)
          : (ei = mid - 1);
      }
    }

    status.innerText = `Target ${target} not found in the array.`;
  },
  "peak index in mountain array": async function (arr) {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    const boxes = createBoxList(arr, container);
    const [siArr, eiArr] = twoPointerAnimation(container);
    const status = createStatus(container, "Starting search...");

    let si = 1,
      ei = arr.length - 2;

    while (si <= ei) {
      positionArrow(siArr, boxes[si], 20);
      positionArrow(eiArr, boxes[ei], 20);
      await delay(600);

      let mid = Math.floor(si + (ei - si) / 2);
      status.innerText = `si = ${si}, ei = ${ei}, mid = ${mid}`;

      if (arr[mid] > arr[mid + 1] && arr[mid] > arr[mid - 1]) {
        boxes[mid].classList.replace("bg-yellow-400", "bg-green-500");
        status.innerText = `Peak at index ${mid}, value = ${arr[mid]}`;
        return;
      }

      boxes[mid].classList.replace("bg-yellow-400", "bg-cyan-600");
      await delay(800);
      arr[mid] < arr[mid + 1] ? (si = mid + 1) : (ei = mid - 1);
    }

    status.innerText = `No peak found.`;
  },
  "single element in sorted array": async function (arr) {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    const boxes = createBoxList(arr, container);
    const [siArr, eiArr] = twoPointerAnimation(container);
    const status = createStatus(container, "Starting search...");

    let si = 0,
      ei = arr.length - 1;

    while (si <= ei) {
      positionArrow(siArr, boxes[si], 10);
      positionArrow(eiArr, boxes[ei], 10);
      await delay(600);

      let mid = Math.floor((si + ei) / 2);
      status.innerText = `si = ${si}, ei = ${ei}, mid = ${mid}`;
      boxes[mid].classList.replace("bg-cyan-600", "bg-yellow-400");

      if (
        (mid === 0 && arr[mid] !== arr[mid + 1]) ||
        (mid === ei && arr[mid] !== arr[mid - 1]) ||
        (arr[mid] !== arr[mid - 1] && arr[mid] !== arr[mid + 1])
      ) {
        boxes[mid].classList.replace("bg-yellow-400", "bg-green-500");
        status.innerText = `Single element: ${arr[mid]} at index ${mid}`;
        return;
      }

      boxes[mid].classList.replace("bg-yellow-400", "bg-cyan-600");
      await delay(400);

      if (mid % 2 === 0) {
        arr[mid] === arr[mid + 1] ? (si = mid + 1) : (ei = mid - 1);
      } else {
        arr[mid] === arr[mid - 1] ? (si = mid + 1) : (ei = mid - 1);
      }
    }

    status.innerText = `No single element found.`;
  },
  "book allocation problem": async function (books, students) {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    const totalPages = books.reduce((a, b) => a + b, 0);
    let low = Math.max(...books),
      high = totalPages,
      result = -1;

    const bookBoxes = createBoxList(books, container);
    const status = createTitle(
      `Books = ${books.join(", ")}, Students = ${students}`,container
    );

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      status.innerText = `Trying max pages per student = ${mid}`;
      await delay(800);

      if (await isPossible(books, students, mid, bookBoxes)) {
        result = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }

      await delay(600);
      bookBoxes.forEach((box) =>
        box.classList.remove("bg-yellow-400", "bg-green-500")
      );
    }

    status.innerText = `Minimum max pages: ${result}`;
  },
  "sort an array with 0s 1s and 2s": async function (arr) {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    const boxes = createBoxList(arr, container);
    const [lowArr, highArr, midArr] = ["red-500", "blue-500", "yellow-400"].map(
      (c) => createArrow(c)
    );

    [lowArr, midArr, highArr].forEach((arrow) => container.appendChild(arrow));
    const status = createStatus(container, "Starting sort...");

    let low = 0,
      mid = 0,
      high = arr.length - 1;

    while (mid <= high) {
      positionArrow(lowArr, boxes[low], 10);
      positionArrow(midArr, boxes[mid], 10);
      positionArrow(highArr, boxes[high], 10);
      await delay(1000);

      if (arr[mid] === 0) {
        [arr[low], arr[mid]] = [arr[mid], arr[low]];
        boxes[low].innerText = arr[low];
        boxes[mid].innerText = arr[mid];
        mid++;
        low++;
      } else if (arr[mid] === 1) {
        mid++;
      } else {
        [arr[mid], arr[high]] = [arr[high], arr[mid]];
        boxes[mid].innerText = arr[mid];
        boxes[high].innerText = arr[high];
        high--;
      }

      await delay(800);
    }

    status.innerText = "Array sorted successfully!";
  },
  "merge two sorted arrays": async function (arr1, arr2) {
    const container = getContainer();

    resetContainer("flex flex-wrap justify-center items-center", container);
    createTitle("Array 1",container);
    const boxes1 = createBoxList(arr1,container);

    createTitle("Array 2",container);
    const boxes2 = createBoxList(arr2,container);

    createTitle("Merged Result",container);
    const resultContainer = document.createElement("div");
    resultContainer.className = "flex flex-wrap";
    container.appendChild(resultContainer);

    const status = createStatus(container);
    let i = 0,
      j = 0,
      merged = [];

    while (i < arr1.length && j < arr2.length) {
      boxes1[i]?.classList.add("bg-yellow-400");
      boxes2[j]?.classList.add("bg-yellow-400");
      await delay(1000);

      if (arr1[i] <= arr2[j]) {
        merged.push(arr1[i]);
        const box = createBox(arr1[i]);
        box.classList.replace("bg-cyan-600", "bg-green-500");
        resultContainer.appendChild(box);
        status.innerText = `Picked ${arr1[i]} from Array 1`;
        boxes1[i++].classList.remove("bg-yellow-400");
      } else {
        merged.push(arr2[j]);
        const box = createBox(arr2[j]);
        box.classList.replace("bg-cyan-600", "bg-green-500");
        resultContainer.appendChild(box);
        status.innerText = `Picked ${arr2[j]} from Array 2`;
        boxes2[j++].classList.remove("bg-yellow-400");
      }

      await delay(500);
    }

    while (i < arr1.length) {
      await delay(500);
      const box = createBox(arr1[i]);
      box.classList.replace("bg-cyan-600", "bg-green-500");
      resultContainer.appendChild(box);
      status.innerText = `Remaining element ${arr1[i]} from Array 1`;
      i++;
    }

    while (j < arr2.length) {
      await delay(500);
      const box = createBox(arr2[j]);
      box.classList.replace("bg-cyan-600", "bg-green-500");
      resultContainer.appendChild(box);
      status.innerText = `Remaining element ${arr2[j]} from Array 2`;
      j++;
    }

    await delay(1000);
    status.innerText = `Merged array: [${merged.join(", ")}]`;
  },
  "search in a 2d matrix": async function (matrix, target) {
    const container = getContainer();

    resetContainer("flex flex-col items-center gap-4", container);
    const status = createStatus(
      container,
      "Starting binary search on matrix..."
    );
    const { cols, boxes } = createGrid(matrix,container);

    const [startArrow, endArrow] = twoPointerAnimation(container);
    startArrow.innerHTML = "→";
    endArrow.innerHTML = "←";
    container.appendChild(startArrow);
    container.appendChild(endArrow);

    let si = 0,
      ei = boxes.length - 1;

    while (si <= ei) {
      const mid = Math.floor((si + ei) / 2);
      const row = Math.floor(mid / cols);
      const col = mid % cols;

      positionArrow2D(startArrow, boxes[si], 10);
      positionArrow2D(endArrow, boxes[ei], 10);

      status.innerText = `si = ${si}, ei = ${ei}, mid = ${mid}, value = ${boxes[mid].innerText}`;
      boxes[mid].classList.replace("bg-cyan-600", "bg-yellow-400");
      await delay(1000);

      if (parseInt(boxes[mid].innerText) === target) {
        boxes[mid].classList.replace("bg-yellow-400", "bg-green-500");
        status.innerText = `Target ${target} found at index (${row}, ${col})`;
        return;
      }

      boxes[mid].classList.replace("bg-yellow-400", "bg-cyan-600");
      target > parseInt(boxes[mid].innerText) ? (si = mid + 1) : (ei = mid - 1);
      await delay(500);
    }

    status.innerText = `Target ${target} not found in the matrix.`;
  },
  "maximum subarray sum": async function () {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    // let arr = [-2,1,-3,4,-1,2,1,-5,4];
    let arr = [5, 4, -1, 7, 8];
    arr.map((value, index) => {
      visualOperations.array.insert(index, value);
    });
    let n = arr.length;
    let maxSum = -Infinity;
    let currSum = 0;
    const status = createStatus(
      container,
      `maxsum = -infinity | current sum = 0`
    );
    for (let i = 0; i < n; i++) {
      currSum += arr[i];

      maxSum = Math.max(currSum, maxSum);
      status.innerText = `current sum = ${currSum} | maximum sum = ${maxSum}`;
      await delay(800);
      if (currSum < 0) {
        status.innerText = `current sum is less than zero therefore reset it to 0`;
        currSum = 0;
      }
    }
  },
  "majority element": async function () {
    const container = getContainer();

    resetContainer("flex justify-center items-center", container);
    let arr = [1, 1, 1, 1, 2, 2, 3];
    let n = arr.length;
    let freq = 0,
      ans = 0;
    let boxes = createBoxList(arr, container);
    const arrow = createArrow("white", "↑");
    const status = createStatus(container, `ans = 0`);
    for (let i = 0; i < n; i++) {
      positionArrow(arrow, boxes[i], 5);
      if (freq == 0) {
        ans = arr[i];
        await delay(800);
      }
      if (ans == arr[i]) {
        status.innerText = `ans = ${ans} | freqency of current element ${arr[i]} = ${freq}`;
        await delay(800);
        freq++;
      } else {
        status.innerText = `ans = ${ans} | freqency of current element ${arr[i]} = ${freq}`;
        await delay(800);
        freq--;
      }
    }
    status.innerText = `Majority element in array = ${ans}`;
  },
  "next permutation": async function (arr) {
    const container = getContainer();

    resetContainer("flex justify-center items-center");
    const boxes = createBoxList(arr, container);
    await delay(800);

    // Step 1: Find i
    let i = arr.length - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) i--;

    if (i >= 0) {
      boxes[i].classList.add("bg-yellow-400");
      await delay(800);

      // Step 2: Find j
      let j = arr.length - 1;
      while (arr[j] <= arr[i]) j--;
      boxes[j].classList.add("bg-green-400");
      await delay(800);

      // Step 3: Swap
      [arr[i], arr[j]] = [arr[j], arr[i]];
      boxes[i].innerText = arr[i];
      boxes[j].innerText = arr[j];
      await delay(800);
    }

    // Step 4: Reverse from i + 1 to end
    let left = i + 1,
      right = arr.length - 1;
    while (left < right) {
      boxes[left].classList.add("bg-red-400");
      boxes[right].classList.add("bg-red-400");
      await delay(600);

      [arr[left], arr[right]] = [arr[right], arr[left]];
      boxes[left].innerText = arr[left];
      boxes[right].innerText = arr[right];
      await delay(600);

      boxes[left].classList.remove("bg-red-400");
      boxes[right].classList.remove("bg-red-400");

      left++;
      right--;
    }

    createStatus(container, "Next permutation generated.");
  },
  "next greater element": async function nextGreaterElement(arr) {
  const container = getContainer();
  resetContainer("flex items-end justify-center gap-4", container);

  const boxes = createBoxList(arr, container);
  const n = arr.length;
  const stack = [];
  const res = Array(n).fill(-1);

  const status = createStatus(container, "Finding next greater elements...");

  for (let i = 0; i < n; i++) {
    const currBox = boxes[i];
    await delay(600);
    await highlight(currBox, "bg-yellow-500");

    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const idx = stack.pop();
      res[idx] = arr[i];

      const fromBox = boxes[idx];
      const toBox = boxes[i];

      const arrow = createArrow("green-400", "→");
      arrow.style.position = "absolute";
      arrow.style.top = `${fromBox.offsetTop - 30}px`;
      arrow.style.left = `${(fromBox.offsetLeft + toBox.offsetLeft) / 2}px`;
      arrow.style.transform = "translate(-50%, -50%)";
      container.appendChild(arrow);

      await highlight(fromBox, "bg-green-500");
      await delay(500);
    }

    stack.push(i);
  }

  // Final pass for remaining elements with no NGE
  while (stack.length > 0) {
    const idx = stack.pop();
    await highlight(boxes[idx], "bg-red-500");
    await delay(300);
  }

  status.innerText = `Next Greater Array: [${res.join(", ")}]`;
}

};

// isPossible function
async function isPossible(books, students, maxPages, boxes) {
  let currSum = 0,
    count = 1;
  for (let i = 0; i < books.length; i++) {
    boxes[i].classList.add("bg-yellow-400");
    await delay(300);

    if (books[i] > maxPages) return false;

    if (currSum + books[i] > maxPages) {
      count++;
      currSum = books[i];
    } else {
      currSum += books[i];
    }

    boxes[i].classList.add("bg-green-500");
    await delay(300);
  }

  return count <= students;
}
