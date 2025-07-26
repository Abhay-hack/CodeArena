import React from 'react';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    { username: 'codeMaster01', score: 980 },
    { username: 'bugHunter99', score: 910 },
    { username: 'algowizard', score: 890 },
    { username: 'dev_ninja', score: 860 },
    { username: 'logicLord', score: 820 },
  ];

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        🌍 Top 5 Coders in the World
      </h1>
      <div className="max-w-4xl mx-auto space-y-4">
        {leaders.map((user, index) => (
          <div
            key={user.username}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{getMedal(index + 1)}</div>
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">{user.username}</p>
              </div>
            </div>
            <div className="text-indigo-600 font-semibold text-lg">
              {user.score} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
