import React from 'react';
import YearType from '../../models/calendar/types/year';
import MonthType from '../../models/calendar/types/month';
import CalendarLayout from './calendar';
import MCalendar from '../../models/calendar/calendar';
import CalendarFormContainer from './calendarForm/calendarForm.container';

interface ICalendar {
  year: YearType;
  month: MonthType;
}

export default class CalendarContainer extends React.Component <Record<string,never>, ICalendar> {
  constructor(props = {}) {
    super(props);
    this.state = {
      month: MonthType.create(new Date().getMonth() + 1),
      year: YearType.create(new Date().getFullYear())
    }
  }

  handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if(name === 'months'){
      this.setState({
        month: MonthType.create(parseInt(value, 10))
      })
    } else if(name === 'years'){
      this.setState({
        year: YearType.create(parseInt(value, 10))
      })
    }
  }

  render() {
    const calendar = MCalendar.createAMonth(this.state.year, this.state.month);
    return (
      <div className='calendar-container'>
        <CalendarFormContainer  month={this.state.month} year={this.state.year}
                                onChangeDate={this.handleChangeDate}/>
        <CalendarLayout calendar={calendar} />
      </div>
    )
  }
}