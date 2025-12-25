import { apiClient } from './client';
import type {
  Course,
  CourseEnrollment,
  UpdateProgressRequest,
} from './types';

/**
 * Courses API
 */
export const coursesApi = {
  /**
   * Get all published courses
   */
  getCourses: async (): Promise<Course[]> => {
    return apiClient.get<Course[]>('/api/courses');
  },

  /**
   * Get course by ID with steps and enrollment status
   */
  getCourse: async (id: string): Promise<Course> => {
    return apiClient.get<Course>(`/api/courses/${id}`);
  },

  /**
   * Get user's course enrollments with progress
   */
  getMyEnrollments: async (): Promise<CourseEnrollment[]> => {
    return apiClient.get<CourseEnrollment[]>('/api/enrollments/my');
  },

  /**
   * Update course progress
   */
  updateProgress: async (data: UpdateProgressRequest): Promise<void> => {
    return apiClient.post<void>('/api/progress', data);
  },
};

