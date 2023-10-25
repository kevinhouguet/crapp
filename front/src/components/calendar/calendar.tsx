import React from "react";
import './calendar.scss';
import { Day } from "../../models/calendar/calendar";

interface CalendarProps {
  calendar: Array<Day[]>;
}

export default class CalendarLayout extends React.Component <CalendarProps>{

  constructor(props: CalendarProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { calendar } = this.props;
    return (
      <div className="calendar">
        {calendar.map((week: Day[], weekIndex: number) => {
          return (
            <div className="calendar__week" key={weekIndex}>
              {week.map((day: Day, dayIndex: number) => (
                day && (
                  <div className="calendar__day" key={dayIndex}>
                    <div className="calendar__day__dayName">{day.dayName + ' ' + day.day}</div>
                    <div className="calendar__day__inputs">
                      <button type="button">-</button>
                      <input type="text" id={'dayUnit-'+day.day} name="dayUnit" defaultValue="0" />
                      <button type="button">+</button>
                    </div>
                  </div>
                )
              ))}
            </div>
          )
        })}      
      </div>
    )
  }

}