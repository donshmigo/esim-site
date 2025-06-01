export interface DataPlan {
  id: string;
  name: string;
  data: string;
  description?: string;
  price?: {
    amount: number | string;
    currency: string;
  };
} 