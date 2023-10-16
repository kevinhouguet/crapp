import Month from "./types/month";
import Year from "./types/year";

export default class Calendar {
  public days: string[];
  public months: string[];
  public years: string[];

  constructor() {
    this.days = this.getDays();
    this.months = this.getMonths();
    this.years = this.getYears();
  }

  getDays() {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  getMonths() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'];
  }

  getYears() {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i < currentYear + 2; i++) {
      years.push(i.toString());
    }
    return years;
  }

  createAMonth({year}: Year, {month}: Month) {
    const date = new Date(Number(year), Number(month) - 1, 1);
    const calendar = [];
    
    // +6 because getDay() returns 0 for Sunday, 1 for Monday, etc.
    // and we want to start the week on Monday
    const firstDay = date.getDay() + 6;

    const lastDay = new Date(Number(year), Number(month), 0).getDate();
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