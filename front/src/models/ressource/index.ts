import RessourceID from "./types/ressourceID";
import RessourceName from "./types/ressourceName";

export interface IRessource {
  name: RessourceName;
  id: RessourceID;
}

export default class Ressource {

  public static readonly fetchUrl = 'http://localhost:3000/ressources';
  public static readonly context = 'reports';

  constructor() {
  }

  static async getAll() {
    const res = await fetch(`${this.fetchUrl}/${this.context}`);
    return await res.json();
  }
}