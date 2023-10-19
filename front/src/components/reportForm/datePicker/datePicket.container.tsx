import React from "react";

export default class DatePickerLayoutContainer extends React.Component <Record<never, string>>{
  render(): React.ReactNode {
    return (
      <>
        <label htmlFor="date">Date du CRA :</label>
        <input type="date" className="form-control" id="date" placeholder="Date" />
      </>
    );
  }
}