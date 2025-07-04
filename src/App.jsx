import "./App.css";
import { useState } from "react";
import {Link,Routes, Router,Route} from "react-router-dom"

import Navbar from './navbar.jsx';
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
      
    </>
    
  );
}

export default App;
