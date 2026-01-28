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
  _id?: string;
  email: string;
  name?: string;
  credits?: number;
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
  credits: number;
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
  amount?: number;
  price?: number;
  credits?: number;
}

export interface CheckoutResponse {
  orderId?: string;
  transactionId?: string;
  paymentId?: string; // Mapped from transactionId
  bookingId?: string;
  enrollmentId?: string;
  message: string;
  status?: string;
  paymentIntent?: {
    id: string;
    clientSecret: string;
  };
  checkoutSession?: {
    id: string;
    url: string;
  };
  checkoutUrl?: string; // Mapped from checkoutSession.url
  sessionId?: string; // Mapped from checkoutSession.id
  order?: any;
  wallet?: any;
  tickets?: any[];
  enrollment?: any;
}

export interface CheckoutConfirmResponse {
  success: boolean;
  message: string;
  status?: 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
  order?: any;
  transactionId?: string;
  sessionId?: string;
}

