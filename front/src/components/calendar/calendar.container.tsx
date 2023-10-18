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

  selectADay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const dayPreviouslySelected = document.querySelector('.day-selected');
    dayPreviouslySelected?.classList.remove('day-selected');
    
    const day = e.currentTarget;
    day.classList.add('day-selected')
  }

  handleChangeDate = (month: MonthType, year: YearType) => {
    this.setState({
      month,
      year
    })
  }

  render() {
    return (
      <div className='calendar-container'>
        <CalendarFormContainer  month={this.state.month} year={this.state.year}
                                onChangeDate={this.handleChangeDate}/>
        <CalendarLayout calendar={MCalendar.createAMonth(this.state.year, this.state.month)}
                        onClick= {this.selectADay} />
      </div>
    )
  }
}