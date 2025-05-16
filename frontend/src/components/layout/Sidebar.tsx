import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  UserPlus, 
  Users, 
  Activity, 
  Settings, 
  LogOut,
  X 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: '-100%',
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const navItems = [
    { icon: <Home size={20} />, text: 'Dashboard', path: '/' },
    { icon: <UserPlus size={20} />, text: 'New Assessment', path: '/assessment/new' },
    { icon: <Users size={20} />, text: 'Patient Records', path: '/patients' },
    { icon: <Activity size={20} />, text: 'Diagnostics', path: '/diagnostics' },
    { icon: <Settings size={20} />, text: 'Settings', path: '/settings' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-30 
                  lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)]`}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        {/* Mobile close button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} className="text-neutral-600" />
          </button>
        </div>
        
        {/* Navigation links */}
        <nav className="px-4 py-6">
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="absolute bottom-8 w-full px-4">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;