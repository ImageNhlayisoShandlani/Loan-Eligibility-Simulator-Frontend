import React from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import type { FinancialInfo } from '../types';
import { formatCurrency } from '../utils/formatting';

interface FinancialInfoFormProps {
  data: Partial<FinancialInfo>;
  onNext: (data: FinancialInfo) => void;
  onBack: () => void;
}

export const FinancialInfoForm: React.FC<FinancialInfoFormProps> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = React.useState<Partial<FinancialInfo>>(data);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FinancialInfo, string>>>({});

  const disposableIncome = (formData.monthlyIncome || 0) - (formData.monthlyExpenses || 0);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FinancialInfo, string>> = {};

    if (!formData.monthlyIncome || formData.monthlyIncome < 5000) {
      newErrors.monthlyIncome = 'Minimum monthly income of R5,000 required';
    }

    if (formData.monthlyExpenses === undefined || formData.monthlyExpenses < 0) {
      newErrors.monthlyExpenses = 'Please enter your monthly expenses';
    }

    if (formData.existingDebt === undefined || formData.existingDebt < 0) {
      newErrors.existingDebt = 'Please enter your existing debt';
    }

    if (formData.creditScore && (formData.creditScore < 300 || formData.creditScore > 850)) {
      newErrors.creditScore = 'Credit score must be between 300 and 850';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData as FinancialInfo);
    }
  };

  return (
    <Card
      title="Financial Information"
      subtitle="Help us understand your financial situation"
      className="animate-slide-up"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Monthly Income"
          type="number"
          required
          min={0}
          step={100}
          value={formData.monthlyIncome || ''}
          onChange={(e) => setFormData({ ...formData, monthlyIncome: parseFloat(e.target.value) })}
          error={errors.monthlyIncome}
          helperText="Your total monthly income before deductions"
          icon={
            <span className="text-capitec-gray-500 font-semibold">R</span>
          }
        />

        <Input
          label="Monthly Expenses"
          type="number"
          required
          min={0}
          step={100}
          value={formData.monthlyExpenses || ''}
          onChange={(e) => setFormData({ ...formData, monthlyExpenses: parseFloat(e.target.value) })}
          error={errors.monthlyExpenses}
          helperText="All your monthly expenses (rent, utilities, food, etc.)"
          icon={
            <span className="text-capitec-gray-500 font-semibold">R</span>
          }
        />

        <Input
          label="Existing Debt"
          type="number"
          required
          min={0}
          step={100}
          value={formData.existingDebt || ''}
          onChange={(e) => setFormData({ ...formData, existingDebt: parseFloat(e.target.value) })}
          error={errors.existingDebt}
          helperText="Total amount of existing debt (credit cards, loans, etc.)"
          icon={
            <span className="text-capitec-gray-500 font-semibold">R</span>
          }
        />

        <Input
          label="Credit Score (Optional)"
          type="number"
          min={300}
          max={850}
          value={formData.creditScore || ''}
          onChange={(e) => setFormData({ ...formData, creditScore: e.target.value ? parseInt(e.target.value) : undefined })}
          error={errors.creditScore}
          helperText="If you know your credit score, it helps us give better estimates"
        />

        {formData.monthlyIncome && formData.monthlyExpenses !== undefined && (
          <div className={`p-4 rounded-lg ${disposableIncome > 0 ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
            <p className="text-sm font-semibold text-capitec-gray-700 mb-1">
              Disposable Income
            </p>
            <p className={`text-2xl font-bold ${disposableIncome > 0 ? 'text-green-600' : 'text-capitec-red'}`}>
              {formatCurrency(disposableIncome)}
            </p>
            <p className="text-xs text-capitec-gray-600 mt-1">
              This is what you have left after expenses
            </p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} fullWidth size="lg">
            Back
          </Button>
          <Button type="submit" fullWidth size="lg">
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
};
