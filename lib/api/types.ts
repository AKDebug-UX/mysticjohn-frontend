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
  _id?: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  active: boolean;
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
  _id?: string;
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
  _id?: string;
  title: string;
  description?: string;
  price: number;
  coverImageUrl?: string;
  image?: string; // Mapped from user request
  instructor?: string;
  duration?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  lessonCount?: number;
  isPublished: boolean;
  steps?: CourseStep[];
  enrollmentStatus?: 'ENROLLED' | 'NOT_ENROLLED';
}

export interface CourseStep {
  id: string;
  _id?: string;
  courseId: string;
  title: string;
  contentType: 'TEXT' | 'VIDEO' | 'LINK' | 'FILE';
  content: string;
  orderIndex: number;
}

export interface CourseEnrollment {
  id: string;
  _id?: string;
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

export interface CreateCourseRequest {
  title: string;
  description: string;
  instructor?: string;
  price: number;
  duration?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  image?: string;
  coverImageUrl?: string; // Keeping for backward compatibility or mapping
  lessonCount?: number;
  isPublished?: boolean;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> { }

export interface CreateStepRequest {
  title: string;
  contentType: 'TEXT' | 'VIDEO' | 'LINK' | 'FILE';
  content: string;
}

export interface UpdateStepRequest extends Partial<CreateStepRequest> {
  orderIndex?: number;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  active?: boolean;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> { }

/**
 * Credit Types
 */
export interface CreditPack {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  credits: number;
  price: number;
  active: boolean;
}

export interface CreditBalance {
  balance: number;
}

export interface CreditTransaction {
  id: string;
  _id?: string;
  userId: string;
  amount: number;
  credits: number;
  type: string;
  description?: string;
  createdAt: string;
}

export interface QuickQuestion {
  id: string;
  _id?: string;
  userId: string;
  question: string;
  message?: string; // API returns message
  reply?: QuickReply;
  status: string;
  createdAt: string;
}

export interface QuickReply {
  id: string;
  _id?: string;
  questionId: string;
  replyText: string;
  repliedAt: string;
}

export interface SubmitQuestionsRequest {
  message: string;
}

/**
 * Checkout Types
 */
export interface CheckoutRequest {
  itemType: 'course' | 'credits' | 'event';
  courseId?: string;
  creditPackId?: string;
  eventId?: string;
  amount?: number;
  price?: number;
  credits?: number;
  quantity?: number;
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


/**
 * Event Types
 */
export interface Event {
  id: string;
  _id?: string;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime?: string;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  coverImageUrl?: string;
  price: number;
  capacity?: number;
  availableTickets?: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  _id?: string;
  eventId: string;
  event?: Event;
  userId: string;
  status: 'VALID' | 'USED' | 'CANCELLED';
  purchaseDate: string;
  qrCode?: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  eventType: string; // From user request
  price: number;
  date: string; // From user request
  startDateTime?: string; // Keeping for compatibility or mapping
  endDateTime?: string;
  location?: string;
  isOnline?: boolean;
  capacity?: number;
  googleMeetLink?: string; // From user request
  coverImageUrl?: string;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  isPublished?: boolean;
}

/**
 * Community Types
 */
export interface Post {
  id: string;
  _id?: string;
  userId: string;
  user?: User;
  content: string;
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO';
  tags?: string[];
  likesCount: number;
  commentsCount: number;
  comments?: Comment[];
  isLiked?: boolean; // For current user
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  _id?: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: string;
}

export interface CreatePostRequest {
  content: string;
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO';
  tags?: string[];
}

export interface CreateCommentRequest {
  content: string;
}

export interface FeedResponse {
  posts: Post[];
  nextCursor?: string;
}
