import React from 'react';
import { Trophy, Github, Link } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    {
      username: 'codeMaster01',
      score: 980,
      country: 'IN',
      github: 'https://github.com/codeMaster01',
      codeforces: 'https://codeforces.com/profile/codeMaster01',
    },
    {
      username: 'bugHunter99',
      score: 910,
      country: 'US',
      github: 'https://github.com/bugHunter99',
      codeforces: 'https://codeforces.com/profile/bugHunter99',
    },
    {
      username: 'algowizard',
      score: 890,
      country: 'DE',
      github: 'https://github.com/algowizard',
      codeforces: 'https://codeforces.com/profile/algowizard',
    },
    {
      username: 'dev_ninja',
      score: 860,
      country: 'JP',
      github: 'https://github.com/dev_ninja',
      codeforces: 'https://codeforces.com/profile/dev_ninja',
    },
    {
      username: 'logicLord',
      score: 820,
      country: 'FR',
      github: 'https://github.com/logicLord',
      codeforces: 'https://codeforces.com/profile/logicLord',
    },
  ];

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const flagUrl = (countryCode) =>
    `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 font-mono">
      <h1 className="text-4xl font-bold text-cyan-400 text-center mb-10 flex items-center justify-center gap-2">
        <Trophy className="text-yellow-400 w-7 h-7" /> CodeArena Leaderboard
      </h1>

      <div className="max-w-4xl mx-auto space-y-5">
        {leaders.map((user, index) => (
          <div
            key={user.username}
            className="flex items-center justify-between bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800 hover:shadow-cyan-500/30 transition duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-yellow-400">{getMedal(index + 1)}</div>
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-cyan-500"
              />
              <div className="flex items-center gap-2">
                <img
                  src={flagUrl(user.country)}
                  alt={user.country}
                  className="w-6 h-4 rounded-sm shadow border border-cyan-500"
                />
                <p className="text-lg font-semibold text-cyan-300">{user.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={user.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={user.codeforces}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-500 hover:text-white transition"
                title="Codeforces"
              >
                <Link className="w-5 h-5" />
              </a>
              <span className="text-cyan-300 font-semibold text-xl">{user.score} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
