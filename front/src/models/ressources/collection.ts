import IRessource from './';

export interface IRessourceCollection {
  ressources: IRessource[];
}

export default class RessourcesCollection {

  private static fetchUrl = 'http://localhost:3000/ressources';
  private static context = 'reports';

  constructor() {
  }

  static async getAll() {
    const res = await fetch(`${this.fetchUrl}/${this.context}`);
    return await res.json();
  }
}