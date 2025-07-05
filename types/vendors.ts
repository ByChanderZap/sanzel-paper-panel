export type Vendor = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}; 

export interface VendorsFormState {
  errorMessage?: string | null;
  success?: string | null;
  errors?: {
    name?: string[];
    phone?: string[];
  };
} 
