//South african Rand formatting
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export const formatNumber = (num: number): string => {
    return Intl.NumberFormat('en-ZA').format(num);
}

export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

export const getRiskColor = (category: 'low' | 'medium' | 'high'): string => {
  switch (category) {
    case 'low':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'high':
      return 'text-capitec-red';
    default:
      return 'text-gray-600';
  }
};


export const getAffordabilityColor = (score: 'poor' | 'fair' | 'good' | 'excellent'): string => {
  switch (score) {
    case 'excellent':
      return 'text-green-600';
    case 'good':
      return 'text-blue-600';
    case 'fair':
      return 'text-yellow-600';
    case 'poor':
      return 'text-capitec-red';
    default:
      return 'text-gray-600';
  }
};

export const getApprovalColor = (likelihood: number): string => {
  if (likelihood >= 75) return 'bg-green-500';
  if (likelihood >= 50) return 'bg-blue-500';
  if (likelihood >= 25) return 'bg-yellow-500';
  return 'bg-capitec-red';
};