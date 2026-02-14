// Applier personal information
export interface PersonalInfo{
    age: number;
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired';
  employmentDuration: number;
}

//Financial information of the applier
export interface FinancialInfo{
    monthlyIncome: number;
  monthlyExpenses: number;
  existingDebt: number;
  creditScore?: number;
}

//Financial status of the applier
export interface LoanDetails {
  requestedAmount: number;
  loanTerm: number;
  loanPurpose: 'debt_consolidation' | 'home_improvement' | 'education' | 'medical' | 'new_vehicle' | 'used_vehicle' | 'other';
}

//Full eligibility request from needed types
export interface EligibilityRequest {
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  loanDetails: LoanDetails;
}

//Eligibility request body
export interface EligibilityResult {
  isEligible: boolean;
  approvalLikelihood: number;
  riskCategory: 'low' | 'medium' | 'high';
  decisionReason: string;
}

//Recommendation body based on calculations
export interface RecommendedLoan {
  maxAmount: number;
  recommendedAmount: number;
  interestRate: number;
  monthlyPayment: number;
  totalRepayment: number;
}

// Analyse affodability type based on data
export interface AffordabilityAnalysis {
  disposableIncome: number;
  debtToIncomeRatio: number;
  loanToIncomeRatio: number;
  affordabilityScore: 'poor' | 'fair' | 'good' | 'excellent';
}

// Resposnse type for eligibility analysis
export interface EligibilityResponse {
  eligibilityResult: EligibilityResult;
  recommendedLoan: RecommendedLoan;
  affordabilityAnalysis: AffordabilityAnalysis;
}

//Loan type 
export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  interestRateRange: {
    min: number;
    max: number;
  };
  purposes: string[];
}

// Form step type for frontend
export type FormStep = 'personal' | 'financial' | 'loan' | 'result';