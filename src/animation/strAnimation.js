import {
  createBox,
  positionArrow,
  delay,
  twoPointerAnimation,
  createStatus,
  createTitle,
  resetContainer,
  createBoxList,
  isAlphanumeric,
  getContainer,
} from "../utils/visualHelpers";
export const stringAnimation = {
  "valid palindrome": async function (str) {
    const container = getContainer();
    resetContainer("flex justify-center items-center",container);
    const charArray = str.split("");
    const boxes = createBoxList(charArray,container);
    const [siArrow, eiArrow] = twoPointerAnimation(container);
    let si = 0,
      ei = str.length - 1;

    while (si < ei) {
      // Skip non-alphanumeric characters
      while (si < ei && !isAlphanumeric(str[si])) si++;
      while (si < ei && !isAlphanumeric(str[ei])) ei--;

      positionArrow(siArrow, boxes[si], 10);
      positionArrow(eiArrow, boxes[ei], 10);
      await delay(1000);

      // Compare lowercase versions to ignore case
      if (str[si].toLowerCase() !== str[ei].toLowerCase()) {
        const status = createStatus(container,"Given string is NOT a palindrome!");
        status.classList.remove("absolute");
        status.classList.replace("bg-cyan-600", "bg-red-400");
        return;
      }

      si++;
      ei--;
    }
    siArrow.remove();
    eiArrow.remove();
    container.classList.remove("overflow-auto");
    container.classList.add("overflow-hidden");

    const status = createStatus(container,"Given string is a palindrome!");
    status.classList.remove("absolute")
  },
  "remove all occurances": async function (str,part) {
      const container = getContainer();

    resetContainer("absolute flex justify-center items-center flex-wrap",container);
    createStatus(container,`Removing all occurrences of "${part}" from the string`);

    let boxes = createBoxList(str.split(""),container);
    let s = str;

    while (s.includes(part)) {
      const index = s.indexOf(part);

      // Highlight the matching part
      for (let i = index; i < index + part.length; i++) {
        boxes[i].classList.add("bg-yellow-400", "text-black");
      }

      await delay(1000);

      // Remove from DOM and from string
      for (let i = index; i < index + part.length; i++) {
        boxes[i].remove();
      }

      // Update string
      s = s.slice(0, index) + s.slice(index + part.length);

      // Re-render boxes after removal
      await delay(500);
      resetContainer("flex justify-center items-center flex-wrap",container);
      boxes = createBoxList(s.split(""),container);
    }

    createStatus(container,`Final string after removal: "${s}"`);    
  },
  "reverse words in a string": async function (str) {
        const container = getContainer();

    resetContainer("flex flex-wrap justify-center gap-2",container);
    createTitle("Reversing words in the string",container);

    const words = str.trim().split(/\s+/); 
    const wordContainers = [];

    for (let word of words) {
      const wordDiv = document.createElement("div");
      wordDiv.className = "flex gap-1 p-2 border rounded-md";

      for (let ch of word) {
        const box = createBox(ch);
        wordDiv.appendChild(box);
      }

      wordContainers.push(wordDiv);
      container.appendChild(wordDiv);
      await delay(500);
    }

    await delay(1500);

    resetContainer("flex flex-wrap justify-center gap-2",container);
    for (let i = wordContainers.length - 1; i >= 0; i--) {
      container.appendChild(wordContainers[i]);
      await delay(800);
    }

    const reversed = words.reverse().join(" ");
    createStatus(container,`Final string: "${reversed}"`);
  },
  "permutation in string": async function (s1, s2) {
        const container = getContainer();

  resetContainer("flex justify-center items-center flex-wrap",container);
  const boxes = createBoxList(s2.split(""),container);
  await delay(800);

  const freq = new Array(26).fill(0);
  const a = "a".charCodeAt(0);

  for (let ch of s1) freq[ch.charCodeAt(0) - a]++;

  let left = 0;
  const window = new Array(26).fill(0);

  for (let right = 0; right < s2.length; right++) {
    window[s2.charCodeAt(right) - a]++;
    boxes[right].classList.add("bg-yellow-500");
    await delay(400);

    if (right - left + 1 > s1.length) {
      window[s2.charCodeAt(left) - a]--;
      boxes[left].classList.remove("bg-yellow-500");
      left++;
    }

    if (arraysEqual(freq, window)) {
      createStatus(container,"Permutation found!");
      return;
    }
  }

  createStatus(container,"No permutation found.");
},
"string compression": async function (str) {
      const container = getContainer();

  resetContainer("flex justify-center items-center",container);
  const boxes = createBoxList(str.split(""),container);
  await delay(500);

  let result = "";
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (i < str.length && str[i] === str[i - 1]) {
      count++;
    } else {
      result += str[i - 1] + (count > 1 ? count : "");
      boxes[i - 1].classList.add("bg-green-600");
      await delay(300);
      count = 1;
    }
  }

  createStatus(container,`Compressed: ${result}`);
}

};
function arraysEqual(a, b) {
  return a.every((v, i) => v === b[i]);
}
