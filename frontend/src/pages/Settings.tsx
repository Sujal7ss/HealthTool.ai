import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Globe, 
  Bell, 
  Lock, 
  Eye, 
  Volume2, 
  Moon, 
  Sun,
  Check 
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

enum SettingsTab {
  PROFILE = 'profile',
  PREFERENCES = 'preferences',
  ACCESSIBILITY = 'accessibility',
  SECURITY = 'security'
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.PROFILE);
  const { user } = useAuth();
  
  // Mock settings state
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [voicePrompts, setVoicePrompts] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  
  const tabs = [
    { id: SettingsTab.PROFILE, label: 'Profile', icon: <User size={20} /> },
    { id: SettingsTab.PREFERENCES, label: 'Preferences', icon: <Globe size={20} /> },
    { id: SettingsTab.ACCESSIBILITY, label: 'Accessibility', icon: <Eye size={20} /> },
    { id: SettingsTab.SECURITY, label: 'Security', icon: <Lock size={20} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case SettingsTab.PROFILE:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Your Profile</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="flex flex-col items-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-32 w-32 rounded-full object-cover border-4 border-primary-100"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-full bg-primary-100 flex items-center justify-center">
                      <User size={64} className="text-primary-500" />
                    </div>
                  )}
                  <Button className="mt-4" variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-neutral-300 rounded-md"
                    defaultValue={user?.name}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-neutral-300 rounded-md"
                    defaultValue="doctor@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="role">
                    Role
                  </label>
                  <select
                    id="role"
                    className="w-full p-2 border border-neutral-300 rounded-md"
                    defaultValue={user?.role}
                  >
                    <option value="doctor">Doctor</option>
                    <option value="assistant">Medical Assistant</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="specialty">
                    Specialty
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    className="w-full p-2 border border-neutral-300 rounded-md"
                    placeholder="E.g. Cardiology, General Practice"
                  />
                </div>
                
                <div className="pt-4">
                  <Button>Save Profile</Button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case SettingsTab.PREFERENCES:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="language">
                  Default Language
                </label>
                <select
                  id="language"
                  className="w-full p-2 border border-neutral-300 rounded-md"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="hindi">Hindi</option>
                  <option value="arabic">Arabic</option>
                </select>
                <p className="mt-1 text-sm text-neutral-500">
                  The default language for the voice recognition and interface
                </p>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                <div className="flex items-center">
                  <Bell size={20} className="text-neutral-500 mr-3" />
                  <div>
                    <h3 className="text-base font-medium text-neutral-800">Notifications</h3>
                    <p className="text-sm text-neutral-500">Receive alerts for new assessments and results</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                      notifications ? 'bg-primary-500' : 'bg-neutral-200'
                    }`}
                    role="switch"
                    aria-checked={notifications}
                    onClick={() => setNotifications(!notifications)}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        notifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                <div className="flex items-center">
                  {darkMode ? (
                    <Moon size={20} className="text-neutral-500 mr-3" />
                  ) : (
                    <Sun size={20} className="text-neutral-500 mr-3" />
                  )}
                  <div>
                    <h3 className="text-base font-medium text-neutral-800">Dark Mode</h3>
                    <p className="text-sm text-neutral-500">Switch between light and dark themes</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                      darkMode ? 'bg-primary-500' : 'bg-neutral-200'
                    }`}
                    role="switch"
                    aria-checked={darkMode}
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        darkMode ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Save Preferences</Button>
              </div>
            </div>
          </div>
        );
      
      case SettingsTab.ACCESSIBILITY:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Accessibility Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="fontSize">
                  Font Size
                </label>
                <select
                  id="fontSize"
                  className="w-full p-2 border border-neutral-300 rounded-md"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">X-Large</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                <div className="flex items-center">
                  <Volume2 size={20} className="text-neutral-500 mr-3" />
                  <div>
                    <h3 className="text-base font-medium text-neutral-800">Voice Prompts</h3>
                    <p className="text-sm text-neutral-500">Enable spoken guidance for application navigation</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                      voicePrompts ? 'bg-primary-500' : 'bg-neutral-200'
                    }`}
                    role="switch"
                    aria-checked={voicePrompts}
                    onClick={() => setVoicePrompts(!voicePrompts)}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        voicePrompts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                <div className="flex items-center">
                  <Eye size={20} className="text-neutral-500 mr-3" />
                  <div>
                    <h3 className="text-base font-medium text-neutral-800">High Contrast Mode</h3>
                    <p className="text-sm text-neutral-500">Increase visibility with enhanced color contrast</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                      highContrast ? 'bg-primary-500' : 'bg-neutral-200'
                    }`}
                    role="switch"
                    aria-checked={highContrast}
                    onClick={() => setHighContrast(!highContrast)}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        highContrast ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Save Accessibility Settings</Button>
              </div>
            </div>
          </div>
        );
      
      case SettingsTab.SECURITY:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="currentPassword">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full p-2 border border-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full p-2 border border-neutral-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full p-2 border border-neutral-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Update Password</Button>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <p className="text-neutral-600 mb-4">Add an extra layer of security to your account</p>
                
                <Button variant="outline">Enable Two-Factor Authentication</Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
        <p className="text-neutral-600">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Card>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-3 py-3 text-sm font-medium rounded-md w-full text-left
                    ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }
                  `}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto bg-primary-100 p-1 rounded-full"
                    >
                      <Check size={14} className="text-primary-600" />
                    </motion.span>
                  )}
                </button>
              ))}
            </nav>
          </Card>
        </div>
        
        <div className="md:w-3/4">
          <Card>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;