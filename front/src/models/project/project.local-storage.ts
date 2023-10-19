import { Project } from "./project";
import { projectInfrastructureFakes } from "./project.fakes";
import { IProjectOutputs } from "./project.outputs";

export default class ProjectLocalStorage implements IProjectOutputs {

  constructor() {
    if (this.getLocalProjects().length === 0) {
      this.setLocalProjects(projectInfrastructureFakes);
    }
  }

  getLocalProjects(): Project[] {
    const project = localStorage.getItem('projects');
    return project ? JSON.parse(project) : [];
  }

  setLocalProjects(project: Project[]): void {
    localStorage.setItem('projects', JSON.stringify(project));
  }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.getLocalProjects());
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