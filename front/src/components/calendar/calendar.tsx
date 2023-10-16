import React from "react";
import './calendar.scss';
import MCalendar from "../../models/calendar/calendar";

interface CalendarProps {
  calendar: Array<Array<number|string>>;
}

export default class CalendarLayout extends React.Component <CalendarProps>{

  public calendarHeader = MCalendar.getDays()

  constructor(props: CalendarProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { calendar } = this.props;
    const dayClass = "calendar-container__calendar__day";
    return (
      <div className="calendar-container__calendar">
        {calendar && calendar.map((week, index) => {
          return (
            <div className="calendar-container__calendar__week" key={index}>
              {week.map((day, index) => {
                return (
                  <div  {...day === "" ? { className: `${dayClass} ${dayClass}--empty` } : { className: dayClass }}
                        key={index}>
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