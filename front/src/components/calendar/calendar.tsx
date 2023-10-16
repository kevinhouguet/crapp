import React from "react";
import './calendar.scss';

interface CalendarProps {
  calendar: Array<Array<number|string>>;
}

export default class CalendarLayout extends React.Component <CalendarProps>{

  constructor(props: CalendarProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { calendar } = this.props;
    return (
      <div className="calendar-container__calendar">
        {calendar && calendar.map((week, index) => {
          return (
            <div className="calendar-container__calendar__week" key={index}>
              {week.map((day, index) => {
                return (
                  <div className="calendar-container__calendar__day" key={index}>
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