// LL create and operations...
import { getContainer } from "./visualHelpers";
import { visualOperations } from "./visualizer";
    const container = document.getElementById("visualize");

// array export functions
export function handleInsert() {
  const index = parseInt(prompt("Enter the index to insert at:"));
  const value = prompt("Enter the value to insert:");
  if (!isNaN(index) && value !== null && value !== "") {
    visualOperations.array.insert(index, value);
  }
}

export function handleDelete() {
  const index = parseInt(prompt("Enter the index to delete:"));
  if (!isNaN(index)) {
    visualOperations.array.delete(index);
  }
}

export function handleAccess() {
  const index = parseInt(prompt("Enter the index to access:"));
  if (!isNaN(index)) {
    visualOperations.array.access(index);
  }
}

export function handleUpdate() {
  const index = parseInt(prompt("Enter the index to update:"));
  const newValue = prompt("Enter the new value:");
  if (!isNaN(index) && newValue !== null && newValue !== "") {
    visualOperations.array.update(index, newValue);
  }
}

// string inputs...
export function strInput(operation) {
  const input = prompt(`Enter a string to ${operation}`);
  return input;
}
export function substr(idx1, idx2, str) {
  const substring = str.substring(idx1, idx2);
  return substring;
}
// integer input
export function intInput() {
  const inputInt = parseInt(prompt("Enter the value : "));
  return inputInt;
}
// queue export functions
export function enqueue(value) {
  const container = document.getElementById("visualize");
  const box = createBox(value);
  container.appendChild(box);
  Array.from(container.querySelectorAll(".queue-label")).forEach((label) =>
    label.remove()
  );
  if (container.firstElementChild) {
    const front = document.createElement("h1");
    front.innerText = "\nFront";
    front.className = "queue-label";
    container.firstElementChild.appendChild(front);
  }
  if (container.lastElementChild) {
    const rear = document.createElement("h1");
    rear.innerText = "\n Rear";
    rear.className = "queue-label";
    container.lastElementChild.appendChild(rear);
  }

  requestAnimationFrame(() => {
    box.classList.replace("scale-0", "scale-100");
  });
}

// export function createBox(content = "", id = "") {
//   const box = document.createElement("div");
//   box.className = "w-16 h-16 border m-1 flex items-center justify-center rounded-md";
//   box.textContent = content;
//   if (id) box.id = id;
//   return box;
// }

export function highlightBucket(index, action, value) {
  const bucket = document.getElementById(`bucket-${index}`);
  if (bucket) {
    bucket.classList.add("bg-yellow-500");
    showMessage(`${action} ${value} at index ${index}`);
  }
}
export function hashKey(key, size) {
  // Simple hash: sum of char codes mod size
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % size;
}
export function showMessage(text) {
  const container = getContainer();
  const msg =
    document.getElementById("message") || document.createElement("div");
  msg.id = "message";
  msg.className = "my-2 text-sm text-white";
  msg.innerText = text;
  container.appendChild(msg);
}

export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
