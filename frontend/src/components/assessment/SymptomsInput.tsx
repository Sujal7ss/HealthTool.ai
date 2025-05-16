import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VoiceRecorder from '../ui/VoiceRecorder';
import { VoiceRecognitionResult } from '../../types';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface SymptomsInputProps {
  onNext: (symptomsText: string, language: string) => void;
}

const SymptomsInput: React.FC<SymptomsInputProps> = ({ onNext }) => {
  const [recordingResult, setRecordingResult] = useState<VoiceRecognitionResult | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  const handleRecordingComplete = (result: VoiceRecognitionResult) => {
    setRecordingResult(result);
    setManualInput(result.text);
  };

  const handleSubmit = () => {
    const symptomsText = manualInput || (recordingResult ? recordingResult.text : '');
    const language = recordingResult ? recordingResult.language : 'english';
    
    if (symptomsText.trim()) {
      onNext(symptomsText, language);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">
          Patient Symptoms
        </h2>
        <p className="text-neutral-600">
          Record or type the patient's symptoms to begin the assessment
        </p>
      </motion.div>

      {!showTextInput && (
        <motion.div variants={itemVariants} className="mb-8">
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
        </motion.div>
      )}

      {(recordingResult || showTextInput) && (
        <motion.div
          variants={itemVariants}
          className="mb-6"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {recordingResult ? 'Edit symptoms if needed:' : 'Enter symptoms:'}
          </label>
          <textarea
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="w-full p-3 border border-neutral-300 rounded-lg min-h-[150px] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Describe the symptoms in detail..."
          />
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="flex justify-between">
        {!showTextInput && !recordingResult && (
          <Button 
            variant="outline" 
            onClick={() => setShowTextInput(true)}
          >
            Type symptoms instead
          </Button>
        )}
        
        {(showTextInput || recordingResult) && (
          <Button 
            onClick={handleSubmit}
            disabled={!manualInput.trim()}
            rightIcon={<ArrowRight size={18} />}
          >
            Continue to Analysis
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SymptomsInput;