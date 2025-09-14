export interface Place {
  id: number;
  name: string;
  district: string;
  type: string;
  price?: string;
  flag?: string;
  cuisine?: string;
  stars?: number;
  totalNotation?: number;
  image?: string;
  description?: string;
  address?: string;
  instagram?: string;
  website?: string;
  phone?: string;
  spokenLanguages?: string[];
  paymentMethods?: string[];
  categoryId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}
