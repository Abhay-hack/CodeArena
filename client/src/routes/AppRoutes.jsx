import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Problems from '../pages/Problems';
import ProblemDetail from '../pages/ProblemDetail';
// import Submit from '../pages/Submit';
import Profile from '../pages/Profile';
import Contests from '../pages/Contests';
import Leaderboard from '../pages/Leaderboard';
// import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problem" element={<Problems />} />
      <Route path="/problem/:id" element={<ProblemDetail />} />
      {/* <Route path="/submit/:id" element={<Submit />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/contests" element={<Contests />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};

export default AppRoutes;
