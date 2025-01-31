import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarStyles.css"
const Calendar = () => {
    return(
        <div className="calendar-container">
          <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={"en"}
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
        />

        </div>
    );
}
export default Calendar;