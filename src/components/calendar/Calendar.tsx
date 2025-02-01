import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarStyles.css"
import { fetchParkFacilities, ParkFacilityReservation } from "../../services/parkFacilityService";
import { FullCalendarEvent } from "../../interfaces/FullCalendarEvent";

const Calendar: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<FullCalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformData = (unformattedData: ParkFacilityReservation[]) : FullCalendarEvent[] => {
    const calendarEvents: FullCalendarEvent[] = unformattedData.map(reservation => ({
      title: reservation.reservationPurposeDsc.trim(),
      start: reservation.reservationBeginDtm,
      end: reservation.reservationEndDtm,
      location: reservation.locationName,
    }));
    console.log("cal events:",calendarEvents);
    
    return calendarEvents;
  };

  useEffect(() => {
    const getReservations = async () => {
      try {
        const response: ParkFacilityReservation[] = await fetchParkFacilities();
        console.log(response);
        
        const formattedData = transformData(response);
        setCalendarEvents(formattedData);
      } catch {
        setError("Cannot load park reservations");
      } finally {
        setLoading(false);
      }
    }

    getReservations();
  }, []);

  if (loading) {
    return(<p>Loading...</p>);
  }
  if (error) {
    return(<p>{error}</p>);
  }

    return(
        <div className="calendar-container">
          <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={"en"}
          timeZone={"UTC"}
          slotMinTime={"08:00:00"}
          slotMaxTime={"23:00:00"}
          allDaySlot={false}
          firstDay={1}
          initialView={"timeGridWeek"}
          headerToolbar={{
            start: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            end: "today prev,next",
          }}
          contentHeight="auto"
          events={calendarEvents}
        />
        </div>
    );
};

export default Calendar;