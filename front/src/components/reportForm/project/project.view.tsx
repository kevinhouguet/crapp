import React from "react";
import { Project } from "../../../models/project/project";

interface ProjectViewProps {
  projects: Project[];
}

export default class ProjectView extends React.Component <ProjectViewProps, Project>{
  render(): React.ReactNode {
    const { projects } = this.props;
    return (
      <>
        <label htmlFor="project">Projet :</label>
        <select name="project" id="project" defaultValue={'0'}>
          <option value="0">-- Choisir un projet --</option>
          {projects.map((project: Project) => {
            return <option key={project.id} value={project.id}>{project.name}</option>;
          })}
        </select>
        <button onClick={() => console.log('ajout d un projet')}>+</button>
      </>
    )
  }
}