import React from "react";
import { CalendarDays } from "lucide-react";

const Contests = () => {
  const contests = [
    { id: 1, name: "Weekly Challenge #1", date: "2025-07-30" },
    { id: 2, name: "Code Sprint 2", date: "2025-08-05" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏁 Upcoming Contests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">{contest.name}</h2>
            <div className="flex items-center text-gray-500">
              <CalendarDays className="w-5 h-5 mr-2" />
              <span>{contest.date}</span>
            </div>
            <div className="mt-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contests;
