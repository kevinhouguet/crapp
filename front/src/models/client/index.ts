import { IClient } from "./client";

export default class ClientModel implements IClient {
  public id: number;
  public name: string;

  constructor(client: IClient) {
    this.id = client.id;
    this.name = client.name;
  }

  public static async getAll() {
    const res = await fetch(`http://localhost:3000/api/clients`);
    return await res.json();
  }
}