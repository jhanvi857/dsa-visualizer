export function getContainer() {
  const container = document.getElementById("visualize");
  if (!container) {
    console.warn("visualize container not found");
  }
  return container;
}
// const container = getContainer();
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function positionArrow(arrow, box, offsetY = 0) {
  const x = box.offsetLeft + box.offsetWidth / 2 - 10;
  arrow.style.left = `${x}px`;
  arrow.style.top = `${box.offsetTop + box.offsetHeight + offsetY}px`;
}

export function positionArrow2D(arrow, box, offsetY = 0) {
  const x = box.offsetLeft + box.offsetWidth / 2 - arrow.offsetWidth / 2;
  const y = box.offsetTop + box.offsetHeight + offsetY;
  arrow.style.left = `${x}px`;
  arrow.style.top = `${y}px`;
  arrow.style.position = "absolute";
}

export function twoPointerAnimation(container) {
  const siArrow = createArrow();
  const eiArrow = createArrow();
  container.appendChild(siArrow);
  container.appendChild(eiArrow);
  return [siArrow, eiArrow];
}

export function createArrow(color = "white", symbol = "↑") {
  const arrow = document.createElement("div");
  arrow.className = `absolute text-${color} text-3xl font-bold transition-all duration-500`;
  arrow.innerHTML = symbol;
  return arrow;
}

export function createGrid(matrix, container, flatBoxes = []) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const grid = document.createElement("div");
  grid.className = "grid gap-2";
  grid.style.gridTemplateColumns = `repeat(${cols}, auto)`;
  matrix.flat().forEach((val, i) => {
    const box = createBox(val);
    box.id = `box-${i}`;
    grid.appendChild(box);
    flatBoxes.push(box);
  });
  container.appendChild(grid);
  return { grid, rows, cols, boxes: flatBoxes };
}

export function createTitle(text, container) {
  const title = document.createElement("div");
  title.innerText = text;
  title.className = "w-full text-white font-bold";
  container.appendChild(title);
  return title;
}

export function isAlphanumeric(str) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
}

export function createBox(value) {
  const box = document.createElement("div");
  box.className =
    "block w-16 h-16 bg-cyan-600 mr-2 text-white font-bold flex items-center justify-center rounded-md shadow-md transform transition-transform duration-300";
  box.innerText = value;
  return box;
}

export function createBoxList(arr, container) {
  return arr.map((value) => {
    const box = createBox(value);
    container.appendChild(box); // 💥 This is where it was crashing
    return box;
  });
}

export function resetContainer(layout = "flex", container) {
  container = container || document.getElementById("visualize");
  if (!container) return;

  container.innerHTML = "";

  // Outer: vertical scroll container
  container.className = `
    overflow-y-auto 
    overflow-x-auto
    bg-white/20 
    border-2 border-dashed border-gray-300 
    rounded-xl 
    h-[20rem] 
    px-2 
    flex gap-4
  `;

  // Inner: horizontal scroll content
  const wrapper = document.createElement("div");
  wrapper.className = "w-full overflow-x-auto pl-2";

  const inner = document.createElement("div");
  inner.id = "visual-content";
  inner.className = "flex w-max gap-2 items-center";
  wrapper.appendChild(inner);
  container.appendChild(wrapper);
}

export function createStatus(container, text = "") {
  const status = document.createElement("div");
  status.className = "text-white font-semibold text-xl absolute top-full md:mt-2";
  status.innerText = text;
  container.classList.add("relative");
  container.appendChild(status);
  return status;
}

export async function highlight (box,color) {
  box.classList.replace("bg-cyan-600",color);
}