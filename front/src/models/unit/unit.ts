export default class Unit {
  private readonly unit: number;

  constructor(unit: number) {
    this.unit = unit;
  }

  create(unit: number): Unit {
    const validUnit = unit === 1 || unit === 4
    if (!validUnit) {
      throw new Error('Invalid unit');
    }
    return new Unit(unit);
  }

  getUnit(): number {
    return this.unit;
  }

  toString(): string {
    return this.unit === 1 ? 'heure' : 'demi-journée';
  }
}