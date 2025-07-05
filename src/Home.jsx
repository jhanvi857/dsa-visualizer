import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import hashMap from "./hashMap.png";
import hashSet from "./hashSet.png";
import hashMapAndSet from "./hashMapAndSet.png";
import SubmitApproachForm from "./submitApproach";
function Home() {
  const categories = [
    { name: "Searching & Sorting", path: "/searching-sorting" },
    { name: "Recursion & Backtracking", path: "/recursion-backtracking" },
    { name: "Dynamic Programming", path: "/dynamic-programming" },
    { name: "Greedy", path: "/greedy" },
    { name: "Bit Manipulation", path: "/bit-manipulation" },
    { name: "Tree Algorithms", path: "/tree" },
    { name: "Sliding Window", path: "/sliding-window" },
    { name: "Prefix Sum & Difference Array", path: "/prefix-sum-diff" },
  ];
  const questions = [
    "Maximum subarray sum",
    "Longest common prefix",
    "Book allocation problem",
    "Next permutation",
    "Two sum",
    "Reverse a Linked list",
    "Valid parantheses",
    "Height of Binary tree",
    "Queue using 2 stacks",
    "Huffman coding",
    "Coin change problem",
    "Next greater element",
  ];

  return (
    <>
      <div className="flex flex-col lg:gap-x-20 px-16 mt-4 w-full">
        <h1 className="text-white text-4xl text-center mb-8 font-semibold">
          Data structures
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 pb-4 gap-y-8">
          {/* <!-- Arrays --> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl  font-semibold text-white text-center mb-2">
              Arrays
            </h1>
            <img
              src="https://i.pinimg.com/736x/cb/91/12/cb911212ff15000e2af7661ff0f1ce02.jpg"
              alt=""
            />
            <p className="text-center">
              - storing elements at contiguous memory. <br />
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=array"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
          {/* <!-- strings --> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl font-semibold text-center mb-4">Strings</h1>
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*EEmpU5oXP-iLual-5u9aFA.png"
              alt=""
            />
            <p className="text-center">
              - Sequence of characters.
              <br />
              - Operations: reverse, substring
              <br />
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=string"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
          {/* <!-- LL --> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl font-semibold text-center">Linked list</h1>
            <img
              src="https://i.pinimg.com/736x/2b/e6/b9/2be6b9793fff230ae35abdaacfdc6a7a.jpg"
              alt=""
            />
            <p>
              - Nodes pointing to next node.
              <br />
              - Types: Singly, Doubly, Circular
              <br />- Use: Efficient insert/delete
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=linkedlist"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
          {/* <!-- Stacks --> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg max-w-2xl shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl font-semibold text-center">Stacks</h1>
            <img
              src="https://i.pinimg.com/736x/2d/44/18/2d4418ca8134749f3170324a1a0668cd.jpg"
              alt=""
            />
            <p>
              - LIFO: Last-In First-Out <br />
              - Operations: push(), pop() <br />
              - Use: Recursion, undo/redo <br />
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=stack"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
          {/* <!-- Queues --> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl font-semibold text-center">Queues</h1>
            <img
              src="https://i.pinimg.com/736x/90/88/03/9088031501d9e5ec798c70083430ec80.jpg"
              alt=""
            />
            <p>
              - FIFO: First-In First-Out <br />
              - Variants: Circular, Deque <br />
              {/* <!-- - Use: CPU Scheduling <br> --> */}
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=queue"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
          {/* <!-- Trees --> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl font-semibold text-center">Trees</h1>
            {/* <!-- <img src="https://i.pinimg.com/736x/b9/c8/a2/b9c8a2ba28ed768edb254bddb51fa7bd.jpg" alt=""> --> */}
            <img
              src="https://i.pinimg.com/736x/14/11/51/141151f6f8513bbd3178b2982067e92b.jpg"
              alt=""
            />
            <p>
              - Hierarchical structure <br />
              - Types: Binary, BST, AVL <br />
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=tree"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
          {/* <!-- Graphs --> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg max-w-2xl shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl font-semibold text-center">Graphs</h1>
            <img
              src="https://i.pinimg.com/736x/a3/a5/c9/a3a5c9c8986865c52a780dfc21022b31.jpg"
              alt=""
            />
            <p className="text-center">
              - Vertices and edges <br />- Types: Directed,Weighted
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=graph"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
          {/* <!-- HashMaps and sets--> */}
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-2xl font-semibold text-center">Maps & Sets</h1>
            <img src={hashMapAndSet} alt="" />
            <p className="text-center">
              - Key-value pairs <br />- Fast access O(1) avg
            </p>
            <div className="flex justify-center items-center h-16">
              <a
                href="./Data_Structures/commonDS.html?type=mapsAndSets"
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
              >
                Explore &#8594;
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* <!-- Algorithms... --> */}
      <div
        className="flex flex-col items-center lg:gap-x-20 px-4 md:px-16 mt-8 w-full"
        id="algorithms"
      >
        <h1 className="text-white text-4xl text-center mb-8 font-semibold">
          Algorithms
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 pb-8 gap-y-8">
          {categories.map((categ, idx) => (
            <Link
              key={idx}
              to={categ.path}
              className="flex justify-center items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-xl md:text-2xl  font-semibold text-white text-center">
                {categ.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center h-16">
          <a
            href="../Algorithms/algoHome.html"
            className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 text-center rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
          >
            Explore more Algorithms&#8594;
          </a>
        </div>
      </div>
      <hr />
      {/* <!-- classical questions... --> */}
      <h1 className=" text-4xl text-center font-semibold">
        classical questions
      </h1>
      <div className="flex flex-col lg:gap-x-20 px-16 mt-8 w-full gap-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-8">
          {questions.map((que, idx) => (
            <Link
              key={idx}
              to="/explore-questions"
              className="flex justify-center items-center bg-white/20 p-8 rounded-lg shadow-md shadow-cyan-500/50 transition transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-xl md:text-2xl  font-semibold text-white text-center">
                {que}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center h-16">
          <Link to="/explore-questions">
            <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 text-center rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400">
              Explore more problems&#8594;
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <SubmitApproachForm />
    </>
  );
}

export default Home;
