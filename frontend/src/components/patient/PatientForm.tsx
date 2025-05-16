import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Patient } from '../../types';
import { Users } from 'lucide-react';

interface PatientFormProps {
  onSubmit: (patientData: Omit<Patient, 'id'>) => void;
  existingPatient?: Patient;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, existingPatient }) => {
  const [name, setName] = useState(existingPatient?.name || '');
  const [age, setAge] = useState(existingPatient?.age || '');
  const [gender, setGender] = useState(existingPatient?.gender || 'male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      name,
      age: Number(age),
      gender: gender as 'male' | 'female' | 'other'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto"
    >
      <div className="flex items-center mb-6">
        <Users className="w-6 h-6 text-primary-500 mr-2" />
        <h2 className="text-xl font-semibold text-neutral-800">
          {existingPatient ? 'Edit Patient' : 'Patient Information'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter patient's full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-neutral-700 mb-1">
            Age
          </label>
          <input
            id="age"
            type="number"
            min={0}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter patient's age"
            required
          />
        </div>
        
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-neutral-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="pt-4">
          <Button type="submit" fullWidth>
            {existingPatient ? 'Update Patient' : 'Continue'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PatientForm;