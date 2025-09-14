export interface User {
  id: number;
  email: string;
  role: "client" | "agency";
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  likes: Like[];
  bookings: Booking[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  blogId: number;
  createdAt: string;
}

export interface Like {
  id: number;
  user: User;
  blogId: number;
  createdAt: string;
}

export interface Booking {
  id: number;
  date: string;
  details: string;
  user: User;
  blog: Blog; 
  blogId: number;
  createdAt: string;
}

export interface CreateBlogData {
  title: string;
  content: string;
}

export interface CreateCommentData {
  content: string;
}

export interface CreateBookingData {
  date: string;
  details: string;
}
