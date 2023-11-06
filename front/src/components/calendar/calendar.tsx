import React from "react";
import './calendar.scss';
import { Day } from "../../models/calendar/calendar";
import Month from "../../models/calendar/month";
import DayContainer from "./day.container";

interface ICalendarState {
  calendar: Month;
}

export default class CalendarLayout extends React.Component <ICalendarState, ICalendarState>{

  constructor(props: ICalendarState) {
    super(props);
  }

  render(): React.ReactNode {
    const { calendar } = this.props;
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