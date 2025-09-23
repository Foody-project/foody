export interface Comment {
  id: number;
  userId: number;
  placeId: number;
  comment: string;
  rating: number;
  createdAt: Date;
  author: {
    id: number;
    first_name: string;
    last_name: string;
  };
  place: {
    id: number;
    name: string;
  };
}
