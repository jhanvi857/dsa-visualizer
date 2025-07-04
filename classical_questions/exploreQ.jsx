// import React from "react";
// import ReactDOM from "react-dom/client";
// import Navbar from "../src/navbar"; 
// import questions from "./questions.json"
// const root = ReactDOM.createRoot(document.getElementById("navbar"));
// root.render(<Navbar />);

// function displayDiv(questions) {
//   const container = document.getElementById("que-container");
//   Object.keys(questions).forEach((key, index) => {
//     const div = document.createElement("div");
//     div.className = "bg-white/20 text-white p-4 rounded-xl shadow-md shadow-cyan-500/50 flex flex-col items-center text-center space-y-3 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg";

//     const title = document.createElement("h2");
//     title.className = "text-2xl font-semibold mb-2";
//     title.innerText = `${index + 1}. ${key}`;

//     const platform = document.createElement("p");
//     platform.className = "text-lg text-cyan-400 mb-2";
//     platform.innerText = "Platform: LeetCode";

//     const toggleBtn = document.createElement("button");
//     toggleBtn.className = "block text-cyan-400 hover:underline hover:cursor-pointer text-lg mb-4";
//     toggleBtn.innerText = "View Details";

//     const statement = document.createElement("p");
//     statement.className =
//       "hidden mt-2 text-lg text-gray-200 whitespace-pre-wrap";
//     statement.innerText = questions[key];
//     const visualizeBtn = document.createElement("a");
//     visualizeBtn.className =
//       "bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 hover:cursor-pointer";
//     visualizeBtn.innerHTML = "visualize&#8594";
//     visualizeBtn.href = "exploreQ.html#visualize";
//     visualizeBtn.onclick = () => {
//       localStorage.setItem("current problem",key);
//       document.getElementById("customInputSection").classList.toggle("hidden");
//     };

//     toggleBtn.onclick = () => {
//       const isHidden = statement.classList.contains("hidden");
//       statement.classList.toggle("hidden");
//       toggleBtn.innerText = isHidden ? "Hide Details" : "View Details";
//     };

//     div.appendChild(title);
//     div.appendChild(platform);
//     div.appendChild(toggleBtn);
//     div.appendChild(statement);
//     div.appendChild(visualizeBtn);
//     container.appendChild(div);
//   });
// }
// displayDiv(questions);
