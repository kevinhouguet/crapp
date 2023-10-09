export default class RessourceName {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  public static create(name: string) {
    const validName = RegExp('^[a-zA-Z0-9_]+$');

    if (!validName.test(name)) {
      throw new Error('Invalid name');
    } else {
      return new RessourceName(name);
    }
  }
}