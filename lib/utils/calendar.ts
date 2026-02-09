export function formatToGCalDate(date: Date): string {
  // Google Calendar expects YYYYMMDDTHHMMSSZ (UTC) without separators
  return date.toISOString().replace(/-|:|\.\d{3}/g, '');
}

interface BuildGCalUrlOptions {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}

export function buildGoogleCalendarUrl(options: BuildGCalUrlOptions): string {
  const { title, start, end, description = '', location = '' } = options;
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const dates = `${formatToGCalDate(start)}/${formatToGCalDate(end)}`;
  const params = new URLSearchParams({
    text: title,
    details: description,
    location,
  });
  params.append('dates', dates);
  return `${base}&${params.toString()}`;
}