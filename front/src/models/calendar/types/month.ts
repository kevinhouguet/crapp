export default class MonthType {
  public readonly month: number;
  constructor(month: number) {
    this.month = month;
  }

  public static create(month: number) {
    const validMonth = new RegExp('^[0-9]{1,2}$');

    if(!validMonth.test(month.toString())) {
      throw new Error('Invalid month');
    } else {
      return new MonthType(parseInt(month.toString(), 10));
    }
  }
}