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

export type Order = {
  id: string;
  userId: string;
  payment_info: string | null;
  courseId: string;
  createdAt: any;
  updatedAt: any;
};

export type Benefits = {
  id: string;
  title: string;
  courseId: string;
  createdAt: any;
  updatedAt: any;
};

export type Reviews = {
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

type Answer = {
  id: string;
  userId: string;
  questionId: string;
  answer: string;
  user: User;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Question = {
  id: string;
  userId: string;
  user: User;
  contentId: string;
  question: string;
  image?: string;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
};

export type CourseData = {
  id: string;
  title: string;
  videoUrl: string;
  conversationId?: string;
  videoSection: string;
  questions: Question[];
  description: string;
  videoLength: string;
  links: any;
  videoPlayer: string | null;
  courseId: string;
};

export type CourseType = {
  id: string;
  name: string;
  description: string;
  categories: string | null;
  price: number;
  estimatedPrice: number | null;
  thumbnail: string;
  tags: string;
  level: string;
  demoUrl: string;
  slug: string;
  lessons: number;
  payment_id: string | null;
  ratings: number;
  purchased: number;
  iosProductId?: string;
  androidProductId?: string;
  benefits: Benefits[];
  prerequisites: Benefits[];
  courseData: CourseData[];
  reviews: Reviews[];
  orders: Order[];
  createdAt: any;
  updatedAt: any;
};
