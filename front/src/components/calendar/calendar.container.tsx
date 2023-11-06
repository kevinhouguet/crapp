import React from 'react';
import YearType from '../../models/calendar/types/year';
import MonthType from '../../models/calendar/types/month';
import CalendarLayout from './calendar';
import CalendarFormContainer from './calendarForm/calendarForm.container';
import Month from '../../models/calendar/month';

interface ICalendar {
  year: YearType;
  month: MonthType;
  calendar: Month;
}

export default class CalendarContainer extends React.Component <Record<string,never>, ICalendar> {
  private month: MonthType = MonthType.create(new Date().getMonth() + 1);
  private year: YearType = YearType.create(new Date().getFullYear());
  constructor(props = {}) {
    super(props);
    this.state = {
      month: this.month,
      year: this.year,
      calendar: new Month(this.year, this.month)
    }
  }

  handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if(name === 'months'){
      const newMonth = MonthType.create(parseInt(value, 10));
      this.setState({
        month: newMonth,
        calendar: new Month(this.state.year, newMonth)
      })
    } else if(name === 'years'){
      const newYear = YearType.create(parseInt(value, 10));
      this.setState({
        year: newYear,
        calendar: new Month(newYear, this.state.month)
      })
    }
  }

  render() {
    return (
      <div className='calendar-container'>
        <CalendarFormContainer  month={this.state.month} year={this.state.year}
                                onChangeDate={this.handleChangeDate}/>
        <CalendarLayout calendar={this.state.calendar}/>
      </div>
    )
  }
}