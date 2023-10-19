import Client from ".";
import { clientInfrastructureFakes } from "./client.fakes";
import { IClientOutputs } from "./client.outputs";

export default class ClientLocalStorage implements IClientOutputs {

  constructor() {
    if (this.getLocalClients().length === 0) {
      this.setLocalClients(clientInfrastructureFakes);
    }
  }

  getLocalClients(): Client[] {
    const clients = localStorage.getItem('clients');
    return clients ? JSON.parse(clients) : [];
  }

  setLocalClients(clients: Client[]): void {
    localStorage.setItem('clients', JSON.stringify(clients));
  }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.getLocalClients());
    });
  }
  getOneByID(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getOneByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  addOne(client: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateOne(client: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteOne(client: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}