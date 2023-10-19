import React from "react";
import './calendar.scss';
import MCalendar from "../../models/calendar/calendar";

interface CalendarProps {
  calendar: Array<Array<number|string>>;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default class CalendarLayout extends React.Component <CalendarProps>{

  constructor(props: CalendarProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { calendar, onClick } = this.props;
    const calendarHeaderDays = MCalendar.getDays();
    const dayClass = "calendar-container__calendar__day";
    
    return (
      <div className="calendar-container__calendar">
        <div className="calendar-container__calendar__header">
          {calendarHeaderDays.map((day, index) => {
            return (
              <div  className="calendar-container__calendar__header__day"
                    key={index}>
                {day.charAt(0).toUpperCase()}
              </div>
            )
          })}
        </div>
        {calendar && calendar.map((week, index) => {
          return (
            <div className="calendar-container__calendar__week" key={index}>
              {week.map((day, index) => {
                return (
                  <div  {...day === "" ? { className: `${dayClass} ${dayClass}--empty` } : { className: dayClass }}
                        key={index}
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClick(e)}>
                    {day}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

}