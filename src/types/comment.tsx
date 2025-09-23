export interface Comment {
  id: number;
  userId: number;
  placeId: number;
  comment: string;
  likes: number;
  dislikes: number;
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
