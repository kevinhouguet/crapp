export default class YearType {
  public readonly year: number;
  constructor(year: number) {
    this.year = year;
  }

  public static create(year: number) {
    const validYearType = new RegExp('^[0-9]{4}$');
    const validYearValue = year >= (new Date().getFullYear() - 2) && year <= (new Date().getFullYear() + 2);

    if(!validYearType.test(year.toString()) || !validYearValue) {
      throw new Error('Invalid month');
    } else {
      return new YearType(parseInt(year.toString(), 10));
    }
  }
}