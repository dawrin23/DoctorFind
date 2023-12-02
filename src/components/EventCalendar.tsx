'use client'
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, startOfDay, endOfDay } from "date-fns";
import moment from "moment";

interface Event {
  start: Date;
  end: Date;
}

const localizer = momentLocalizer(moment);

function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Aquí puedes hacer la llamada a la API para obtener los eventos
    fetch("/ruta-de-la-api")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.map((event: Event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      });
  }, []);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    const eventsForThisDay = events.filter(
      (event) =>
        startOfDay(event.start) <= startOfDay(start) &&
        endOfDay(event.end) >= endOfDay(end)
    );
    console.log("Eventos para este día:", eventsForThisDay);
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        selectable
      />
    </div>
  );
}

export default EventCalendar;
