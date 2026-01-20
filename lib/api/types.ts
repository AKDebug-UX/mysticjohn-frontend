/**
 * Common API Types
 */

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  error: string;
  message?: string;
  stack?: string;
}

/**
 * Auth Types
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  zodiacSign?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Booking Types
 */
export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface AvailabilitySlot {
  date: string;
  slots: string[]; // Array of time strings like ["09:00", "09:30", ...]
}

export interface CreateBookingRequest {
  serviceId: string;
  startDateTime: string;
  type: 'ONLINE' | 'IN_PERSON';
  paymentMethod?: 'CREDITS' | 'STRIPE';
}

export interface Booking {
  id: string;
  serviceId: string;
  service?: Service;
  userId: string;
  startDateTime: string;
  endDateTime: string;
  type: 'ONLINE' | 'IN_PERSON';
  status: string;
  meetingLink?: string;
  paymentStatus?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Course Types
 */
export interface Course {
  id: string;
  title: string;
  description?: string;
  price: number;
  coverImageUrl?: string;
  isPublished: boolean;
  steps?: CourseStep[];
  enrollmentStatus?: 'ENROLLED' | 'NOT_ENROLLED';
}

export interface CourseStep {
  id: string;
  courseId: string;
  title: string;
  contentType: 'TEXT' | 'VIDEO' | 'LINK' | 'FILE';
  content: string;
  orderIndex: number;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  course?: Course;
  userId: string;
  progress?: CourseProgress;
  enrolledAt: string;
}

export interface CourseProgress {
  enrollmentId: string;
  stepId: string;
  completedAt?: string;
  progressData?: Record<string, any>;
}

export interface UpdateProgressRequest {
  enrollmentId: string;
  stepId: string;
  progressData?: Record<string, any>;
}

/**
 * Group Types
 */
export interface Group {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  privacy: 'PUBLIC' | 'PRIVATE';
  memberCount?: number;
  isMember?: boolean;
}

/**
 * Chat Types
 */
export interface ChatMessage {
  id: string;
  groupId: string;
  userId: string;
  user?: User;
  message: string;
  type: 'TEXT' | 'IMAGE' | 'FILE';
  mediaUrl?: string;
  readBy?: Array<{
    userId: string;
    readAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  message: string;
  type?: 'TEXT' | 'IMAGE' | 'FILE';
  mediaUrl?: string;
}

export interface GetChatMessagesOptions {
  limit?: number;
  before?: string;
}

export interface Post {
  id: string;
  groupId: string;
  userId: string;
  user?: User;
  title?: string;
  body: string;
  mediaUrl?: string;
  reactions?: Reaction[];
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  body: string;
  reactions?: Reaction[];
  createdAt: string;
  updatedAt: string;
}

export interface Reaction {
  id: string;
  targetType: 'POST' | 'COMMENT';
  targetId: string;
  userId: string;
  type: string;
}

export interface CreatePostRequest {
  body: string;
  title?: string;
  mediaUrl?: string;
}

export interface CreateCommentRequest {
  body: string;
}

export interface AddReactionRequest {
  type?: string;
}

/**
 * Credit Types
 */
export interface CreditPack {
  id: string;
  name: string;
  description?: string;
  credits: number;
  price: number;
  isActive: boolean;
}

export interface CreditBalance {
  balance: number;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  description?: string;
  createdAt: string;
}

export interface QuickQuestion {
  id: string;
  userId: string;
  question: string;
  reply?: QuickReply;
  status: string;
  createdAt: string;
}

export interface QuickReply {
  id: string;
  questionId: string;
  replyText: string;
  repliedAt: string;
}

export interface SubmitQuestionsRequest {
  questions: string[];
}

/**
 * Checkout Types
 */
export interface CheckoutRequest {
  itemType: 'course' | 'credits';
  courseId?: string;
  creditPackId?: string;
}

export interface CheckoutResponse {
  orderId?: string;
  bookingId?: string;
  enrollmentId?: string;
  message: string;
  paymentIntent?: {
    id: string;
    clientSecret: string;
  };
  checkoutSession?: {
    id: string;
    url: string;
  };
  order?: any;
  wallet?: any;
  tickets?: any[];
  enrollment?: any;
}

