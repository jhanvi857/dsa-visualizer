import { problemAnswers } from "../src/animation/problemAnimations";
import { stringAnimation } from "../src/animation/strAnimation";
import { LLAnimate } from "../src/animation/LLAnimation";
import { visualOperations } from "../src/utils/visualizer";
import {
  diameterOfBinaryTree,
  renderTree,
  buildTreeFromArray,
  huffmanEncoding,
} from "../src/utils/structure";
import {
  coinChange,
  longestCommonSubsequence,
} from "../src/animation/algoAnimation";
import { animateLRUCache } from "../src/animation/hashing";
import { pseudoExplain } from "./pseudoExplain";

// const pseudoExplain = {};

export async function runAnimationAndExplain({ key, visualizeElement, inputElement }) {
  const cleanedKey = key?.replace(/\s+/g, " ").trim().toLowerCase();
  const pseudoDisplay = document.getElementById("pseudocodeText");
  const pseudoBtn = document.getElementById("pseudocode");
  const container = document.getElementById("visualize");

  if (!pseudoDisplay || !pseudoBtn || !container) {
    console.warn("Required DOM elements not found for animation/explanation");
    return;
  }
  pseudoDisplay.innerText =
    pseudoExplain[cleanedKey]?.explanation ?? "No explanation available.";
  pseudoBtn.onclick = () => {
    pseudoDisplay.innerText =
      pseudoExplain[cleanedKey]?.pseudocode ?? "No pseudocode available.";
  };

  let displayInput = "";

  switch (cleanedKey) {
    case "pair sum problem":
      displayInput = "nums = [2, 7, 13, 11], target = 9";
        if (inputElement) inputElement.value = displayInput;

      await problemAnswers[cleanedKey]([2, 7, 13, 11], 9);
      break;
    case "stock buy & sell":
      displayInput = "nums = [7, 1, 5, 3, 6, 4]";
        if (inputElement) inputElement.value = displayInput;

      await problemAnswers[cleanedKey]([7, 1, 5, 3, 6, 4]);
      break;
    case "container with most water":
      displayInput = "nums = [1, 8, 6, 2, 5, 4, 8, 3, 7]";
      inputElement.value = displayInput;
      await problemAnswers[cleanedKey]([1, 8, 6, 2, 5, 4, 8, 3, 7]);
      break;
    case "product of array except itself":
      displayInput = "nums = [1,2,3,4]";
      inputElement.value = displayInput;
      await problemAnswers[cleanedKey]([1, 2, 3, 4]);
      break;
    case "search in rotated sorted array":
      displayInput = "nums = [4,5,6,7,0,1,2]\n target = 0";
      inputElement.value = displayInput;
      await problemAnswers[cleanedKey]([4, 5, 6, 7, 0, 1, 2], 0);
      break;
    case "peak index in mountain array":
      displayInput = "nums = [0,2,3,4,5,2,1,0]";
      inputElement.value = displayInput;
      await problemAnswers[cleanedKey]([0,2,3,4,5,2,1,0]);
      break;
    case "single element in sorted array":
      displayInput = "nums = [1,1,2,3,3,4,4,8,8]";
      inputElement.value = displayInput;
      await problemAnswers[cleanedKey]([1,1,2,3,3,4,4,8,8]);
      break;
    case "book allocation problem":
      displayInput = "nums = [12,34,67,90] students = 2";
      await problemAnswers[cleanedKey]([12, 34, 67, 90], 2);
      break;
    case "sort an array with 0s 1s and 2s":
      displayInput = "nums = [2,0,2,1,1,0]";
      inputElement.value = displayInput;
      await problemAnswers[cleanedKey]([2,0,2,1,1,0]);
      break;
    case "merge two sorted arrays":
      displayInput = "nums1 = [1,2,3,4]\n nums2 = [2,5,6]";
      inputElement.value = displayInput;
      await problemAnswers[cleanedKey]([1,2,3,4],[2,5,6]);
      break;
      case "next permutation":
        displayInput = "nums = [1,2,3,4]";
        inputElement.value = displayInput;
        await problemAnswers[cleanedKey]([1,2,3,4]);
        break;
    case "valid palindrome":
      displayInput = 'string = "A man, a plan, a canal: Panama"';
      inputElement.value = displayInput;
      await stringAnimation[cleanedKey]("A man, a plan, a canal: Panama");
      break;
    case "remove all occurances":
      displayInput = "s = abcabc\nsubstring = ab";
      inputElement.value = displayInput;
      await stringAnimation[cleanedKey]("abcabc","ab");
      break;
    case "permutation in string":
      displayInput = "permutationToFound string = ab\n string = eidbaooo";
      inputElement.value = displayInput;
      await stringAnimation[cleanedKey]("ab", "eidbaooo");
      break;
    case "reverse words in a string":
      displayInput = "string = the sky is blue";
      inputElement.value = displayInput;
      await stringAnimation[cleanedKey]("the sky is blue");
      break;
    case "string compression":
      
      await stringAnimation[cleanedKey]("aabbcccc");
      break;
    case "search in a 2d matrix":
      await problemAnswers[cleanedKey]([[1, 3, 5, 7],[10, 11, 16, 20],[23, 30, 34, 50]],3);
      break;
    case "reverse a linked list":
      await LLAnimate[cleanedKey]();
      break;
    case "middle of a linked list":
      await LLAnimate[cleanedKey]();
      break;
    case "detect and remove cycle":
      await LLAnimate[cleanedKey]();
      break;
    case "merge two sorted lists":
      await LLAnimate[cleanedKey]();
      break;
    case "lru cache":
      await animateLRUCache([
      ["put", 1, 1],
      ["put", 2, 2],
      ["get", 1],
      ["put", 3, 3],
      ["get", 2],
      ["put", 4, 4],
      ["get", 1],
      ["get", 3],
      ["get", 4]
    ],
    2);
    break;
    case "traversals of binary tree":
      if (confirm("This visualization is on another page. Do you want to continue?")) {
        redirectToVisualizer("tree");
      }
      break;
    case "diameter of binary tree": {
      const sample = [1, 2, 3, 7, 4, 5, 6, null, null];
      const tree = buildTreeFromArray(sample);
      renderTree(tree);
      await diameterOfBinaryTree(tree);
      break;
    }
    case "longest common subsequence":
      await longestCommonSubsequence("abcde", "ace");
      break;
    case "coin change":
      await coinChange([1, 2, 5], 11);
      break;
    case "huffman encoding":
      await huffmanEncoding([5, 9, 12, 13, 16, 45]);
      break;
    case "cycle detection in undirected graph":
      const vertices = ["A","B","C","D"];
      const edges = [["A", "B"],
    ["B", "C"],
    ["C", "A"], 
    ["C", "D"],]; 
    vertices.forEach((vertex)=>{visualOperations.graph.addvertex(vertex)});
    edges.forEach(([u,v])=>{visualOperations.graph.addedge(u,v)});
    await visualOperations.graph.cycleDetect();
    break; 
    default:
      console.warn("No animation available for:", cleanedKey);
  }

  

  container.scrollIntoView({ behavior: "smooth" });
}

// 
export function redirectToVisualizer(type) {
  window.location.href = `../Data_Structures/commonDS.html?type=${type}#visualize`;
}
