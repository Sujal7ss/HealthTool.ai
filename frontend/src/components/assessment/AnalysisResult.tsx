import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit2, X } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface AnalysisResultProps {
  symptoms: string[];
  possibleCauses: string[];
  suggestedTests: string[];
  treatmentSuggestions: string[];
  onSave: (editedData: {
    symptoms: string[];
    possibleCauses: string[];
    suggestedTests: string[];
    treatmentSuggestions: string[];
  }) => void;
  onContinue: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  symptoms,
  possibleCauses,
  suggestedTests,
  treatmentSuggestions,
  onSave,
  onContinue
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSymptoms, setEditedSymptoms] = useState<string[]>(symptoms);
  const [editedCauses, setEditedCauses] = useState<string[]>(possibleCauses);
  const [editedTests, setEditedTests] = useState<string[]>(suggestedTests);
  const [editedTreatments, setEditedTreatments] = useState<string[]>(treatmentSuggestions);

  const handleSaveEdit = () => {
    onSave({
      symptoms: editedSymptoms,
      possibleCauses: editedCauses,
      suggestedTests: editedTests,
      treatmentSuggestions: editedTreatments
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedSymptoms(symptoms);
    setEditedCauses(possibleCauses);
    setEditedTests(suggestedTests);
    setEditedTreatments(treatmentSuggestions);
    setIsEditing(false);
  };

  const updateListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => [...prev, '']);
  };

  const removeListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const ListSection = ({ 
    title, 
    items, 
    setItems, 
    color = 'primary',
    icon 
  }: { 
    title: string; 
    items: string[]; 
    setItems?: React.Dispatch<React.SetStateAction<string[]>>;
    color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'error';
    icon?: React.ReactNode;
  }) => {
    const colorClasses = {
      primary: 'bg-primary-50 border-primary-200 text-primary-800',
      secondary: 'bg-secondary-50 border-secondary-200 text-secondary-800',
      accent: 'bg-accent-50 border-accent-200 text-accent-800',
      warning: 'bg-amber-50 border-amber-200 text-amber-800',
      error: 'bg-red-50 border-red-200 text-red-800'
    };

    return (
      <div className="mb-6">
        <div className="flex items-center mb-3">
          {icon && <span className="mr-2">{icon}</span>}
          <h3 className="text-lg font-medium text-neutral-800">{title}</h3>
        </div>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className={`py-2 px-3 rounded-md ${colorClasses[color]} border`}>
              {isEditing ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => setItems && updateListItem(setItems, index, e.target.value)}
                    className="flex-1 bg-white p-1 rounded border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <button 
                    onClick={() => setItems && removeListItem(setItems, index)}
                    className="ml-2 p-1 text-neutral-500 hover:text-error-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                item
              )}
            </li>
          ))}
          {isEditing && setItems && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => addListItem(setItems)}
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              + Add item
            </motion.button>
          )}
        </ul>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Assessment Results</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            leftIcon={<Edit2 size={16} />}
            onClick={() => setIsEditing(true)}
          >
            Edit Summary
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              leftIcon={<X size={16} />}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
            <Button
              leftIcon={<Check size={16} />}
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ListSection 
            title="Symptoms" 
            items={isEditing ? editedSymptoms : symptoms} 
            setItems={isEditing ? setEditedSymptoms : undefined}
            color="primary"
          />
          
          <ListSection 
            title="Possible Causes" 
            items={isEditing ? editedCauses : possibleCauses} 
            setItems={isEditing ? setEditedCauses : undefined}
            color="accent"
          />
          
          <ListSection 
            title="Suggested Tests" 
            items={isEditing ? editedTests : suggestedTests} 
            setItems={isEditing ? setEditedTests : undefined}
            color="secondary"
          />
          
          <ListSection 
            title="Treatment Suggestions" 
            items={isEditing ? editedTreatments : treatmentSuggestions} 
            setItems={isEditing ? setEditedTreatments : undefined}
            color="warning"
          />
        </div>
      </Card>

      {!isEditing && (
        <div className="flex justify-end space-x-4">
          <Button onClick={onContinue}>
            Save & Continue
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default AnalysisResult;