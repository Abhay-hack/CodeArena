import React, { useEffect, useState } from "react";
import ProblemCard from "../components/ProblemCard";

const Problems = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Replace with real API call
    setProblems([
      { id: 1, title: "Two Sum", difficulty: "Easy" },
      { id: 2, title: "Reverse Linked List", difficulty: "Medium" },
      { id: 3, title: "Trapping Rain Water", difficulty: "Hard" },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Problems</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
};

export default Problems;
