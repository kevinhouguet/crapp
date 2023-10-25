import MonthType from "./types/month";
import YearType from "./types/year";
import Month from "./month";

export interface Day {
  dayName: string;
  day: number;
  unit: number;
  month: number;
  year: number;
}

export interface ICalendar {
  weeks: Array<Array<Day | null>>;
}

export default class Calendar {

  static locale: string;

  constructor(locale: string) {
    Calendar.locale = locale;
  }

  static getDays() {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  static getMonths() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'];
  }

  static getMonthsShort() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
  }

  static getYears() {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i < currentYear + 2; i++) {
      years.push(i.toString());
    }
    return years;
  }

  static getDayName(date: Date) {
    return date.toLocaleDateString(Calendar.locale, {weekday: 'long'});
  }

  static createAMonth(year: YearType, month: MonthType) {
    return new Month(year, month);
  }
}