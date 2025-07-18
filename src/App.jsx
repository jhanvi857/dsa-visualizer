import "./App.css";
import { useState } from "react";
import {Link,Routes, Router,Route} from "react-router-dom"

import Navbar from './Navbar.jsx';
import Home from "./Home.jsx";
import { SearchingSorting,RecBackTrack,DP,Greedy,BitM,Tree,PreSumDiffArr,SlidingWindow } from "./RenderUi.jsx";
import ClassicalQ from "../classical_questions/ClassicalQ.jsx";
function App() {
  // const [content, setContent] = useState(null);
  
  return (
    <>
      <Navbar/>
      <main className="pt-20 px-4">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searching-sorting" element={<SearchingSorting />} />
        <Route path="/recursion-backtracking" element={<RecBackTrack />} />
        <Route path="/dynamic-programming" element={<DP />} />
        <Route path="/greedy" element={<Greedy />} />
        <Route path="/bit-manipulation" element={<BitM />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/sliding-window" element={<SlidingWindow />} />
        <Route path="/prefix-sum-diff" element={<PreSumDiffArr />} />
        <Route path="/explore-questions" element={<ClassicalQ/>} />
      </Routes>
      </main>
      <footer className="bg-white/20 text-white py-6 mt-8 shadow-inner">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
    <div className="mb-2 md:mb-0">
      © 2025. Made with ❤️ using React, tailwind css & Node.js.
    </div>

    <div className="flex space-x-4">
      <a href="https://github.com/jhanvi857" target="_blank" rel="noreferrer" className="hover:text-cyan-400">
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/jhanvi-patel-0a032b35a/" target="_blank" rel="noreferrer" className="hover:text-cyan-400">
        LinkedIn
      </a>
      <a href="mailto:jhanvip8507@gmail.com" className="hover:text-cyan-400">
        Contact
      </a>
    </div>
  </div>
</footer>

    </>
    
  );
}

export default App;
