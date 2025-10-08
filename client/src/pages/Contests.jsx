import React from "react";
import { CalendarDays, TerminalSquare } from "lucide-react";

const Contests = () => {
  const contests = [
    { id: 1, name: "Weekly Challenge #1", date: "2025-07-30" },
    { id: 2, name: "Code Sprint 2", date: "2025-08-05" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 font-mono">
      <h1 className="text-4xl font-bold text-cyan-400 mb-10 text-center">
        🚀 Upcoming Coding Contests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/30 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-cyan-300">{contest.name}</h2>
              <TerminalSquare className="text-cyan-500 w-6 h-6" />
            </div>

            <div className="flex items-center text-gray-400 mb-4">
              <CalendarDays className="w-5 h-5 mr-2 text-cyan-400" />
              <span>{contest.date}</span>
            </div>

            <button className="w-full mt-4 py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold tracking-wide transition duration-200">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contests;
