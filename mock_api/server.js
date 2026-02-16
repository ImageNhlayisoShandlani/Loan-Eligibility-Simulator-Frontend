const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route for eligibility calculation
server.post('/api/loans/eligibility', (req, res) => {
  const { personalInfo, financialInfo, loanDetails } = req.body;

  // Calculate eligibility (same business logic as Express version)
  const result = calculateEligibility(personalInfo, financialInfo, loanDetails);
  
  res.jsonp(result);
});

// Use default router for other endpoints
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log('API Endpoints:');
  console.log('POST >>> /api/loans/eligibility - Calculate loan eligibility');
  console.log('GET  >>> /api/loans/products - Get loan products');
  console.log('GET  >>> /api/loans/validation-rules - Get validation rules');
});

// Business Logic Functions
function calculateEligibility(personalInfo, financialInfo, loanDetails) {
  const affordability = calculateAffordability(financialInfo, loanDetails);
  const eligibility = determineEligibility(personalInfo, financialInfo, loanDetails, affordability);
  const recommendedLoan = calculateRecommendedLoan(personalInfo, financialInfo, loanDetails, eligibility, affordability);

  return {
    eligibilityResult: eligibility,
    recommendedLoan,
    affordabilityAnalysis: affordability,
  };
}

function calculateAffordability(financialInfo, loanDetails) {
  const { monthlyIncome, monthlyExpenses, existingDebt } = financialInfo;
  const { requestedAmount } = loanDetails;

  const disposableIncome = monthlyIncome - monthlyExpenses;
  const debtToIncomeRatio = (existingDebt / monthlyIncome) * 100;
  const loanToIncomeRatio = (requestedAmount / (monthlyIncome * 12)) * 100;

  let affordabilityScore = 'poor';
  if (debtToIncomeRatio < 20 && disposableIncome > 5000 && loanToIncomeRatio < 50) {
    affordabilityScore = 'excellent';
  } else if (debtToIncomeRatio < 35 && disposableIncome > 3000 && loanToIncomeRatio < 80) {
    affordabilityScore = 'good';
  } else if (debtToIncomeRatio < 45 && disposableIncome > 1000 && loanToIncomeRatio < 100) {
    affordabilityScore = 'fair';
  }

  return {
    disposableIncome: Math.round(disposableIncome * 100) / 100,
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
    loanToIncomeRatio: Math.round(loanToIncomeRatio * 10) / 10,
    affordabilityScore,
  };
}

function determineEligibility(personalInfo, financialInfo, loanDetails, affordability) {
  const { age, employmentStatus, employmentDuration } = personalInfo;
  const { monthlyIncome, creditScore } = financialInfo;

  let isEligible = true;
  let approvalLikelihood = 100;
  let riskCategory = 'low';
  const reasons = [];

  // Age check
  if (age < 18 || age > 65) {
    isEligible = false;
    approvalLikelihood = 0;
    reasons.push('Age outside eligible range (18-65)');
  }

  // Employment check
  if (employmentStatus === 'unemployed') {
    isEligible = false;
    approvalLikelihood = 0;
    reasons.push('Unemployed applicants not eligible');
  } else if (employmentDuration < 3) {
    isEligible = false;
    approvalLikelihood = 0;
    reasons.push('Minimum 3 months employment required');
  }

  // Income check
  if (monthlyIncome < 5000) {
    isEligible = false;
    approvalLikelihood = 0;
    reasons.push('Minimum monthly income of R5,000 required');
  }

  // Affordability check
  if (affordability.disposableIncome < 1000) {
    isEligible = false;
    approvalLikelihood = 0;
    reasons.push('Insufficient disposable income');
  }

  // If still eligible, calculate approval likelihood
  if (isEligible) {
    let score = 100;

    // Affordability score impact
    if (affordability.affordabilityScore === 'excellent') {
      score -= 0;
      reasons.push('Strong income-to-expense ratio');
    } else if (affordability.affordabilityScore === 'good') {
      score -= 10;
      reasons.push('Good income-to-expense ratio');
    } else if (affordability.affordabilityScore === 'fair') {
      score -= 25;
      reasons.push('Fair affordability metrics');
    } else {
      score -= 40;
      reasons.push('Limited affordability');
    }

    // Debt-to-income impact
    if (affordability.debtToIncomeRatio < 20) {
      reasons.push('Manageable existing debt');
    } else if (affordability.debtToIncomeRatio < 35) {
      score -= 5;
      reasons.push('Moderate existing debt');
    } else {
      score -= 15;
      reasons.push('High existing debt load');
    }

    // Credit score impact
    if (creditScore) {
      if (creditScore >= 750) {
        score += 0;
        reasons.push('Excellent credit score');
      } else if (creditScore >= 650) {
        score -= 5;
        reasons.push('Good credit score');
      } else if (creditScore >= 550) {
        score -= 15;
        reasons.push('Fair credit score');
      } else {
        score -= 30;
        reasons.push('Low credit score');
        riskCategory = 'high';
      }
    }

    // Employment status impact
    if (employmentStatus === 'self_employed') {
      score -= 10;
      reasons.push('Self-employed (higher verification required)');
    }

    // Loan-to-income ratio impact
    if (affordability.loanToIncomeRatio > 100) {
      score -= 20;
      riskCategory = riskCategory === 'high' ? 'high' : 'medium';
    } else if (affordability.loanToIncomeRatio > 80) {
      score -= 10;
    }

    approvalLikelihood = Math.max(0, Math.min(100, score));

    // Determine risk category
    if (approvalLikelihood >= 75 && affordability.debtToIncomeRatio < 35) {
      riskCategory = 'low';
    } else if (approvalLikelihood >= 50) {
      riskCategory = 'medium';
    } else {
      riskCategory = 'high';
    }

    // Final eligibility check
    if (approvalLikelihood < 40) {
      isEligible = false;
    }
  }

  return {
    isEligible,
    approvalLikelihood: Math.round(approvalLikelihood),
    riskCategory,
    decisionReason: reasons.join('. '),
  };
}

function calculateRecommendedLoan(personalInfo, financialInfo, loanDetails, eligibility, affordability) {
  const { requestedAmount, loanTerm, loanPurpose } = loanDetails;

  // Calculate max amount based on income
  const maxAmount = Math.min(
    financialInfo.monthlyIncome * 12 * 0.8,
    300000
  );

  const recommendedAmount = Math.min(requestedAmount, maxAmount);

  // Calculate interest rate
  let interestRate = 12.5; // Base rate
  if (eligibility.riskCategory === 'low') {
    interestRate -= 2.0;
  } else if (eligibility.riskCategory === 'high') {
    interestRate += 3.0;
  }

  if (financialInfo.creditScore) {
    if (financialInfo.creditScore >= 750) {
      interestRate -= 1.5;
    } else if (financialInfo.creditScore >= 650) {
      interestRate -= 0.5;
    } else if (financialInfo.creditScore < 550) {
      interestRate += 2.0;
    }
  }

  if (loanPurpose === 'new_vehicle') {
    interestRate -= 3.0;
  } else if (loanPurpose === 'debt_consolidation') {
    interestRate += 1.0;
  }

  interestRate = Math.max(8.5, Math.min(18.5, interestRate));

  // Calculate monthly payment
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    (recommendedAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
    (Math.pow(1 + monthlyRate, loanTerm) - 1);

  const totalRepayment = monthlyPayment * loanTerm;

  return {
    maxAmount: Math.round(maxAmount * 100) / 100,
    recommendedAmount: Math.round(recommendedAmount * 100) / 100,
    interestRate: Math.round(interestRate * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
  };
}
