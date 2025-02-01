export interface FullCalendarEvent {
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    description?: string;
    location?: string;
    url?: string;
    color?: string;
    textColor?: string;
    // extendedProps?: any | null;
  }
  