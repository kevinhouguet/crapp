import { Project } from "./project";

export interface IProjectOutputs {
  getAll(): Promise<Project[]>;
  getOneByID(id: number): Promise<Project>;
  getOneByName(name: string): Promise<Project>;
  addOne(client: Project): Promise<Project>;
  updateOne(client: Project): Promise<Project>;
  deleteOne(client: Project): Promise<Project>;
}