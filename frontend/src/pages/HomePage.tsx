import React from 'react';
import { ProgressSteps } from '../components/ProgressSteps';
import { PersonalInfoForm } from '../features/PersonalInfoForm';
import { FinancialInfoForm } from '../features/FinancialInfoForm';
import { LoanDetailsForm } from '../features/LoanDetailsForm';
import { EligibilityResults } from '../features/EligibillityResponse';
import { loanApi } from '../api/api';
import type {
  FormStep,
  PersonalInfo,
  FinancialInfo,
  LoanDetails,
  EligibilityRequest,
  EligibilityResponse,
} from '../types';

export const HomePage: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<FormStep>('personal');
  const [completedSteps, setCompletedSteps] = React.useState<FormStep[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [personalInfo, setPersonalInfo] = React.useState<Partial<PersonalInfo>>({});
  const [financialInfo, setFinancialInfo] = React.useState<Partial<FinancialInfo>>({});
  const [loanDetails, setLoanDetails] = React.useState<Partial<LoanDetails>>({});
  const [eligibilityResult, setEligibilityResult] = React.useState<EligibilityResponse | null>(null);

  const handlePersonalInfoNext = (data: PersonalInfo) => {
    setPersonalInfo(data);
    setCompletedSteps([...completedSteps, 'personal']);
    setCurrentStep('financial');
  };

  const handleFinancialInfoNext = (data: FinancialInfo) => {
    setFinancialInfo(data);
    setCompletedSteps([...completedSteps.filter(s => s !== 'financial'), 'financial']);
    setCurrentStep('loan');
  };

  const handleLoanDetailsNext = async (data: LoanDetails) => {
    setLoanDetails(data);
    setCompletedSteps([...completedSteps.filter(s => s !== 'loan'), 'loan']);
    setLoading(true);
    setError(null);

    try {
      const request: EligibilityRequest = {
        personalInfo: personalInfo as PersonalInfo,
        financialInfo: financialInfo as FinancialInfo,
        loanDetails: data,
      };

      const result = await loanApi.checkEligibility(request);
      setEligibilityResult(result);
      setCurrentStep('result');
    } catch (err) {
      setError('Failed to check eligibility. Please try again.');
      console.error('Error checking eligibility:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('personal');
    setCompletedSteps([]);
    setPersonalInfo({});
    setFinancialInfo({});
    setLoanDetails({});
    setEligibilityResult(null);
    setError(null);
  };

  return (
    <>
      {/* Progress Steps */}
      {currentStep !== 'result' && (
        <ProgressSteps currentStep={currentStep} completedSteps={completedSteps} />
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-capitec-red rounded-lg animate-shake">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-capitec-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-capitec-red font-semibold">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-capitec-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-capitec-gray-600 font-semibold">Checking your eligibility...</p>
          </div>
        </div>
      )}

      {/* Form Steps */}
      {!loading && (
        <>
          {currentStep === 'personal' && (
            <PersonalInfoForm
              data={personalInfo}
              onNext={handlePersonalInfoNext}
            />
          )}

          {currentStep === 'financial' && (
            <FinancialInfoForm
              data={financialInfo}
              onNext={handleFinancialInfoNext}
              onBack={() => setCurrentStep('personal')}
            />
          )}

          {currentStep === 'loan' && (
            <LoanDetailsForm
              data={loanDetails}
              onNext={handleLoanDetailsNext}
              onBack={() => setCurrentStep('financial')}
            />
          )}

          {currentStep === 'result' && eligibilityResult && (
            <EligibilityResults
              result={eligibilityResult}
              onStartOver={handleStartOver}
            />
          )}
        </>
      )}
    </>
  );
};
