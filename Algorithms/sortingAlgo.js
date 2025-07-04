import {createBox, getContainer} from "../src/utils/visualHelpers"
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function bubbleSort(arr) {
    let n = arr.length;
    const container = getContainer();
    arr.forEach((element,index) => {
        // container.innerHTML = "";
        const box = document.createElement("div");
        box.className =
        "w-16 h-16 bg-cyan-600 mr-2 text-white font-bold flex items-center justify-center rounded-md shadow-md transform transition-transform duration-300";
        box.innerText = element;
        box.id = `box-${index}`; 
        container.appendChild(box);
    });
    for(let i=0;i<n;i++) {
        for(let j=0;j<n-i-1;j++) {
            const box1 = document.getElementById(`box-${j}`);
            const box2 = document.getElementById(`box-${j+1}`);
            box1.classList.replace("bg-cyan-600", "bg-yellow-500");
            box2.classList.replace("bg-cyan-600", "bg-yellow-500");
            await delay(800);

            const val1 = parseInt(box1.innerText);
            const val2 = parseInt(box2.innerText);

            if (val1 > val2) {
                // Swap values visually
                box1.innerText = val2;
                box2.innerText = val1;
            }
            box1.classList.replace("bg-yellow-500", "bg-cyan-600");
            box2.classList.replace("bg-yellow-500", "bg-cyan-600");
            await delay(600);
        }
    }
}
let arr = [2,7,13,11];
export async function selectionSort(arr) {
  const container = getContainer();
    let n = arr.length;
    container.innerHTML = "";

    arr.forEach((element, index) => {
        const box = document.createElement("div");
        box.className =
            "w-16 h-16 bg-cyan-600 mr-2 text-white font-bold flex items-center justify-center rounded-md shadow-md transform transition-transform duration-300";
        box.innerText = element;
        box.id = `box-${index}`;
        container.appendChild(box);
    });

    for (let i = 0; i < n; i++) {
        let smallest = i;
        const currBox = document.getElementById(`box-${i}`);
        currBox.classList.replace("bg-cyan-600", "bg-yellow-500");
        await delay(800);

        for (let j = i + 1; j < n; j++) {
            const boxJ = document.getElementById(`box-${j}`);
            boxJ.classList.replace("bg-cyan-600", "bg-pink-500");
            await delay(800);

            if (arr[smallest] > arr[j]) {
                // Optional: highlight new smallest
                smallest = j;
            }

            boxJ.classList.replace("bg-pink-500", "bg-cyan-600");
        }

        if (smallest !== i) {
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];

            const box1 = document.getElementById(`box-${i}`);
            const box2 = document.getElementById(`box-${smallest}`);

            // Swap visual values
            [box1.innerText, box2.innerText] = [box2.innerText, box1.innerText];
            await delay(800);
        }

        currBox.classList.replace("bg-yellow-500", "bg-cyan-600");
    }
}
export async function insertionSort(arr) {
  const container = getContainer();
  const n = arr.length;
  container.innerHTML = "";

  arr.forEach((element, index) => {
    const box = document.createElement("div");
    box.className =
      "w-16 h-16 bg-cyan-600 mr-2 text-white font-bold flex items-center justify-center rounded-md shadow-md transform transition-transform duration-300";
    box.innerText = element;
    box.id = `box-${index}`;
    container.appendChild(box);
  });

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    const keyBox = document.getElementById(`box-${i}`);
    keyBox.classList.replace("bg-cyan-600", "bg-yellow-500");
    await delay(800);

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];

      const box1 = document.getElementById(`box-${j + 1}`);
      const box2 = document.getElementById(`box-${j}`);
      box1.innerText = box2.innerText;

      box1.classList.replace("bg-cyan-600", "bg-pink-500");
      await delay(800);
      box1.classList.replace("bg-pink-500", "bg-cyan-600");

      j--;
    }

    arr[j + 1] = key;
    const insertBox = document.getElementById(`box-${j + 1}`);
    insertBox.innerText = key;
    insertBox.classList.replace("bg-cyan-600", "bg-green-500");
    await delay(800);
    insertBox.classList.replace("bg-green-500", "bg-cyan-600");

    keyBox.classList.replace("bg-yellow-500", "bg-cyan-600");
  }
}
export async function mergeSort(arr, left = 0, right = arr.length - 1) {
  const container = getContainer();
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSort(arr, left, mid);
  await mergeSort(arr, mid + 1, right);
  await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0,
    j = 0,
    k = left;

  while (i < leftArr.length && j < rightArr.length) {
    const boxK = document.getElementById(`box-${k}`);
    if (boxK) {
      boxK.classList.replace("bg-cyan-600", "bg-yellow-500");
      await delay(900);
    }

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      if (boxK) boxK.innerText = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      if (boxK) boxK.innerText = rightArr[j];
      j++;
    }

    if (boxK) {
      boxK.classList.replace("bg-yellow-500", "bg-cyan-600");
      await delay(900);
    }

    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    const boxK = document.getElementById(`box-${k}`);
    if (boxK) {
      boxK.innerText = leftArr[i];
      boxK.classList.replace("bg-cyan-600", "bg-green-500");
      await delay(900);
      boxK.classList.replace("bg-green-500", "bg-cyan-600");
    }
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    const boxK = document.getElementById(`box-${k}`);
    if (boxK) {
      boxK.innerText = rightArr[j];
      boxK.classList.replace("bg-cyan-600", "bg-green-500");
      await delay(900);
      boxK.classList.replace("bg-green-500", "bg-cyan-600");
    }
    j++;
    k++;
  }
}
export function createBoxes(arr) {
  const container = getContainer();
  container.innerHTML = "";
  arr.forEach((element, index) => {
    const box = document.createElement("div");
    box.className =
      "w-16 h-16 bg-cyan-600 mr-2 text-white font-bold flex items-center justify-center rounded-md shadow-md transform transition-transform duration-300";
    box.innerText = element;
    box.id = `box-${index}`;
    container.appendChild(box);
  });
}

