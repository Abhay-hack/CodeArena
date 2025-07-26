// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-[#1e1e1e] shadow-md">
    <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-400">CodeArena</Link>
      <ul className="flex gap-6 text-sm font-semibold">
        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
        <li><Link to="/problem" className="hover:text-blue-400">Problems</Link></li>
        <li><Link to="/contests" className="hover:text-blue-400">Contests</Link></li>
        <li><Link to="/leaderboard" className="hover:text-blue-400">Leaderboard</Link></li>
        <li><Link to="/profile" className="hover:text-blue-400">Profile</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
