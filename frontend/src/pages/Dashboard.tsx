import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Users, 
  Activity, 
  Settings,
  BarChart,
  Calendar,
  Clock 
} from 'lucide-react';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const cards = [
    {
      title: 'Start New Assessment',
      icon: <UserPlus size={24} className="text-primary-500" />,
      description: 'Begin a new patient assessment with voice recording',
      path: '/assessment/new',
      color: 'bg-primary-50',
      hoverColor: 'hover:bg-primary-100',
      textColor: 'text-primary-700'
    },
    {
      title: 'Patient Records',
      icon: <Users size={24} className="text-secondary-500" />,
      description: 'View and manage patient profiles and history',
      path: '/patients',
      color: 'bg-secondary-50',
      hoverColor: 'hover:bg-secondary-100',
      textColor: 'text-secondary-700'
    },
    {
      title: 'Diagnostics',
      icon: <Activity size={24} className="text-accent-500" />,
      description: 'Analyze ECG, X-Ray and other diagnostic data',
      path: '/diagnostics',
      color: 'bg-accent-50',
      hoverColor: 'hover:bg-accent-100',
      textColor: 'text-accent-700'
    },
    {
      title: 'Settings',
      icon: <Settings size={24} className="text-neutral-500" />,
      description: 'Configure app preferences and profile settings',
      path: '/settings',
      color: 'bg-neutral-50',
      hoverColor: 'hover:bg-neutral-100',
      textColor: 'text-neutral-700'
    }
  ];

  const StatsCard = ({ title, value, icon, change }: { title: string; value: string; icon: React.ReactNode; change?: { value: string; positive: boolean } }) => (
    <div className="bg-white rounded-card shadow-card p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-neutral-500 text-sm font-medium">{title}</h3>
        <div className="p-2 rounded-full bg-primary-50">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-neutral-800">{value}</p>
      {change && (
        <div className={`flex items-center mt-2 text-sm ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{change.value}</span>
          <span className="ml-1">{change.positive ? 'increase' : 'decrease'}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Welcome back, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-neutral-600 mt-1">
          Here's an overview of your healthcare dashboard
        </p>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-700 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Patients This Week"
            value="24"
            icon={<Users size={18} className="text-primary-500" />}
            change={{ value: "12%", positive: true }}
          />
          <StatsCard
            title="Assessments"
            value="156"
            icon={<BarChart size={18} className="text-secondary-500" />}
            change={{ value: "8%", positive: true }}
          />
          <StatsCard
            title="Upcoming Appointments"
            value="7"
            icon={<Calendar size={18} className="text-accent-500" />}
          />
          <StatsCard
            title="Average Assessment Time"
            value="14m"
            icon={<Clock size={18} className="text-neutral-500" />}
            change={{ value: "5%", positive: false }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              onClick={() => navigate(card.path)}
            >
              <Card interactive className={`h-full ${card.color} ${card.hoverColor} cursor-pointer transition-colors`}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    {card.icon}
                    <h3 className={`ml-2 font-semibold ${card.textColor}`}>{card.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">{card.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Assessments Section */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-700 mb-4">Recent Assessments</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Primary Finding
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                    Maria Garcia
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    April 10, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    Upper respiratory infection
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                    <a href="#" className="hover:text-primary-700">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                    John Smith
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    April 8, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    Angina
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                    <a href="#" className="hover:text-primary-700">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;