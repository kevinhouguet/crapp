import React from "react";
import './calendar.scss';
import { Day } from "../../models/calendar/calendar";
import Month from "../../models/calendar/month";
import DayContainer from "./day.container";

interface CalendarProps {
  calendar: Month;
}

export default class CalendarLayout extends React.Component <CalendarProps>{

  constructor(props: CalendarProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { calendar } = this.props;
    console.log(calendar)
    return (
      <div className="calendar">
        {calendar.days.map((day: Day) => {
          return (
            <DayContainer day={day} key={day.day}/>
          )
        })}
      </div>
    )
  }

}