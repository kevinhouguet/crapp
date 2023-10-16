import React from 'react';
import MCalendar from '../../models/calendar/calendar';
import YearType from '../../models/calendar/types/year';
import MonthType from '../../models/calendar/types/month';
import CalendarLayout from './calendar';


export default class CalendarContainer extends React.Component {
  public currentMonth: MonthType;
  public currentYear: YearType;

  constructor(props: MCalendar) {
    super(props);
    this.currentMonth = MonthType.create(10);
    this.currentYear = YearType.create(2023);
  }

  render() {
    return (
      <div className='calendar-container'>
        <CalendarLayout calendar={MCalendar.createAMonth(this.currentYear, this.currentMonth)} />
      </div>
    )
  }
}