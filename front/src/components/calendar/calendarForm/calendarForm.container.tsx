import React from 'react';
import Calendar from '../../../models/calendar/calendar';
import MonthType from '../../../models/calendar/types/month';
import YearType from '../../../models/calendar/types/year';

interface ICalendarFormContainerProps {
  month: MonthType;
  year: YearType;
  onChangeDate: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default class CalendarFormContainer extends React.Component <ICalendarFormContainerProps> {
  constructor(props: ICalendarFormContainerProps) {
    super(props);
  }

  render() {
    const { month, year, onChangeDate } = this.props;
    return (
      <form action="">
        <select name="months" id="months"
                value={month.toString()}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeDate(e)}>
          {Calendar.getMonths().map((month, index) => {
            return <option key={index} value={index + 1}>{month}</option>
          })}
        </select>
        <select name="years" id="years"
                value={year.toString()}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeDate(e)}>
          {Calendar.getYears().map((year, index) => {
            return <option key={index} value={year}>{year}</option>
          })}
        </select>
      </form>
    );
  }
}