import React from 'react';
import MonthType from '../../../models/calendar/types/month';
import YearType from '../../../models/calendar/types/year';
import Calendar from '../../../models/calendar/calendar';

interface ICalendarFormContainerProps {
  month: MonthType;
  year: YearType;
  onChangeDate: (month: MonthType, year: YearType) => void;
}

export default class CalendarFormContainer extends React.Component <ICalendarFormContainerProps> {
  constructor(props: ICalendarFormContainerProps) {
    super(props);
  }

  setCurrentMonth(year) {
    const currentMonth = new Date().getMonth() + 1;
    return MonthType.create(currentMonth);
  }

  render() {
    const { month } = this.props;
    const monthName = Calendar.getMonthsShort()[month.month - 1];
    return (
      <form action="">
        <select name="months" id="months">
          {Calendar.getMonths().map((month, index) => {
            return <option key={index} value={index + 1}>{month}</option>
          })}
        </select>
        <select name="years" id="years">
          {Calendar.getYears().map((year, index) => {
            return <option key={index} value={year} {year === new Date().getFullYear ? 'selected' : ''}>{year}</option>
          })}
        </select>
      </form>
    );
  }
}