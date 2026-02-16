import  { VALIDATION_LIMITS } from "../constants.ts";
import type { FinancialInfo, PersonalInfo } from "../types";

interface ValidationError {
  field: string;
  message: string;
}

export const validatePersonalInfo = (data: Partial<PersonalInfo>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.age) {
    errors.push({ field: 'age', message: 'Age is required' });
  } else if (data.age < VALIDATION_LIMITS.AGE.MIN || data.age > VALIDATION_LIMITS.AGE.MAX) {
    errors.push({
      field: 'age',
      message: `Age must be between ${VALIDATION_LIMITS.AGE.MIN} and ${VALIDATION_LIMITS.AGE.MAX}`,
    });
  }

  if (!data.employmentStatus) {
    errors.push({ field: 'employmentStatus', message: 'Employment status is required' });
  }

  if (!data.employmentDuration) {
    errors.push({ field: 'employmentDuration', message: 'Employment duration is required' });
  } else if (data.employmentDuration < VALIDATION_LIMITS.EMPLOYMENT_DURATION.MIN) {
    errors.push({
      field: 'employmentDuration',
      message: `Minimum ${VALIDATION_LIMITS.EMPLOYMENT_DURATION.MIN} months employment required`,
    });
  }

  return errors;
};

export const validateFinancialInfo = (data: Partial<FinancialInfo>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.monthlyIncome) {
    errors.push({ field: 'monthlyIncome', message: 'Monthly income is required' });
  } else if (data.monthlyIncome < VALIDATION_LIMITS.MONTHLY_INCOME.MIN) {
    errors.push({
      field: 'monthlyIncome',
      message: `Minimum monthly income of R${VALIDATION_LIMITS.MONTHLY_INCOME.MIN.toLocaleString()} required`,
    });
  }

  if (data.monthlyExpenses === undefined || data.monthlyExpenses < 0) {
    errors.push({ field: 'monthlyExpenses', message: 'Monthly expenses are required' });
  }

  if (data.existingDebt === undefined || data.existingDebt < 0) {
    errors.push({ field: 'existingDebt', message: 'Existing debt is required' });
  }

  if (data.creditScore !== undefined) {
    if (
      data.creditScore < VALIDATION_LIMITS.CREDIT_SCORE.MIN ||
      data.creditScore > VALIDATION_LIMITS.CREDIT_SCORE.MAX
    ) {
      errors.push({
        field: 'creditScore',
        message: `Credit score must be between ${VALIDATION_LIMITS.CREDIT_SCORE.MIN} and ${VALIDATION_LIMITS.CREDIT_SCORE.MAX}`,
      });
    }
  }

  return errors;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+27|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const sanitizeNumber = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};

export const sanitizeInput = (value: string): string => {
  return value.trim().replace(/[<>]/g, '');
};