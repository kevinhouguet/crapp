import Calendar, { Day } from "./calendar";
import MonthType from "./types/month";
import YearType from "./types/year";

export default interface IMonth {
  year: number;
  month: number;
  days: Day[];
  getMonthName(): string;
  getMonthNumber(): number;
  getMonthDesign(year: YearType, month: MonthType): Calendar;
  updateMonthDesign(calendar: Calendar): Calendar;
  updateOneDay(day: Day): void;
}

export default class Month implements IMonth {
  year: number;
  month: number;
  days: Day[] = [];
  private lastDay: number;
  constructor({year}: YearType, {month}: MonthType) {
    this.year = year;
    this.month = month;
    this.lastDay = new Date(Number(year), Number(month), 0).getDate();
    
    this.setDaysOfMonth();
  }
  getMonthName(): string {
    return Calendar.getMonths()[Number(this.month) - 1];
  }
  getMonthNumber(): number {
    return Calendar.getMonths().indexOf(this.getMonthName()) + 1;
  }

  setDaysOfMonth(): Day[]{
    for (let i = 1; i <= this.lastDay; i++) {
      const objectDay = {
        dayName: Calendar.getDayName(new Date(Number(this.year), Number(this.month) - 1, i)),
        day: i,
        unit: 0,
        month: Number(this.month),
        year: Number(this.year)
      }

      this.days.push(objectDay);
    }

    return this.days;
  }

  getOneDay(day: number): Day | null {
    const dayExist = this.days.find((dayObject: Day) => dayObject.day === day);
    if (dayExist) {
      return dayExist;
    }
    return null;
  }

  updateDayUnit(day: Day): void {
    const dayExist = this.getOneDay(day.day);
    if (dayExist) {
      dayExist.dayName = day.dayName;
      dayExist.day = day.day;
      dayExist.unit = day.unit;
      dayExist.month = day.month;
      dayExist.year = day.year;
    }
  }

  updateMonthDesign(calendar: Calendar): Calendar {
    return calendar;
  }
}