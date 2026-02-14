import React from 'react';
import type { FormStep } from '../types';

interface ProgressStepsProps {
  currentStep: FormStep;
  completedSteps: FormStep[];
}

const steps: { id: FormStep; label: string; number: number }[] = [
  { id: 'personal', label: 'Personal Info', number: 1 },
  { id: 'financial', label: 'Financial Info', number: 2 },
  { id: 'loan', label: 'Loan Details', number: 3 },
  { id: 'result', label: 'Results', number: 4 },
];

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  completedSteps,
}) => {
  const getCurrentStepNumber = () => {
    return steps.find(s => s.id === currentStep)?.number || 1;
  };

  const isStepCompleted = (stepId: FormStep) => {
    return completedSteps.includes(stepId);
  };

  const isStepCurrent = (stepId: FormStep) => {
    return currentStep === stepId;
  };

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = isStepCompleted(step.id);
          const isCurrent = isStepCurrent(step.id);
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    transition-all duration-300 z-10
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                      ? 'bg-capitec-red text-white ring-4 ring-capitec-red/20' 
                      : 'bg-capitec-gray-200 text-capitec-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-semibold text-center
                    ${isCurrent ? 'text-capitec-red' : 'text-capitec-gray-600'}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div className="flex-1 h-1 mx-2 relative" style={{ top: '-20px' }}>
                  <div className="w-full h-full bg-capitec-gray-200 rounded-full">
                    <div
                      className={`
                        h-full rounded-full transition-all duration-500
                        ${isCompleted ? 'bg-green-500' : 'bg-capitec-gray-200'}
                      `}
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
