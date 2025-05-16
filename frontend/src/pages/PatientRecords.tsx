import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, ChevronRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { Patient } from '../types';
import { mockPatientsApi } from '../utils/mockApi';

const PatientRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await mockPatientsApi.getPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Patient Records</h1>
          <p className="text-neutral-600">Manage your patient profiles and history</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/assessment/new">
            <Button leftIcon={<UserPlus size={18} />}>
              New Patient
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader size="lg" text="Loading patients..." />
        </div>
      ) : (
        <div>
          {filteredPatients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500">No patients found</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredPatients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Card interactive className="hover:bg-neutral-50">
                    <Link to={`/patients/${patient.id}`} className="block">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-neutral-800">{patient.name}</h3>
                          <div className="mt-1 flex items-center text-sm text-neutral-500">
                            <span className="mr-4">{patient.age} years</span>
                            <span className="capitalize">{patient.gender}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="p-2 text-neutral-400 hover:text-error-500 mr-2"
                            aria-label="Delete patient"
                            onClick={(e) => {
                              e.preventDefault();
                              // Delete functionality would go here
                              alert(`Delete ${patient.name}`);
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                          <ChevronRight size={20} className="text-neutral-400" />
                        </div>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientRecords;