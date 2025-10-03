export interface Token {
    id: number;
    serviceName: string;
    token: string;
    expiryDate: string;
    status: 'Active' | 'Expired';
  }
  
export interface ApiResponse {
    success: boolean;
    count: number;
    data: Token[];
  }
  
  