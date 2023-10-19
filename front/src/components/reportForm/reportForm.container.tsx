
import React from "react";
import ClientModel from "../../models/client";
import ClientLayoutContainer from "./client/client.container";
import ProjectLayoutContainer from "./project/project.container";
import UnitLayoutContainer from "./unit/unit.container";

interface IReportFormContainerState {
  clients: ClientModel[];
}

export default class ReportFormContainer extends React.Component <Record<never, string>, IReportFormContainerState>{
  constructor(props = {}) {
    super(props);
  }
  render() {
    return (
      <div>
        <ClientLayoutContainer />
        <ProjectLayoutContainer />
        <UnitLayoutContainer />
      </div>
    );
  }
}