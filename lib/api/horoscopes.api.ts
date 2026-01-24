import { apiClient } from './client';

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export interface HoroscopeData {
  sign: ZodiacSign;
  date: string;
  reading: string;
  luckyNumber?: number;
  luckyColor?: string;
  mood?: string;
}

export interface ApiHoroscopeResponse {
  status: string;
  data: {
    _id: string;
    starSign: string;
    content: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

/**
 * Horoscope API
 */
export const horoscopeApi = {
  /**
   * Get today's horoscope for a specific sign
   */
  getDailyHoroscope: async (sign?: string): Promise<HoroscopeData> => {
    // If sign is provided, pass it as 'starSign' query param
    const response = await apiClient.get<ApiHoroscopeResponse>('/api/content/horoscope', sign ? { starSign: sign } : undefined);
    
    // Map API response to HoroscopeData
    return {
      sign: response.data.starSign as ZodiacSign,
      date: response.data.date,
      reading: response.data.content,
      // Default values or undefined since API doesn't return these yet
      luckyNumber: undefined,
      luckyColor: undefined,
      mood: undefined
    };
  },

  /**
   * Get all horoscopes for today
   */
  getAllHoroscopes: async (): Promise<HoroscopeData[]> => {
    return apiClient.get<HoroscopeData[]>('/api/content/horoscopes');
  },
};
