import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogout } from '../../features/auth/authThunk';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(asyncLogout());
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {/* Home */}
        <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
          <span className="bottom-nav-icon">🏠</span>
          <span className="bottom-nav-label">Home</span>
        </Link>

        {/* Leaderboard */}
        <Link to="/leaderboard" className={`bottom-nav-item ${isActive('/leaderboard') ? 'active' : ''}`}>
          <span className="bottom-nav-icon">🏆</span>
          <span className="bottom-nav-label">Leaderboard</span>
        </Link>

        {/* Create Thread (hanya jika user login) */}
        {user && (
          <Link to="/create-thread" className={`bottom-nav-item ${isActive('/create-thread') ? 'active' : ''}`}>
            <span className="bottom-nav-icon">➕</span>
            <span className="bottom-nav-label">New</span>
          </Link>
        )}

        {/* Jika user login: tampilkan logout */}
        {user ? (
          <button onClick={handleLogout} className="bottom-nav-item bottom-nav-logout">
            <span className="bottom-nav-icon">🚪</span>
            <span className="bottom-nav-label">Logout</span>
          </button>
        ) : (
          /* Jika user belum login: tampilkan login & register */
          <>
            <Link to="/login" className={`bottom-nav-item ${isActive('/login') ? 'active' : ''}`}>
              <span className="bottom-nav-icon">🔑</span>
              <span className="bottom-nav-label">Login</span>
            </Link>
            <Link to="/register" className={`bottom-nav-item ${isActive('/register') ? 'active' : ''}`}>
              <span className="bottom-nav-icon">📝</span>
              <span className="bottom-nav-label">Register</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;