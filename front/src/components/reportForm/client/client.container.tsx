import React from "react";
import { IClientOutputs } from "../../../models/client/client.outputs";
import outputs from "../../../config/outputs";
import ClientModel from "../../../models/client";
import ClientView from "./client.view";

interface IClientLayoutContainerState {
  clients: ClientModel[];
}

export default class ClientLayoutContainer extends React.Component <Record<never, string>, IClientLayoutContainerState> {
  private outputsClientConfig: IClientOutputs;
  constructor(props = {}) {
    super(props);
    this.outputsClientConfig = outputs.client.outputs;
    this.state = {
      clients: [],
    };
  }

  async _getAll() {
    const data = await this.outputsClientConfig.getAll();
    this.setState({
      clients: data,
    });
  }

  componentDidMount(): void {
    this._getAll();
  }

  render() {
    const { clients } = this.state;
    return (
      <div>
        <ClientView clients={clients}/>
      </div>
    );
  }
}