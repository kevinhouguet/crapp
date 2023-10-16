export default class MonthType {
  public readonly month: number;
  constructor(month: number) {
    this.month = month;
  }

  public static create(month: number) {
    const validMonth = new RegExp('\\d{1,2}');

    if(!validMonth.test(month.toString()) || month < 1 || month > 12) {
      throw new Error('Invalid month');
    } else {
      return new MonthType(parseInt(month.toString(), 10));
    }
  }
}