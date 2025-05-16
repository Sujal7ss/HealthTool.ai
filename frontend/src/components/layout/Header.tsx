import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Heart, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-primary-600" />
          </button>
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-primary-500 mr-2" />
            <span className="text-xl font-bold text-primary-700">HealthAssist</span>
          </Link>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-neutral-600" />
            </button>
            
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-primary-100"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <User size={20} className="text-primary-600" />
                </div>
              )}
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;