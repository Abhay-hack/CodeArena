import React, { useEffect, useState } from 'react';
import {
  Github, Linkedin, Activity, Star, Tag,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = prompt("Enter your handle (e.g., Abhay108om)") || "anonymous";

    // Mock data
    const mockUser = {
      username,
      fullName: "Abhay Gupta",
      email: `${username}@example.com`,
      avatar: "https://avatars.githubusercontent.com/u/9919?s=280&v=4",
      country: "India",
      organization: "MPEC Kanpur",
      rank: "Specialist",
      rating: 1423,
      maxRating: 1520,
      contribution: 12,
      friendOfCount: 80,
      github: "https://github.com/Abhay-hack",
      linkedin: "https://linkedin.com/in/abhay-gupta",
      contests: [
        { date: "Jul 28", name: "Round #932", rank: 1287, change: "+37" },
        { date: "Jul 12", name: "Edu #156", rank: 1922, change: "-18" },
      ],
      tags: ['Dynamic Programming', 'Graphs', 'Greedy', 'Binary Search', 'Sorting'],
      ratingTimeline: [
        { name: 'Apr', rating: 1200 },
        { name: 'May', rating: 1310 },
        { name: 'Jun', rating: 1390 },
        { name: 'Jul', rating: 1423 },
      ],
      solvedHistory: Array.from({ length: 42 }, () => Math.random() > 0.5),
    };

    setTimeout(() => setUser(mockUser), 500);
  }, []);

  if (!user) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="bg-[#1f1f2f] min-h-screen text-gray-200 font-mono p-6">
      <div className="max-w-5xl mx-auto bg-[#2a2a3b] rounded-xl p-6 shadow-lg">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-blue-500" />
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-sm text-gray-400">{user.fullName} • {user.country}</p>
            <p className="text-sm text-gray-400">🏫 {user.organization}</p>
            <p className="text-sm text-blue-300 mt-1">Rating: {user.rating} (Max: {user.maxRating})</p>
            <div className="flex gap-3 mt-2">
              <a href={user.github} target="_blank"><Github /></a>
              <a href={user.linkedin} target="_blank"><Linkedin /></a>
            </div>
          </div>
        </div>

        {/* CONTESTS */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-3">🏁 Recent Contests</h2>
          {user.contests.map((c, i) => (
            <div key={i} className="flex justify-between bg-gray-700 p-3 rounded mb-2">
              <div>
                <p className="font-bold">{c.name}</p>
                <p className="text-sm text-gray-300">{c.date}</p>
              </div>
              <div className="text-sm text-right">
                <p>Rank: <span className="text-yellow-300">{c.rank}</span></p>
                <p className={c.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                  {c.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* TAGS */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-3">🏷️ Favorite Topics</h2>
          <div className="flex flex-wrap gap-3">
            {user.tags.map((tag, i) => (
              <span key={i} className="bg-gray-600 px-3 py-1 rounded-full flex items-center gap-2">
                <Tag size={14} /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* SOLVED HISTORY */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-3">🔥 Problem Solved History</h2>
          <div className="grid grid-cols-14 gap-2">
            {user.solvedHistory.map((day, i) => (
              <div key={i}
                   className={`w-4 h-4 rounded-sm ${day ? 'bg-green-400' : 'bg-gray-600'}`}>
              </div>
            ))}
          </div>
        </div>

        {/* RATING TIMELINE */}
<div className="mt-10">
  <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-3">📈 Rating Timeline</h2>
  <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={user.ratingTimeline}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis stroke="#ccc" domain={['dataMin - 100', 'dataMax + 100']} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }}
          labelStyle={{ color: '#a5b4fc' }}
          itemStyle={{ color: '#22c55e' }}
        />
        <Line
          type="monotone"
          dataKey="rating"
          stroke="#22c55e"
          strokeWidth={3}
          dot={{ r: 5, fill: '#22c55e' }}
          activeDot={{ r: 7, stroke: '#fff', strokeWidth: 2, fill: '#16a34a' }}
        />
      </LineChart>
    </ResponsiveContainer>
    <p className="text-sm text-gray-400 mt-3 text-center">Track your progress over time and aim for your next milestone!</p>
  </div>
        </div>


      </div>
    </div>
  );
};

export default Profile;
