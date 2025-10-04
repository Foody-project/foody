import { OpeningHour } from "./openingHour";

export interface Place {
  id: number;
  name: string;
  district: string;
  type: string;
  price?: string;
  flag?: string;
  keywords?: string[];
  cuisine?: string;
  stars?: number;
  totalNotation?: number;
  foodysNotation: string;
  image?: string;
  description?: string;
  address?: string;
  longitude: number;
  latitude: number;
  instagram?: string;
  website?: string;
  phone?: string;
  menu?: string[];
  spokenLanguages?: string[];
  paymentMethods?: string[];
  openingHours?: OpeningHour[];
  categoryId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}
