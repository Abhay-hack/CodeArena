// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Problems', path: '/problem' },
    { name: 'Contests', path: '/contests' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-gray-800 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-cyan-400 tracking-tight hover:text-cyan-300 transition">
          CodeArena
        </Link>
        <ul className="flex gap-6 text-sm font-semibold text-gray-300">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`relative hover:text-cyan-400 transition-all duration-200 ${
                  pathname === item.path ? 'text-cyan-400' : ''
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-cyan-400 rounded"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
