import React from "react";
import ClientModel from "../../../models/client";

interface ClientViewProps {
  clients: ClientModel[];
}

export default class ClientView extends React.Component <ClientViewProps, ClientModel>{
  render(): React.ReactNode {
    const { clients } = this.props;
    return (
      <>
        <label htmlFor="client">Client :</label>
        <select name="client" id="client" defaultValue={'0'}>
          <option value="0">-- Choisir un client --</option>
          {clients.map((client: ClientModel) => {
            return <option key={client.id} value={client.id}>{client.name}</option>;
          })}
        </select>
        <button onClick={() => console.log('ajout d un client')}>+</button>
      </>
    )
  }
}