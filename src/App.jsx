import "./App.css";
import { useState,useEffect } from "react";
import {Link,Routes, Router,Route} from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Navbar.jsx';
import Home from "./Home.jsx";
import { SearchingSorting,RecBackTrack,DP,Greedy,BitM,Tree,PreSumDiffArr,SlidingWindow } from "./RenderUi.jsx";
import ClassicalQ from "../classical_questions/ClassicalQ.jsx";
import AlgoHome from "../Algorithms/AlgoHome.jsx";
function App() {
  // const [content, setContent] = useState(null);
  useEffect(() => {
  AOS.init({
    duration: 800,     // animation duration
    once: true,        // only animate once
    easing: 'ease-out',
  });
}, []);
  return (
    <>
      <section data-aos="fade-down">
        <Navbar />
      </section>
      <main className="pt-20 px-4" >
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
        <Route path="/algorithms" element={<AlgoHome/>}/>
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
