/**
 * Daily Horoscope Data
 * Static content for daily horoscopes by zodiac sign
 */

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
  date: string; // YYYY-MM-DD format
  reading: string;
  luckyNumber?: number;
  luckyColor?: string;
  mood?: string;
}

/**
 * Generate daily horoscope based on date and sign
 * For now, using static templates. Can be replaced with API later.
 */
export function getDailyHoroscope(sign: ZodiacSign, date: Date = new Date()): HoroscopeData {
  const dateStr = date.toISOString().split('T')[0];
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);

  // Simple hash-based daily variation
  const variation = (dayOfYear + sign.length) % 3;

  const readings: Record<ZodiacSign, string[]> = {
    Aries: [
      "The stars align for ye today, fiery Aries. Yer passion and determination will guide ye through any challenges. Trust yer instincts, but dinnae rush into decisions. Take a moment to breathe and consider all angles.",
      "A new opportunity knocks at yer door, Aries. The universe is encouraging ye to step out of yer comfort zone. Embrace change with courage, but remember to listen to those around ye. Their wisdom might surprise ye.",
      "Yer energy is high today, Aries. Channel it wisely into projects that matter. Avoid conflicts by choosing yer battles carefully. Sometimes, the strongest move is to step back and observe.",
    ],
    Taurus: [
      "Stability and comfort are yer allies today, steady Taurus. Focus on building something lasting rather than seeking quick wins. Yer patience will be rewarded, so dinnae rush the process.",
      "The earth beneath yer feet supports ye, Taurus. Trust in yer foundation and the relationships ye've built. Financial matters look favorable, but be cautious with new investments. Take time to research.",
      "Yer senses are heightened today, Taurus. Enjoy the simple pleasures - good food, beautiful music, or time in nature. These moments of peace will recharge yer spirit for the challenges ahead.",
    ],
    Gemini: [
      "Communication flows freely for ye today, curious Gemini. Yer words have power, so use them wisely. A conversation might lead to an unexpected opportunity. Stay open to new ideas and perspectives.",
      "Yer dual nature is balanced today, Gemini. Ye can see both sides of any situation clearly. This is a good time for negotiations or making important decisions. Trust yer ability to adapt.",
      "Learning and exploration call to ye, Gemini. Whether it's a new skill, book, or conversation, feed yer curiosity. The knowledge ye gain today will serve ye well in the future.",
    ],
    Cancer: [
      "Yer intuition is strong today, nurturing Cancer. Trust the feelings in yer heart, especially regarding family and home matters. Emotional connections deepen, bringing ye closer to those ye love.",
      "Home is where yer heart finds peace, Cancer. Consider making improvements to yer living space or spending quality time with loved ones. Yer caring nature brings comfort to others today.",
      "The moon's energy supports ye, Cancer. Ye might feel more sensitive than usual - this is a gift, not a burden. Use yer empathy to understand others and make meaningful connections.",
    ],
    Leo: [
      "Yer natural charisma shines bright today, regal Leo. All eyes are on ye, and ye have the power to inspire others. Use this influence for good, and ye'll find success in yer endeavors.",
      "Creativity flows through ye, Leo. Whether it's art, leadership, or self-expression, let yer inner light shine. Don't be afraid to take center stage - ye were born for this moment.",
      "Generosity is yer strength today, Leo. Sharing yer time, resources, or talents with others will bring ye great satisfaction. Remember, true leadership comes from lifting others up.",
    ],
    Virgo: [
      "Attention to detail serves ye well today, analytical Virgo. Yer methodical approach will help ye solve problems others might miss. Take time to organize and plan - it will save ye effort later.",
      "Health and wellness are on yer mind, Virgo. This is a perfect day to start a new routine or make improvements to yer daily habits. Small changes lead to big transformations.",
      "Yer practical wisdom is valuable today, Virgo. Others might seek yer advice or help with organization. Share yer knowledge generously, but remember to take care of yerself too.",
    ],
    Libra: [
      "Balance and harmony are yer goals today, diplomatic Libra. Ye excel at seeing all perspectives and finding the middle ground. Use this skill to resolve conflicts or make fair decisions.",
      "Beauty and aesthetics call to ye, Libra. Surround yerself with things that bring ye joy - art, music, or beautiful spaces. These pleasures nourish yer soul and restore yer energy.",
      "Partnerships are highlighted, Libra. Whether romantic, business, or friendship, relationships flourish under yer care. Communication and compromise will strengthen all yer connections.",
    ],
    Scorpio: [
      "Transformation is in the air, intense Scorpio. Old patterns might be breaking down to make way for something new. Trust the process, even when it feels uncomfortable. Growth comes from change.",
      "Yer depth and intensity are assets today, Scorpio. Ye can see beneath the surface and understand what others miss. Use this insight wisely - sometimes the truth needs to be shared gently.",
      "Passion drives ye forward, Scorpio. Channel this powerful energy into projects that matter deeply to ye. Avoid getting stuck in power struggles - focus on what ye can control.",
    ],
    Sagittarius: [
      "Adventure and exploration await, free-spirited Sagittarius. Whether it's travel, learning, or new experiences, ye're drawn to expand yer horizons. Follow this urge - it leads to growth.",
      "Philosophy and big ideas inspire ye today, Sagittarius. Ye might find yerself pondering life's big questions or seeking deeper meaning. Share yer insights with others - they value yer perspective.",
      "Optimism is yer superpower, Sagittarius. Even in challenging times, ye see the silver lining. This positive energy is contagious - spread it to those around ye who need encouragement.",
    ],
    Capricorn: [
      "Ambition and discipline guide ye, determined Capricorn. Yer hard work is paying off, and ye're building something lasting. Stay focused on yer long-term goals, but remember to enjoy the journey.",
      "Structure and organization are yer allies, Capricorn. This is a good day to plan, organize, or tackle administrative tasks. Yer methodical approach will help ye achieve yer objectives efficiently.",
      "Respect and recognition come yer way, Capricorn. Others see yer dedication and reliability. Use this trust to take on leadership roles or mentor those who look up to ye.",
    ],
    Aquarius: [
      "Innovation and originality are yer strengths, visionary Aquarius. Ye see possibilities others miss and have unique solutions to problems. Don't be afraid to think outside the box today.",
      "Humanitarian causes call to ye, Aquarius. Ye're drawn to help others and make the world a better place. Yer ideas for change are valuable - share them with those who can help make them reality.",
      "Friendship and connection matter, Aquarius. Connect with like-minded people who share yer values. Together, ye can accomplish more than ye could alone.",
    ],
    Pisces: [
      "Intuition and creativity flow through ye, dreamy Pisces. Yer imagination is powerful today - use it for artistic pursuits or problem-solving. Trust yer gut feelings; they're usually right.",
      "Compassion and empathy are yer gifts, Pisces. Ye can sense what others need and offer comfort. This emotional intelligence helps ye navigate relationships with grace and understanding.",
      "Spirituality and inner peace call to ye, Pisces. Take time for meditation, reflection, or connection with the divine. This inner work will guide ye through any challenges ye face.",
    ],
  };

  const luckyNumbers: Record<ZodiacSign, number[]> = {
    Aries: [1, 8, 17],
    Taurus: [2, 6, 24],
    Gemini: [3, 12, 21],
    Cancer: [4, 7, 28],
    Leo: [5, 19, 23],
    Virgo: [6, 15, 27],
    Libra: [7, 14, 22],
    Scorpio: [8, 13, 26],
    Sagittarius: [9, 18, 25],
    Capricorn: [10, 16, 29],
    Aquarius: [11, 20, 30],
    Pisces: [12, 19, 31],
  };

  const luckyColors: Record<ZodiacSign, string[]> = {
    Aries: ['Red', 'Orange'],
    Taurus: ['Green', 'Pink'],
    Gemini: ['Yellow', 'Silver'],
    Cancer: ['White', 'Silver'],
    Leo: ['Gold', 'Orange'],
    Virgo: ['Brown', 'Navy'],
    Libra: ['Pink', 'Blue'],
    Scorpio: ['Black', 'Red'],
    Sagittarius: ['Purple', 'Blue'],
    Capricorn: ['Brown', 'Black'],
    Aquarius: ['Blue', 'Silver'],
    Pisces: ['Sea Green', 'Lavender'],
  };

  return {
    sign,
    date: dateStr,
    reading: readings[sign][variation],
    luckyNumber: luckyNumbers[sign][variation],
    luckyColor: luckyColors[sign][variation],
    mood: 'Positive',
  };
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const ZODIAC_DATES: Record<ZodiacSign, { start: string; end: string }> = {
  Aries: { start: 'March 21', end: 'April 19' },
  Taurus: { start: 'April 20', end: 'May 20' },
  Gemini: { start: 'May 21', end: 'June 20' },
  Cancer: { start: 'June 21', end: 'July 22' },
  Leo: { start: 'July 23', end: 'August 22' },
  Virgo: { start: 'August 23', end: 'September 22' },
  Libra: { start: 'September 23', end: 'October 22' },
  Scorpio: { start: 'October 23', end: 'November 21' },
  Sagittarius: { start: 'November 22', end: 'December 21' },
  Capricorn: { start: 'December 22', end: 'January 19' },
  Aquarius: { start: 'January 20', end: 'February 18' },
  Pisces: { start: 'February 19', end: 'March 20' },
};
