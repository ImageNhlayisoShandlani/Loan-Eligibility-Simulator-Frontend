import { useState } from "react";
import type { FormStep } from "../types";

interface UseMultiStepFormReturn<T> {
  currentStep: FormStep;
  completedSteps: FormStep[];
  formData: T;
  setFormData: (data: T) => void;
  updateFormData: (partialData: Partial<T>) => void;
  goToNextStep: (nextStep: FormStep) => void;
  goToPreviousStep: (previousStep: FormStep) => void;
  markStepComplete: (step: FormStep) => void;
  resetForm: () => void;
}

export function useMultiStepForm<T extends object>(
  initialData: T,
  initialStep: FormStep = 'personal'
): UseMultiStepFormReturn<T> {
  const [currentStep, setCurrentStep] = useState<FormStep>(initialStep);
  const [completedSteps, setCompletedSteps] = useState<FormStep[]>([]);
  const [formData, setFormData] = useState<T>(initialData);

  const updateFormData = (partialData: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...partialData }));
  };

  const goToNextStep = (nextStep: FormStep) => {
    setCurrentStep(nextStep);
  };

  const goToPreviousStep = (previousStep: FormStep) => {
    setCurrentStep(previousStep);
  };

  const markStepComplete = (step: FormStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const resetForm = () => {
    setCurrentStep(initialStep);
    setCompletedSteps([]);
    setFormData(initialData);
  };

  return {
    currentStep,
    completedSteps,
    formData,
    setFormData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    markStepComplete,
    resetForm,
  };
}