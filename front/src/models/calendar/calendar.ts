import Month from "./types/month";
import Year from "./types/year";

export interface Day {
  dayName: string;
  day: number;
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

  static createAMonth({year}: Year, {month}: Month) {
    const date = new Date(Number(year), Number(month) - 1, 1);
    const calendarOfTheMonth = [];
    
    // +6 because getDay() returns 0 for Sunday, 1 for Monday, etc.
    // and we want to start the week on Monday
    const firstDayPosition = date.getDay() === 0 ? date.getDay() + 6 : date.getDay() - 1;

    const lastDay = new Date(Number(year), Number(month), 0).getDate();

    let week = [];
    for (let i = 0; i < firstDayPosition; i++) {
      week.push(null);
    }

    for (let i = 1; i <= lastDay; i++) {
      const objectDay = {
        dayName: this.getDayName(new Date(Number(year), Number(month) - 1, i)),
        day: i,
        month: Number(month),
        year: Number(year)
      }

      week.push(objectDay);

      if (week.length === 7) {
        calendarOfTheMonth.push(week);
        week = [];
      }
    }

    if(week.length < 7) {
      for (let i = week.length; i < 7; i++) {
        week.push(null);
      }
    }

    if (week.length > 0) {
      calendarOfTheMonth.push(week);
    }

    return calendarOfTheMonth;
  }
}