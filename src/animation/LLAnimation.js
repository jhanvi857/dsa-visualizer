import { visualOperations } from "../utils/visualizer";
import { LinkedList, Node } from "../utils/structure";
import {
  createArrow,
  delay,
  resetContainer,
  positionArrow,
  createStatus,
  createBox,
  getContainer,
} from "../utils/visualHelpers";

export const LLAnimate = {
  "reverse a linked list": async function () {
      const container = getContainer();
    resetContainer("flex justify-center items-center",container);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const myList = new LinkedList();
    for (let element of arr) {
      visualOperations.linkedlist.insertend(myList, element);
    }
    const prevArr = createArrow("white");
    const currArr = createArrow("white");
    const nextArr = createArrow("white");
    container.appendChild(prevArr);
    container.appendChild(currArr);
    container.appendChild(nextArr);
    await delay(800);
    let prev = null;
    let curr = myList.head;
    let idx = 0;
    while (curr) {
      const next = curr.next;
      const currBox = document.getElementById(`node-${idx}`);
      const prevBox = document.getElementById(`node-${idx - 1}`);
      const nextBox = document.getElementById(`node-${idx + 1}`);
      const arrow = document.getElementById(`arrow-${idx - 1}`);

      if (prevBox) positionArrow(prevArr, prevBox, 40);
      if (currBox) positionArrow(currArr, currBox, 40);
      if (nextBox) positionArrow(nextArr, nextBox, 40);
      currBox.classList.add("bg-red-500");

      await delay(1000);

      curr.next = prev;
      if (arrow) {
        arrow.innerText = "←";
        arrow.classList.add("text-yellow-400");
      }
      currBox.classList.remove("bg-red-500");
      currBox.classList.add("bg-yellow-500");

      prev = curr;
      curr = next;
      idx++;
      await delay(800);
    }
    const status = document.createElement("div");
    status.innerText = "✔ Linked List Reversed!";
    status.className = "text-green-400 font-bold text-xl mt-4";
    container.appendChild(status);
  },
  "middle of a linked list": async function () {
          const container = getContainer();

    resetContainer("flex justify-center items-center",container);
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const myList = new LinkedList();
    for (let i = 0; i < arr.length; i++) {
      visualOperations.linkedlist.insertend(myList, arr[i]);
      await delay(500);
    }
    const arrow1 = createArrow();
    const arrow2 = createArrow();
    container.appendChild(arrow1);
    container.appendChild(arrow2);

    let slow = myList.head;
    let fast = myList.head;
    let idx1 = 0;
    let idx2 = 0;
    while (fast != null && fast.next != null) {
      let slowBox = document.getElementById(`node-${idx1}`);
      let fastBox = document.getElementById(`node-${idx2}`);
      positionArrow(arrow1, slowBox, 20);
      positionArrow(arrow2, fastBox, 20);
      await delay(800);

      slow = slow.next;
      fast = fast.next.next;
      idx1++;
      idx2 += 2;
    }

    if (fast !== null) {
      const fastIdx = getNodeIndex(myList.head, fast);
      const slowIdx = getNodeIndex(myList.head, slow);
      const slowBox = document.getElementById(`node-${slowIdx}`);
      const fastBox = document.getElementById(`node-${fastIdx - 1}`);
      if (fastBox && slowBox) {
        positionArrow(arrow1, slowBox, 20);
        positionArrow(arrow2, fastBox, 20);
      }
    }
    
    function getNodeIndex(head, target) {
      let index = 0;
      while (head !== target) {
        head = head.next;
        index++;
      }
      return index;
    }
    await delay(400);
    const middleDiv = document.getElementById(`node-${idx1}`);
    if (middleDiv) {
      middleDiv.classList.add("bg-green-500");
      const msg = createStatus(container,`middle node : ${middleDiv.innerText}`);
      msg.classList.remove("absolute")
      arrow1.remove();
      arrow2.remove();
      container.classList.remove("overflow-auto");
      container.classList.add("overflow-hidden");

    }
    
  },
  "detect and remove cycle": async function () {
    const container = getContainer();
    resetContainer("flex justify-center items-center",container);

    const arr = [1, 2, 3, 4, 5, 6, 7];
    const myList = new LinkedList();

    for (let i = 0; i < arr.length; i++) {
      visualOperations.linkedlist.insertend(myList, arr[i]);
      await delay(800);
    }

    let temp = myList.head;
    let cycleStart = null;
    let last = null;
    let index = 0;

    while (temp.next !== null) {
      if (index === 2) cycleStart = temp;
      temp = temp.next;
      index++;
    }
    last = temp;
    last.next = cycleStart;

    const lastIndex = arr.length - 1;
    const cycleStartIndex = 2;

    const fromBox = document.getElementById(`node-${lastIndex}`);
    const toBox = document.getElementById(`node-${cycleStartIndex}`);
    if (fromBox && toBox) {
      const loopArrow = document.createElement("div");
      loopArrow.innerText = "↩";
      loopArrow.className =
        "absolute text-yellow-400 text-xl font-bold transition-all duration-500";
      loopArrow.style.left = `${toBox.offsetLeft - 30}px`;
      loopArrow.style.top = `${toBox.offsetTop - 30}px`;
      container.appendChild(loopArrow);

      toBox.classList.add("border-4", "border-yellow-400");
    }

    const arrow1 = createArrow();
    const arrow2 = createArrow();
    container.appendChild(arrow1);
    container.appendChild(arrow2);

    let slow = myList.head;
    let fast = myList.head;
    let idx1 = 0;
    let idx2 = 0;
    let hasCycle = false;

    while (fast !== null && fast.next !== null) {
      const slowBox = document.getElementById(`node-${idx1 % arr.length}`);
      const fastBox = document.getElementById(`node-${idx2 % arr.length}`);
      if (slowBox) positionArrow(arrow1, slowBox, 20);
      if (fastBox) positionArrow(arrow2, fastBox, 20);

      await delay(800);

      slow = slow.next;
      fast = fast.next.next;
      idx1++;
      idx2 += 2;

      if (slow === fast) {
        createStatus(container,`Cycle detected at node with value ${slow.value}`);
        await delay(900);
        hasCycle = true;
        break;
      }
    }
    if (hasCycle) {
      slow = myList.head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }

      let prev = slow;
      while (prev.next !== slow) {
        prev = prev.next;
      }
      prev.next = null;

      await delay(1000);
      // createStatus(container,`❌ Cycle removed. Loop started at node ${slow.value}`);
      await delay(800);
      visualOperations.linkedlist.render(myList);
    } else {
      createStatus(container,"✅ No cycle found in the list.");
    }
  },
  "merge two sorted lists": async function () {
      const container = getContainer();

    resetContainer("grid grid-cols-1 gap-8 justify-center items-start",container);

    const arr1 = [1, 3, 5, 7];
    const arr2 = [2, 4, 6, 8];

    const myList1 = new LinkedList();
    const myList2 = new LinkedList();
    const mergedList = new LinkedList();

    // Create 3 columns
    const list1Div = document.createElement("div");
    const list2Div = document.createElement("div");
    const mergeDiv = document.createElement("div");

    list1Div.className = "flex flex-col items-center";
    list2Div.className = "flex flex-col items-center";
    mergeDiv.className = "flex flex-col items-center";

    list1Div.innerHTML = `<div class="text-white text-center font-bold mb-2">List 1</div>`;
    list2Div.innerHTML = `<div class="text-white text-center font-bold mb-2">List 2</div>`;
    mergeDiv.innerHTML = `<div class="text-white text-center font-bold mb-2">Merged List</div>`;

    const row1 = document.createElement("div");
    const row2 = document.createElement("div");
    const rowM = document.createElement("div");

    row1.id = "row1";
    row2.id = "row2";
    rowM.id = "rowM";

    row1.className = "flex items-center overflow-x-auto min-w-0";
    row2.className = "flex items-center overflow-x-auto min-w-0";
    rowM.className = "flex items-center overflow-x-auto min-w-0";

    list1Div.appendChild(row1);
    list2Div.appendChild(row2);
    mergeDiv.appendChild(rowM);

    container.appendChild(list1Div);
    container.appendChild(list2Div);
    container.appendChild(mergeDiv);

    // Fill List 1
    for (let i = 0; i < arr1.length; i++) {
      myList1.insertAtEnd(arr1[i]);
      const box = createBox(arr1[i]);
      box.id = `l1-${i}`;
      row1.appendChild(box);
      if (i !== arr1.length - 1) {
        const arrow = document.createElement("span");
        arrow.innerText = "→";
        arrow.className = "text-white text-4xl";
        row1.appendChild(arrow);
      }
      await delay(250);
    }

    // Fill List 2
    for (let i = 0; i < arr2.length; i++) {
      myList2.insertAtEnd(arr2[i]);
      const box = createBox(arr2[i]);
      box.id = `l2-${i}`;
      row2.appendChild(box);
      if (i !== arr2.length - 1) {
        const arrow = document.createElement("span");
        arrow.innerText = "→";
        arrow.className = "text-white text-4xl mx-2";
        row2.appendChild(arrow);
      }
      await delay(250);
    }

    // Merge Process
    let temp1 = myList1.head;
    let temp2 = myList2.head;
    let i = 0,
      j = 0;

    while (temp1 !== null && temp2 !== null) {
      const val1 = temp1.value;
      const val2 = temp2.value;

      const id1 = document.getElementById(`l1-${i}`);
      const id2 = document.getElementById(`l2-${j}`);

      if (id1) id1.classList.add("bg-yellow-500");
      if (id2) id2.classList.add("bg-yellow-500");
      await delay(700);

      if (val1 < val2) {
        mergedList.insertAtEnd(val1);
        const box = createBox(val1);
        rowM.appendChild(box);
        // if (temp1.next) {
          const arrow = document.createElement("span");
          arrow.innerText = "→";
          arrow.className = "text-white text-4xl mx-2";
          rowM.appendChild(arrow);
        // }
        temp1 = temp1.next;
        i++;
        if (id1) id1.classList.add("bg-green-600");
      } else {
        mergedList.insertAtEnd(val2);
        const box = createBox(val2);
        rowM.appendChild(box);
        if (temp2.next) {
          const arrow = document.createElement("span");
          arrow.innerText = "→";
          arrow.className = "text-white text-4xl mx-2";
          rowM.appendChild(arrow);
        }
        temp2 = temp2.next;
        j++;
        if (id2) id2.classList.add("bg-green-600");
      }

      if (id1) id1.classList.remove("bg-yellow-500");
      if (id2) id2.classList.remove("bg-yellow-500");

      await delay(500);
    }

    // Append remaining from List 1
    while (temp1 !== null) {
      mergedList.insertAtEnd(temp1.value);
      const box = createBox(temp1.value);
      rowM.appendChild(box);
      if (temp1.next) {
        const arrow = document.createElement("span");
        arrow.innerText = "→";
        arrow.className = "text-white text-4xl mx-2";
        rowM.appendChild(arrow);
      }
      temp1 = temp1.next;
      await delay(300);
    }

    // Append remaining from List 2
    while (temp2 !== null) {
      mergedList.insertAtEnd(temp2.value);
      const box = createBox(temp2.value);
      rowM.appendChild(box);
      if (temp2.next) {
        const arrow = document.createElement("span");
        arrow.innerText = "→";
        arrow.className = "text-white text-4xl mx-2";
        rowM.appendChild(arrow);
      }
      temp2 = temp2.next;
      await delay(300);
      rowM.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
    createStatus(container,"✅ Lists merged successfully!");
  },
};
