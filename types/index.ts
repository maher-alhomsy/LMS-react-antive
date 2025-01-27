export type onBoardingSlides = {
  color: string;
  image: any;
  title: string;
  secondTitle: string;
  subTitle: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  avatar: string;
  stripeCustomerId: string;
  githubUserName: string;
  role: string;
  pushToken?: string;
  verified: boolean;
  reviews: Review[];
  orders: Order[];
  reviewsReplies: any[];
  Notification: any[];
  Tickets: any[];
  createdAt: Date;
  updatedAt: Date;
};

type Review = {
  id: string;
  user: User;
  userId: string;
  courseId: string;
  rating: number;
  replies: any[];
  comment: string;
  createdAt: any;
  updatedAt: any;
};

type Order = {
  id: string;
  userId: string;
  payment_info: string | null;
  courseId: string;
  createdAt: any;
  updatedAt: any;
};
