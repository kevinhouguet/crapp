import MonthType from "./types/month";
import YearType from "./types/year";

export default class Month {
  public month: MonthType;
  public year: YearType;

  constructor(month: MonthType, year: YearType) {
    this.month = month;
    this.year = year;
  }

  create() {
    const date = new Date(Number(this.year.year), Number(this.month.month) - 1, 1);
    const calendar = [];
    const firstDay = date.getDay();
    const lastDay = new Date(Number(this.year.year), Number(this.month.month), 0).getDate();
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push('');
    }

    for (let i = 1; i <= lastDay; i++) {
      week.push(i);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      calendar.push(week);
    }

    return calendar;
  }
}