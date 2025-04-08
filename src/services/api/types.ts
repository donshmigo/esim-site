// Authentication types
export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

// Plan types
export interface DataPlan {
  id: string;
  name: string;
  description: string;
  data_amount: number; // in MB
  data_unit: 'MB' | 'GB';
  validity_days: number;
  price: {
    amount: number;
    currency: string;
  };
  countries: string[]; // ISO country codes
  regions: string[];
}

// Order types
export interface OrderRequest {
  plan_id: string;
  user_id?: string;
  quantity: number;
  customer: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
  payment?: {
    method: 'credit_card' | 'paypal' | 'other';
    transaction_id?: string;
  };
}

export interface Order {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  plan_id: string;
  user_id: string;
  esims: ESIM[];
  total_amount: {
    amount: number;
    currency: string;
  };
}

// ESIM types
export interface ESIM {
  id: string;
  iccid: string;
  status: 'provisioned' | 'activated' | 'deactivated' | 'expired';
  activation_code?: string;
  qr_code_url?: string;
  plan_id: string;
  data_used: number; // in MB
  data_limit: number; // in MB
  valid_until: string;
  created_at: string;
  activated_at?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

// Usage types
export interface Usage {
  esim_id: string;
  data_used: number; // in MB
  data_limit: number; // in MB
  percentage_used: number;
  last_connection: string;
  usage_history: {
    date: string;
    data_used: number; // in MB
  }[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status_code: number;
} 