export default class RessourceID {
  public readonly id: string;
  constructor(id: string) {
    this.id = id;
  }

  public static create(id: string) {
    const validID = RegExp('^[a-zA-Z0-9]+$');

    if (!validID.test(id.toString())) {
      throw new Error('Invalid id');
    } else {
      return new RessourceID(id);
    }
  }
}