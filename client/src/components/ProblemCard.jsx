// src/components/ProblemCard.jsx
import { Link } from 'react-router-dom';

const ProblemCard = ({ problem }) => (
  <Link to={`/problem/${problem.id}`}>
    <div className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-gray-700 p-4 rounded-xl shadow-md transition duration-200">
      <h2 className="text-lg text-blue-300 font-semibold mb-2">{problem.title}</h2>
      <p className="text-gray-400 text-sm">{problem.difficulty}</p>
    </div>
  </Link>
);

export default ProblemCard;
