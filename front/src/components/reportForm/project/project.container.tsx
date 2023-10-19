import React from "react";
import outputs from "../../../config/outputs";
import { Project } from "../../../models/project/project";
import { IProjectOutputs } from "../../../models/project/project.outputs";
import ProjectView from "./project.view";

interface IProjectLayoutContainerState {
  projects: Project[];
}

export default class ProjectLayoutContainer extends React.Component <Record<never, string>, IProjectLayoutContainerState> {
  private outputsProjectConfig: IProjectOutputs;
  constructor(props = {}) {
    super(props);
    this.outputsProjectConfig = outputs.project.outputs;
    this.state = {
      projects: [],
    };
  }

  async _getAll() {
    const data = await this.outputsProjectConfig.getAll();
    this.setState({
      projects: data,
    });
  }

  componentDidMount(): void {
    this._getAll();
  }

  render() {
    const { projects } = this.state;
    return (
      <div>
        <ProjectView projects={projects}/>
      </div>
    );
  }
}