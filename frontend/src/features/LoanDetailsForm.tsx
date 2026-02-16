import React from 'react';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import type { LoanDetails } from '../types';
import { formatCurrency } from '../utils/formatting';
import { LOAN_PURPOSE_OPTIONS } from '../constants.ts';

interface LoanDetailsFormProps {
  data: Partial<LoanDetails>;
  onNext: (data: LoanDetails) => void;
  onBack: () => void;
}

export const LoanDetailsForm: React.FC<LoanDetailsFormProps> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = React.useState<Partial<LoanDetails>>(data);
  const [errors, setErrors] = React.useState<Partial<Record<keyof LoanDetails, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoanDetails, string>> = {};

    if (!formData.requestedAmount || formData.requestedAmount < 5000 || formData.requestedAmount > 300000) {
      newErrors.requestedAmount = 'Loan amount must be between R5,000 and R300,000';
    }

    if (!formData.loanTerm || formData.loanTerm < 6 || formData.loanTerm > 60) {
      newErrors.loanTerm = 'Loan term must be between 6 and 60 months';
    }

    if (!formData.loanPurpose) {
      newErrors.loanPurpose = 'Please select the purpose of the loan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData as LoanDetails);
    }
  };

  // Estimate monthly payment (rough calculation at 12.5%)
  const estimatedMonthlyPayment = formData.requestedAmount && formData.loanTerm
    ? (formData.requestedAmount * (0.125 / 12) * Math.pow(1 + 0.125 / 12, formData.loanTerm)) /
      (Math.pow(1 + 0.125 / 12, formData.loanTerm) - 1)
    : 0;

  return (
    <Card
      title="Loan Details"
      subtitle="Tell us about the loan you need"
      className="animate-slide-up"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Requested Loan Amount"
          type="number"
          required
          min={5000}
          max={300000}
          step={1000}
          value={formData.requestedAmount || ''}
          onChange={(e) => setFormData({ ...formData, requestedAmount: parseFloat(e.target.value) })}
          error={errors.requestedAmount}
          helperText="Amount between R5,000 and R300,000"
          icon={
            <span className="text-capitec-gray-500 font-semibold">R</span>
          }
        />

        <Input
          label="Loan Term (months)"
          type="number"
          required
          min={6}
          max={60}
          value={formData.loanTerm || ''}
          onChange={(e) => setFormData({ ...formData, loanTerm: parseInt(e.target.value) })}
          error={errors.loanTerm}
          helperText="How long do you need to repay? (6-60 months)"
        />

        <Select
          label="Loan Purpose"
          required
          options={LOAN_PURPOSE_OPTIONS}
          value={formData.loanPurpose || ''}
          onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value as LoanDetails['loanPurpose'] })}
          error={errors.loanPurpose}
        />

        {formData.requestedAmount && formData.loanTerm && (
          <div className="p-4 rounded-lg bg-capitec-blue/10 border-2 border-capitec-blue/20">
            <p className="text-sm font-semibold text-capitec-gray-700 mb-1">
              Estimated Monthly Payment
            </p>
            <p className="text-2xl font-bold text-capitec-blue">
              {formatCurrency(estimatedMonthlyPayment)}
            </p>
            <p className="text-xs text-capitec-gray-600 mt-1">
              Based on an estimated 12.5% interest rate
            </p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} fullWidth size="lg">
            Back
          </Button>
          <Button type="submit" fullWidth size="lg">
            Check Eligibility
          </Button>
        </div>
      </form>
    </Card>
  );
};
