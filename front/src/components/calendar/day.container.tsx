import React from "react";
import { Day } from "../../models/calendar/calendar";

interface IDayProps {
  day: Day;
}

interface IDayState {
  unit: number;
}

export default class DayContainer extends React.Component <IDayProps, IDayState> {

  constructor(props: IDayProps) {
    super(props);
    this.state = {
      unit: 0,
    }
  }

  handleClickOnAddUnit = () => {
    this.setState({
      unit: this.state.unit + 1
    })
  }

  handleClickOnRemoveUnit = () => {
    if(this.state.unit === 0) return;
    this.setState({
      unit: this.state.unit - 1
    })
  }

  render(): React.ReactNode {
    const { day } = this.props;
    const { unit } = this.state;
    return (
      <div className="calendar__day">
        <div className="calendar__day__dayName">{day.dayName + ' ' + day.day}</div>
        <div className="calendar__day__inputs">
          <button type="button" onClick={this.handleClickOnRemoveUnit}>-</button>
          <input type="text" id={'dayUnit-'+day.day} name="dayUnit" value={unit} readOnly/>
          <button type="button" onClick={this.handleClickOnAddUnit}>+</button>
        </div>
      </div>
    )
  }
}