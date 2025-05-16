export interface User {
  id: string;
  name: string;
  role: 'doctor' | 'assistant';
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  history?: Assessment[];
}

export interface Assessment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  symptoms: string[];
  possibleCauses: string[];
  suggestedTests: string[];
  treatmentSuggestions?: string[];
  notes?: string;
}

export interface DiagnosticResult {
  id: string;
  patientId: string;
  type: 'ecg' | 'x-ray' | 'ct-scan';
  date: string;
  data: any; // Specific to each diagnostic type
  analysis: {
    riskScore?: number;
    observations: string[];
    conclusion: string;
  };
}

export interface VoiceRecognitionResult {
  text: string;
  language: string;
  confidence: number;
}