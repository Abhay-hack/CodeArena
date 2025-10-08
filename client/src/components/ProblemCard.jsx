import React from 'react';
import { Link } from 'react-router-dom';

const ProblemCard = ({ problem }) => (
  // Link to the problem detail page using the composite ID
  <Link to={`/problem/${problem.contestId}-${problem.index}`} className="block">
    <div className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-5 rounded-xl shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
      <h2 className="text-xl text-blue-400 font-semibold mb-2">{problem.title}</h2>
      <p className="text-gray-400 text-sm">Difficulty: <span className="font-medium text-gray-300">{problem.difficulty}</span></p>
      {problem.tags && problem.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {/* Fix: Use tag combined with index for unique key */}
          {problem.tags.map((tag, index) => (
            <span key={`${tag}-${index}`} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full opacity-80">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </Link>
);

export default ProblemCard;