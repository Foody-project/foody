export interface Activity {
  id: number;
  name: string;
  district: string;
  price: string;
  image: string;
  type: string;
  description?: string;
  instagram?: string;
  website?: string;
  phone?: string;
  isHomePage?: boolean;
}
