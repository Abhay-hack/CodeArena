import React, { useEffect, useState } from "react";
import ProblemCard from "../components/ProblemCard"; // Assuming ProblemCard is in the same directory or adjust path

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [uniqueTopics, setUniqueTopics] = useState([]);

  // Load base URL from .env
  const API_BASE = import.meta.env.VITE_CODEFORCES_API;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(`${API_BASE}/problemset.problems`);
        const data = await res.json();

        if (data.status === "OK") {
          const allProblems = data.result.problems;

          const simplified = allProblems
            .filter((p) => p.rating)
            .slice(0, 500)
            .map((prob) => ({
              id: `${prob.contestId}-${prob.index}`,
              title: prob.name,
              difficulty: prob.rating || "Unrated",
              tags: prob.tags,
              contestId: prob.contestId,
              index: prob.index,
            }));

          const topics = new Set();
          simplified.forEach((p) => {
            p.tags.forEach((tag) => topics.add(tag));
          });
          setUniqueTopics(Array.from(topics).sort());

          setProblems(simplified);
          setFilteredProblems(simplified);
        }
      } catch (err) {
        console.error("Failed to load problems:", err);
      }
    };

    fetchProblems();
  }, [API_BASE]);

  useEffect(() => {
    let currentFilteredProblems = problems;

    if (selectedDifficulty !== "All") {
      currentFilteredProblems = currentFilteredProblems.filter((problem) => {
        const rating = problem.difficulty;
        if (selectedDifficulty === "Easy") {
          return rating < 1400;
        } else if (selectedDifficulty === "Medium") {
          return rating >= 1400 && rating < 2000;
        } else if (selectedDifficulty === "Hard") {
          return rating >= 2000;
        }
        return true;
      });
    }

    if (selectedTopic !== "All") {
      currentFilteredProblems = currentFilteredProblems.filter(
        (problem) => problem.tags && problem.tags.includes(selectedTopic)
      );
    }

    const sortedProblems = [...currentFilteredProblems].sort((a, b) => {
      const diffA = a.difficulty === "Unrated" ? Infinity : a.difficulty;
      const diffB = b.difficulty === "Unrated" ? Infinity : b.difficulty;
      return diffA - diffB;
    });

    setFilteredProblems(sortedProblems);
  }, [problems, selectedDifficulty, selectedTopic]);

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-inter">
      <h1 className="text-3xl font-extrabold text-blue-300 mb-6 text-center">Problems</h1>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <div className="relative inline-block text-gray-700">
          <select
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="block appearance-none w-full bg-gray-800 border border-gray-600 rounded-lg shadow-sm px-6 py-3 pr-8 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out cursor-pointer text-white"
            style={{ minWidth: "180px" }}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy (Rating &lt; 1400)</option>
            <option value="Medium">Medium (Rating 1400-1999)</option>
            <option value="Hard">Hard (Rating &ge; 2000)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg
              className="fill-current h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="relative inline-block text-gray-700">
          <select
            value={selectedTopic}
            onChange={handleTopicChange}
            className="block appearance-none w-full bg-gray-800 border border-gray-600 rounded-lg shadow-sm px-6 py-3 pr-8 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out cursor-pointer text-white"
            style={{ minWidth: "180px" }}
          >
            <option value="All">All Topics</option>
            {uniqueTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg
              className="fill-current h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-lg py-10">
            {problems.length === 0
              ? "Loading problems..."
              : "No problems found with the selected filters."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Problems;
