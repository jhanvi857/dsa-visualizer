import React, { useRef, useState, useEffect } from "react";
import questions from "./questions.json";
import { runAnimationAndExplain } from "./queVisualize";
import { Link } from "react-router-dom";
function ClassicalQ() {
  const [showDetails, setShowDetails] = useState({});
  const visualizeRef = useRef(null);
  const inputRef = useRef(null);

  const toggleDetails = (key) => {
    setShowDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleVisualize = async (key) => {
    localStorage.setItem("current problem", key);
    const inputSection = document.getElementById("customInputSection");
    if (inputSection) inputSection.classList.remove("hidden");

    await new Promise((res) => setTimeout(res, 100));
    if (visualizeRef.current) {
      visualizeRef.current.scrollIntoView({ behavior: "smooth" });
    }
    window.location.hash = "visualize";
runAnimationAndExplain({
  key,
  visualizeElement: visualizeRef.current,
  inputElement: inputRef.current,
});
  };

  return (
    <>
      <h1 className="text-white text-4xl text-center mb-8 font-semibold" data-aos="fade-up">
        Classical questions of DSA
      </h1>
      <div className="grid grid-cols-2 px-1 gap-x-2 md:grid-cols-3 xl:grid-cols-4 md:gap-x-6 pb-8 gap-y-8 sm:px-6 md:px-10">
        {Object.entries(questions).map(([key, statement], index) => (
          <div
            key={key}
            className="bg-white/20 text-white p-4 rounded-xl shadow-md shadow-cyan-500/50 flex flex-col items-center text-center space-y-3"
          data-aos="fade-up" >
            <h2 className="text-2xl font-semibold mb-2">
              {index + 1}. {key}
            </h2>
            <p className="text-lg text-cyan-400 mb-2">Platform: LeetCode</p>

            <button
              className="block text-cyan-400 hover:underline hover:cursor-pointer text-lg mb-4"
              onClick={() => toggleDetails(key)}
            >
              {showDetails[key] ? "Hide Details" : "View Details"}
            </button>

            {showDetails[key] && (
              <p className="mt-2 text-lg text-gray-200 whitespace-pre-wrap">
                {statement}
              </p>
            )}

            <button
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 hover:cursor-pointer"
              onClick={() => handleVisualize(key)}
            >
              Visualize →
            </button>
          </div>
        ))}
      </div>

      <hr />
      {/* <!-- Visualization div.. --> */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-10 rounded-lg mb-6" data-aos="fade-up">
        <section className="bg-white/20 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16 rounded-lg shadow-md shadow-cyan-500/50">
          <div className="max-w-7xl mx-auto">
            {/* <!-- Heading --> */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
              Visualize
            </h2>

            {/* <!-- Description --> */}
            <p className="text-center text-sm sm:text-base lg:text-lg mb-8"></p>
            {/* <!-- buttons --> */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 hover:cursor-pointer"
                id="ExplainationBtn"
              >
                Explaination
              </a>
              <button
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 hover:cursor-pointer"
                id="pseudocode" 
              >
                Pseudocode
              </button>
              <div className="relative inline-block text-left">
                <button
                  id="codeDropdownBtn" onClick={()=>alert("No other approach available currently !")}
                  type="button"
                  className="inline-flex w-full justify-center items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
                >
                  Other Approaches
                  <svg
                    className="-mr-1 size-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="codeDropdownMenu"
                  className="hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition ease-out duration-100"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                ></div>
              </div>
            </div>
            <div
              className="mt-10 bg-white/20 rounded-xl p-4 sm:p-6 mb-8"
              id="pseudocodeSection"
            >
              <pre
                className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm sm:text-lg text-white font-mono"
                id="pseudocodeText"
              >
                The output will be shown here
              </pre>
            </div>
            <div
              id="inputSec"
              className="mt-6 bg-white/20 rounded-xl p-4 sm:p-6 mb-8 w-full"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 text-center">
                Running visualization on input : 
              </h3>
              <textarea
                ref={inputRef}
                rows="3"
                cols="30"
                type="text"
                id="custom-input"
                placeholder="the input on which the visualization in running will be shown here."
                className="block w-full bg-gray-900 text-white placeholder:text-gray-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-lg"
              ></textarea>
            </div>
          
            <div
              ref={visualizeRef}
              className="overflow-y-auto overflow-x-auto bg-white/20 border-2 border-dashed border-gray-300 rounded-xl h-52 sm:h-64 md:h-72 lg:h-80 flex items-center justify-center text-gray-400 text-sm sm:text-lg text-center px-4"
              id="visualize"
            ></div>

            <div className="mt-6 bg-white/20 rounded-xl p-4 sm:p-6 mb-8 w-full">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 text-center">
                Got a different approach? ✍️
              </h3>
              
              <div className="flex flex-col items-center sm:flex-row justify-center">
                <Link to="/">
                <button
                  className="bg-cyan-400 shadow-lg mt-2 shadow-cyan-500/50 px-3 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
                  id="submit-approach"
                >
                  Submit your approach
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default ClassicalQ;
