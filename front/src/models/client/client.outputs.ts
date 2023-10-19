import { IClient } from "./client";

export interface IClientOutputs {
  getAll(): Promise<IClient[]>;
  getOneByID(id: number): Promise<IClient>;
  getOneByName(name: string): Promise<IClient>;
  addOne(client: IClient): Promise<IClient>;
  updateOne(client: IClient): Promise<IClient>;
  deleteOne(client: IClient): Promise<IClient>;
}