import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FileUp, Activity } from 'lucide-react';
import { mockDiagnosticsApi } from '../../utils/mockApi';
import Loader from '../ui/Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EcgViewerProps {
  patientId?: string;
}

const EcgViewer: React.FC<EcgViewerProps> = ({ patientId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [ecgData, setEcgData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    riskScore?: number;
    observations: string[];
    conclusion: string;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      
      // Generate mock ECG data
      const mockData = [];
      const mockLabels = [];
      for (let i = 0; i < 250; i++) {
        // Create a synthetic ECG pattern
        let value;
        if (i % 50 < 5) {
          value = 0.2 + Math.random() * 0.1;
        } else if (i % 50 === 5) {
          value = 0.5 + Math.random() * 0.2;
        } else if (i % 50 === 6) {
          value = 1.2 + Math.random() * 0.3;
        } else if (i % 50 === 7) {
          value = 0.8 + Math.random() * 0.2;
        } else if (i % 50 === 8) {
          value = 0.4 + Math.random() * 0.1;
        } else if (i % 50 === 9) {
          value = 0.2 + Math.random() * 0.05;
        } else if (i % 50 > 9 && i % 50 < 15) {
          value = -0.1 + Math.random() * 0.15;
        } else {
          value = 0 + Math.random() * 0.1 - 0.05;
        }
        mockData.push(value);
        mockLabels.push(`${i}`);
      }
      
      setEcgData(mockData);
      setLabels(mockLabels);
    }
  };

  const analyzeEcg = async () => {
    if (!ecgData.length) return;
    
    setIsAnalyzing(true);
    try {
      const result = await mockDiagnosticsApi.analyzeDiagnosticData('ecg', { values: ecgData });
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing ECG:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'ECG Reading',
        data: ecgData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time (ms)',
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'mV',
        },
        suggestedMin: -0.5,
        suggestedMax: 1.5,
      },
    },
    animation: {
      duration: 0,
    },
  };

  const renderRiskScore = (score?: number) => {
    if (score === undefined) return null;
    
    let colorClass = 'bg-success-500';
    let label = 'Low Risk';
    
    if (score > 40 && score <= 70) {
      colorClass = 'bg-warning-500';
      label = 'Moderate Risk';
    } else if (score > 70) {
      colorClass = 'bg-error-500';
      label = 'High Risk';
    }
    
    return (
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-500 mb-2">Risk Assessment</h4>
        <div className="w-full bg-neutral-200 rounded-full h-4">
          <div 
            className={`h-4 rounded-full ${colorClass}`} 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-neutral-500">0</span>
          <span className="text-xs font-medium">{label} ({score}%)</span>
          <span className="text-xs text-neutral-500">100</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">ECG Analysis</h2>
        
        <div className="mb-6 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg p-6">
          <label className="flex flex-col items-center cursor-pointer">
            <FileUp className="w-12 h-12 text-neutral-400 mb-2" />
            <span className="text-neutral-600 font-medium">
              {file ? file.name : 'Upload ECG file (.csv)'}
            </span>
            <span className="text-neutral-400 text-sm mt-1">
              Click to browse or drag & drop
            </span>
            <input 
              type="file" 
              accept=".csv,.txt,.dat" 
              className="hidden"
              onChange={handleFileUpload}
            />
            {file && (
              <Button 
                className="mt-4"
                size="sm"
                onClick={() => setFile(null)}
                variant="outline"
              >
                Remove file
              </Button>
            )}
          </label>
        </div>
        
        {ecgData.length > 0 && (
          <Card className="mb-6">
            <div className="flex items-center mb-4">
              <Activity className="w-5 h-5 text-primary-500 mr-2" />
              <h3 className="text-lg font-medium">ECG Reading</h3>
            </div>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                onClick={analyzeEcg}
                disabled={isAnalyzing}
                isLoading={isAnalyzing}
              >
                Analyze ECG
              </Button>
            </div>
          </Card>
        )}
        
        {isAnalyzing && (
          <div className="flex justify-center my-8">
            <Loader size="lg" text="Analyzing ECG data..." />
          </div>
        )}
        
        {analysis && !isAnalyzing && (
          <Card>
            <h3 className="text-lg font-medium mb-4">Analysis Results</h3>
            
            {renderRiskScore(analysis.riskScore)}
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Observations</h4>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.observations.map((observation, index) => (
                  <li key={index} className="text-neutral-700">{observation}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Conclusion</h4>
              <p className="text-neutral-700">{analysis.conclusion}</p>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline">
                Download Report
              </Button>
              <Button>
                Refer to Specialist
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EcgViewer;