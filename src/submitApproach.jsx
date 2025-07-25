import { useState } from "react";

export default function SubmitApproachForm() {
  const [formData, setFormData] = useState({
    problem: "",
    name: "",
    email: "",
    explanation: "",
    pseudocode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Basic validation
    if (
      !formData.problem ||
      !formData.name ||
      !formData.explanation ||
      !formData.pseudocode
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/submit-approach",{
        
        method: "POST",
        headers: {
          "Content-Type": "application/json" // ✅ fix here
        },
        body:JSON.stringify(formData)
      });
      if (res.ok) {
      alert("Your approach has been submitted!");
      setFormData({
        problem: "",
        name: "",
        email: "",
        explanation: "",
        pseudocode: ""
      });
    } else {
      alert("Submission failed. Please try again.");
    }
    } catch(err) {
      console.log("Error occured connecting frontend with backend",err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center" data-aos="fade-up">Submit Your Own Approach</h2>

    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto bg-white/20 p-6 rounded-2xl shadow-md shadow-cyan-500/50 text-white mb-8 hover:shadow-lg"
    data-aos="fade-up" >

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Problem Name *</label>
        <input
          type="text"
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          placeholder="e.g. Pair Sum Problem"
          className="w-full px-4 py-2 border border-gray-50 rounded-md text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Your Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-50 text-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email (optional)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-50 text-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Explanation *</label>
        <textarea
          name="explanation"
          value={formData.explanation}
          onChange={handleChange}
          rows={5}
          placeholder="Explain your approach in simple terms..."
          className="w-full px-4 py-2 rounded-md border border-gray-50 text-gray-50"
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold">Pseudocode *</label>
        <textarea
          name="pseudocode"
          value={formData.pseudocode}
          onChange={handleChange}
          rows={5}
          placeholder="Write pseudocode or code-like explanation..."
          className="w-full px-4 py-2 border border-gray-50 rounded-md text-gray-50 font-mono"
        ></textarea>
      </div>

      <div className="flex justify-center items-center">
        <button
        type="submit"
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 px-3 py-2 text-center rounded-md text-md md:text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400"
      >
        Submit Approach
      </button>
      </div>
    </form>
    </>
  );
}
