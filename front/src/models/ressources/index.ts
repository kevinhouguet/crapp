import RessourceID from "./types/ressourceID";
import RessourceName from "./types/ressourceName";

export interface IRessource {
  name: RessourceName;
  id: RessourceID;
}

export default class Ressources {

  private static fetchUrl = 'http://localhost:3000/ressources';
  private static context = 'reports';

  constructor() {
  }

  static async getAll() {
    const res = await fetch(`${this.fetchUrl}/${this.context}`);
    return await res.json();
  }
}