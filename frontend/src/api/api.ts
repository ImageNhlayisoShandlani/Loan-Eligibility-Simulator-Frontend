import axios from "axios";
import type { EligibilityRequest, EligibilityResponse, LoanProduct } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loanApi = {
  checkEligibility: async (request: EligibilityRequest): Promise<EligibilityResponse> => {
    const response = await api.post<EligibilityResponse>('/loans/eligibility', request);
    return response.data;
  },

  getProducts: async (): Promise<{ products: LoanProduct[] }> => {
    const response = await api.get<{ products: LoanProduct[] }>('/loans/products');
    return response.data;
  },

  getValidationRules: async () => {
    const response = await api.get('/loans/validation-rules');
    return response.data;
  },
};