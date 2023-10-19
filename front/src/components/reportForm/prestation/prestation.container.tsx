import React from 'react';

export default class PrestationLayoutContainer extends React.Component <Record<never,string>> {
  render(): React.ReactNode {
    return (
      <div>
        <label htmlFor="prestation">Prestations :</label>
        <textarea className="form-control" id="prestation" rows={3} placeholder="Prestation"></textarea>
      </div>
    );
  }
}