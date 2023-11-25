import Calendar from "@/components/Calendar";
import EventCalendar from "@/components/EventCalendar";

function DoctorCalendar() {
  return (
    <div>
      <h1 className="title mb-5">Calendario</h1>
      {/* <Calendar /> */}
      <EventCalendar />
    </div>
  );
}

export default DoctorCalendar;