export async function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  const pivotBox = document.getElementById(`box-${high}`);
  pivotBox.classList.replace("bg-cyan-600", "bg-yellow-500");
  await delay(900);

  let i = low - 1;
  for (let j = low; j < high; j++) {
    const boxJ = document.getElementById(`box-${j}`);
    boxJ.classList.replace("bg-cyan-600", "bg-pink-500");
    await delay(900);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];

      const boxI = document.getElementById(`box-${i}`);
      const boxJ2 = document.getElementById(`box-${j}`);
      [boxI.innerText, boxJ2.innerText] = [boxJ2.innerText, boxI.innerText];
    }

    boxJ.classList.replace("bg-pink-500", "bg-cyan-600");
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  const boxI1 = document.getElementById(`box-${i + 1}`);
  const boxHigh = document.getElementById(`box-${high}`);
  [boxI1.innerText, boxHigh.innerText] = [boxHigh.innerText, boxI1.innerText];
  await delay(900);

  pivotBox.classList.replace("bg-yellow-500", "bg-cyan-600");
  return i + 1;
}
export async function heapSort(arr) {
  const n = arr.length;
  const container = document.getElementById("visualize");
  container.innerHTML = "";

  arr.forEach((element, index) => {
    const box = document.createElement("div");
    box.className =
      "w-16 h-16 bg-cyan-600 mr-2 text-white font-bold flex items-center justify-center rounded-md shadow-md transform transition-transform duration-300";
    box.innerText = element;
    box.id = `box-${index}`;
    container.appendChild(box);
  });

  async function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      const box1 = document.getElementById(`box-${i}`);
      const box2 = document.getElementById(`box-${largest}`);
      [box1.innerText, box2.innerText] = [box2.innerText, box1.innerText];

      box1.classList.replace("bg-cyan-600", "bg-yellow-500");
      box2.classList.replace("bg-cyan-600", "bg-yellow-500");
      await delay(900);
      box1.classList.replace("bg-yellow-500", "bg-cyan-600");
      box2.classList.replace("bg-yellow-500", "bg-cyan-600");

      await heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    const box1 = document.getElementById(`box-0`);
    const box2 = document.getElementById(`box-${i}`);
    [box1.innerText, box2.innerText] = [box2.innerText, box1.innerText];

    box1.classList.replace("bg-cyan-600", "bg-pink-500");
    box2.classList.replace("bg-cyan-600", "bg-pink-500");
    await delay(900);
    box1.classList.replace("bg-pink-500", "bg-cyan-600");
    box2.classList.replace("bg-pink-500", "bg-cyan-600");

    await heapify(i, 0);
  }
}
// document.getElementById("bubble-sort").addEventListener("click",()=> bubbleSort([2,7,13,11,4,8]));
// document.getElementById("selection-sort").addEventListener("click",()=> selectionSort([2,7,13,11,4,8]));
// document.getElementById("insertion-sort").addEventListener("click",()=> insertionSort([2,7,13,11,4,8]));
// document.getElementById("merge-sort").addEventListener("click",()=> {
//     let arr = [2,7,13,11,4,8];
//     createBoxes(arr);
//     mergeSort(arr);
// });
// document.getElementById("quick-sort").addEventListener("click",()=> quickSort([2,7,13,11,4,8]));
// document.getElementById("heap-sort").addEventListener("click",()=> heapSort([2,7,13,11,4,8]));