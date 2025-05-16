import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  FileImage, 
  FileSpreadsheet,
  FileBarChart 
} from 'lucide-react';
import EcgViewer from '../components/diagnostics/EcgViewer';
import Card from '../components/ui/Card';

type DiagnosticTab = 'ecg' | 'xray' | 'ctscan';

const Diagnostics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DiagnosticTab>('ecg');

  const tabs = [
    { id: 'ecg', label: 'ECG', icon: <Activity size={18} /> },
    { id: 'xray', label: 'X-Ray', icon: <FileImage size={18} /> },
    { id: 'ctscan', label: 'CT Scan', icon: <FileBarChart size={18} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ecg':
        return <EcgViewer />;
      case 'xray':
        return (
          <div className="text-center py-12">
            <FileImage size={64} className="mx-auto text-neutral-300 mb-4" />
            <h3 className="text-xl font-medium text-neutral-700 mb-2">X-Ray Analysis</h3>
            <p className="text-neutral-500 max-w-md mx-auto">
              This feature is coming soon. You'll be able to upload and analyze X-Ray images.
            </p>
          </div>
        );
      case 'ctscan':
        return (
          <div className="text-center py-12">
            <FileBarChart size={64} className="mx-auto text-neutral-300 mb-4" />
            <h3 className="text-xl font-medium text-neutral-700 mb-2">CT Scan Analysis</h3>
            <p className="text-neutral-500 max-w-md mx-auto">
              This feature is coming soon. You'll be able to upload and analyze CT Scan data.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">
          Diagnostic Tools
        </h1>
        <p className="text-neutral-600">
          Upload and analyze diagnostic data from various medical devices
        </p>
      </div>

      <Card>
        <div className="border-b border-neutral-200 mb-6">
          <nav className="-mb-px flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DiagnosticTab)}
                className={`
                  flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

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
  );
};

export default Diagnostics;