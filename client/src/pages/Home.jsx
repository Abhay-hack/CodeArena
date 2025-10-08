import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }

          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
        `}
      </style>

      {/* Hero Section */}
      <section className="w-full min-h-screen  flex flex-col justify-center items-center py-12 px-6">
        <div className="w-full text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-cyan-400 animate-fadeInDown">
            Welcome to CodeArena
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 animate-fadeInDown delay-200">
            A platform built for coders to practice, compete, and grow. Solve real-world problems, track your performance, and sharpen your competitive edge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fadeInUp delay-400">
            <Link
              to="/problem"
              className="bg-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-700 transition transform hover:scale-105 shadow-cyan-500/50 shadow-md"
            >
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Start Solving
              </span>
            </Link>
            <Link
              to="/contests"
              className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition transform hover:scale-105 shadow-green-500/50 shadow-md"
            >
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Join Contests
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cyan-300 mb-12 animate-fadeIn">
            Built for Coders, by Coders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-8 rounded-xl shadow hover:shadow-cyan-500/30 transition transform hover:-translate-y-2 animate-fadeIn delay-200">
              <div className="text-cyan-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Curated Problems</h3>
              <p className="text-gray-400">
                Tackle problems modeled on real interviews, coding contests, and algorithmic challenges.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 p-8 rounded-xl shadow hover:shadow-green-500/30 transition transform hover:-translate-y-2 animate-fadeIn delay-400">
              <div className="text-green-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Live Contests</h3>
              <p className="text-gray-400">
                Participate in timed contests with live leaderboards. Benchmark yourself against the best.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 p-8 rounded-xl shadow hover:shadow-purple-500/30 transition transform hover:-translate-y-2 animate-fadeIn delay-600">
              <div className="text-purple-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M2 18v2h7v-2a3 3 0 00-5.356-1.857" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Real-Time Judging</h3>
              <p className="text-gray-400">
                Submit your code and get instant verdicts powered by Judge0 – supports C++, Python, Java, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cyan-300 mb-6 animate-fadeIn delay-200">
            Join Thousands of Coders
          </h2>
          <p className="text-xl text-gray-400 mb-10 animate-fadeIn delay-400">
            Whether you're just starting out or prepping for interviews, CodeArena gives you the environment, tools, and challenges to level up.
          </p>
          <div className="flex justify-center animate-fadeInUp delay-600">
            <Link
              to="/problem"
              className="bg-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-700 transition transform hover:scale-105 shadow-md shadow-cyan-500/40"
            >
              Solve Your First Problem
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
