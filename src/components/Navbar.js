import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { auth } from '../firebase';

function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white text-xl font-bold">Team Manager</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/team" className="text-gray-300 hover:text-white">Team Management</Link>
          </li>
          <li>
            <Link to="/tasks" className="text-gray-300 hover:text-white">Task Management</Link>
          </li>
          {user ? (
            <>
              <li className="text-gray-300">
                Logged in as: <span className="text-white">{user.email}</span>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
