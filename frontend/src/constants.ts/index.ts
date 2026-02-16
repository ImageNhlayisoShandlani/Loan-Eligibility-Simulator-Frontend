//API config
export const API_CONFI = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    TIMEOUT: 1000
} as const;

// Employement status options
export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'retired', label: 'Retired' },
];

//Loan purpose options
export const LOAN_PURPOSE_OPTIONS = [
  { value: 'debt_consolidation', label: 'Debt Consolidation' },
  { value: 'home_improvement', label: 'Home Improvement' },
  { value: 'education', label: 'Education' },
  { value: 'medical', label: 'Medical Expenses' },
  { value: 'new_vehicle', label: 'New Vehicle' },
  { value: 'used_vehicle', label: 'Used Vehicle' },
  { value: 'other', label: 'Other' },
];

//Validation form constants
export const VALIDATION_LIMITS = {
  AGE: {
    MIN: 18,
    MAX: 65,
  },
  EMPLOYMENT_DURATION: {
    MIN: 3, // months
  },
  MONTHLY_INCOME: {
    MIN: 5000,
  },
  CREDIT_SCORE: {
    MIN: 300,
    MAX: 850,
  },
  LOAN_AMOUNT: {
    MIN: 5000,
    MAX: 300000,
  },
  LOAN_TERM: {
    MIN: 6,
    MAX: 60,
  },
} as const;

//Chart UI colors
export const CHART_COLORS = {
  PRIMARY: '#E2231A',
  SECONDARY: '#003E7E',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#3b82f6',
} as const;

//Form steps constants
export const FORM_STEPS = [
  { id: 'personal', label: 'Personal Info', number: 1 },
  { id: 'financial', label: 'Financial Info', number: 2 },
  { id: 'loan', label: 'Loan Details', number: 3 },
  { id: 'result', label: 'Results', number: 4 },
] as const;

//Error messages responses
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  ELIGIBILITY_CHECK: 'Failed to check eligibility. Please try again.',
} as const;

//Success messages responses
export const SUCCESS_MESSAGES = {
  ELIGIBLE: 'Congratulations! You\'re eligible for a loan.',
  NOT_ELIGIBLE: 'Unfortunately, you don\'t meet the eligibility criteria at this time.',
} as const;