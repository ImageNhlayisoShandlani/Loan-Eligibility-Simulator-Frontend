import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import type { EligibilityResponse } from '../types';
import {
  formatCurrency,
  formatPercentage,
  getRiskColor,
  getAffordabilityColor,
  getApprovalColor,
} from '../utils/formatting';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface EligibilityResultsProps {
  result: EligibilityResponse;
  onStartOver: () => void;
}

export const EligibilityResults: React.FC<EligibilityResultsProps> = ({ result, onStartOver }) => {
  const { eligibilityResult, recommendedLoan, affordabilityAnalysis } = result;

  const debtData = [
    { name: 'Disposable Income', value: affordabilityAnalysis.disposableIncome, color: '#10b981' },
    { name: 'Monthly Payment', value: recommendedLoan.monthlyPayment, color: '#E2231A' },
  ];

//   const loanComparison = [
//     { name: 'Requested', amount: recommendedLoan.recommendedAmount },
//     { name: 'Maximum', amount: recommendedLoan.maxAmount },
//   ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Main Eligibility Status */}
      <Card className={`${eligibilityResult.isEligible ? 'border-green-500 border-2' : 'border-capitec-red border-2'}`}>
        <div className="text-center py-6">
          {eligibilityResult.isEligible ? (
            <>
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                Congratulations! You're Eligible
              </h2>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-capitec-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-capitec-red mb-2">
                Not Eligible at This Time
              </h2>
            </>
          )}
          <p className="text-capitec-gray-600 text-lg">{eligibilityResult.decisionReason}</p>
        </div>
      </Card>

      {/* Approval Likelihood */}
      <Card title="Approval Likelihood" subtitle="Based on your financial profile">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-capitec-gray-900">
              {eligibilityResult.approvalLikelihood}%
            </span>
            <span className={`text-sm font-semibold ${getRiskColor(eligibilityResult.riskCategory)} uppercase`}>
              {eligibilityResult.riskCategory} Risk
            </span>
          </div>
          <div className="w-full bg-capitec-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className={`h-full ${getApprovalColor(eligibilityResult.approvalLikelihood)} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
              style={{ width: `${eligibilityResult.approvalLikelihood}%` }}
            >
              <span className="text-white text-xs font-bold">
                {eligibilityResult.approvalLikelihood}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommended Loan */}
      {eligibilityResult.isEligible && (
        <Card title="Recommended Loan Terms" subtitle="Based on your affordability">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-capitec-gray-50 p-4 rounded-lg">
              <p className="text-sm text-capitec-gray-600 mb-1">Recommended Amount</p>
              <p className="text-2xl font-bold text-capitec-blue">
                {formatCurrency(recommendedLoan.recommendedAmount)}
              </p>
            </div>
            <div className="bg-capitec-gray-50 p-4 rounded-lg">
              <p className="text-sm text-capitec-gray-600 mb-1">Maximum Amount</p>
              <p className="text-2xl font-bold text-capitec-gray-700">
                {formatCurrency(recommendedLoan.maxAmount)}
              </p>
            </div>
            <div className="bg-capitec-gray-50 p-4 rounded-lg">
              <p className="text-sm text-capitec-gray-600 mb-1">Interest Rate</p>
              <p className="text-2xl font-bold text-capitec-red">
                {formatPercentage(recommendedLoan.interestRate)}
              </p>
            </div>
            <div className="bg-capitec-gray-50 p-4 rounded-lg">
              <p className="text-sm text-capitec-gray-600 mb-1">Monthly Payment</p>
              <p className="text-2xl font-bold text-capitec-blue">
                {formatCurrency(recommendedLoan.monthlyPayment)}
              </p>
            </div>
          </div>

          <div className="bg-capitec-blue/10 p-4 rounded-lg border-2 border-capitec-blue/20">
            <p className="text-sm text-capitec-gray-700 mb-1">Total Repayment</p>
            <p className="text-3xl font-bold text-capitec-blue">
              {formatCurrency(recommendedLoan.totalRepayment)}
            </p>
          </div>
        </Card>
      )}

      {/* Affordability Analysis */}
      <Card title="Affordability Analysis" subtitle="Your financial health summary">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-capitec-gray-50 rounded-lg">
            <span className="text-capitec-gray-700 font-semibold">Disposable Income</span>
            <span className="text-xl font-bold text-green-600">
              {formatCurrency(affordabilityAnalysis.disposableIncome)}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-capitec-gray-50 rounded-lg">
            <span className="text-capitec-gray-700 font-semibold">Debt-to-Income Ratio</span>
            <span className="text-xl font-bold text-capitec-gray-700">
              {formatPercentage(affordabilityAnalysis.debtToIncomeRatio)}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-capitec-gray-50 rounded-lg">
            <span className="text-capitec-gray-700 font-semibold">Loan-to-Income Ratio</span>
            <span className="text-xl font-bold text-capitec-gray-700">
              {formatPercentage(affordabilityAnalysis.loanToIncomeRatio)}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-capitec-gray-50 rounded-lg border-2 border-capitec-blue/20">
            <span className="text-capitec-gray-700 font-semibold">Affordability Score</span>
            <span className={`text-xl font-bold uppercase ${getAffordabilityColor(affordabilityAnalysis.affordabilityScore)}`}>
              {affordabilityAnalysis.affordabilityScore}
            </span>
          </div>
        </div>

        {eligibilityResult.isEligible && (
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={debtData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {debtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onStartOver} fullWidth size="lg">
          Start Over
        </Button>
        {eligibilityResult.isEligible && (
          <Button variant="primary" fullWidth size="lg">
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
};
