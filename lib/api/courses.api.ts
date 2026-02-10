import { apiClient, ApiClientError } from './client';
import type {
  Course,
  CourseEnrollment,
  UpdateProgressRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
  CreateStepRequest,
  UpdateStepRequest,
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
    if (!id || id === 'undefined' || id === 'null') {
      throw new ApiClientError('Invalid course ID', 400);
    }
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

  /**
   * Admin: Create a new course
   */
  createCourse: async (data: CreateCourseRequest): Promise<Course> => {
    return apiClient.post<Course>('/api/courses', data);
  },

  /**
   * Admin: Update a course
   */
  updateCourse: async (id: string, data: UpdateCourseRequest): Promise<Course> => {
    return apiClient.patch<Course>(`/api/courses/${id}`, data);
  },

  /**
   * Admin: Delete a course
   */
  deleteCourse: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/courses/${id}`);
  },

  /**
   * Admin: Manage course steps
   */
  addStep: async (courseId: string, data: CreateStepRequest): Promise<Course> => {
    return apiClient.post<Course>(`/api/courses/${courseId}/steps`, data);
  },
  updateStep: async (courseId: string, stepId: string, data: UpdateStepRequest): Promise<Course> => {
    return apiClient.patch<Course>(`/api/courses/${courseId}/steps/${stepId}`, data);
  },
  deleteStep: async (courseId: string, stepId: string): Promise<Course> => {
    return apiClient.delete<Course>(`/api/courses/${courseId}/steps/${stepId}`);
  },
};

