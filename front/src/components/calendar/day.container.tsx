import React from "react";


export default class DayContainer extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      day: props.day
    }
  }

  handleClickOnAddUnit = () => {
    this.setState({
      day: {
        ...this.state.day,
        unit: this.state.day.unit + 1
      }
    })
  }

  handleClickOnRemoveUnit = () => {
    if(this.state.day.unit === 0) return;
    this.setState({
      day: {
        ...this.state.day,
        unit: this.state.day.unit - 1
      }
    })
  }

  render(): React.ReactNode {
    const { day } = this.state;
    return (
      <div className="calendar__day">
        <div className="calendar__day__dayName">{day.dayName + ' ' + day.day}</div>
        <div className="calendar__day__inputs">
          <button type="button" onClick={this.handleClickOnRemoveUnit}>-</button>
          <input type="text" id={'dayUnit-'+day.day} name="dayUnit" value={day.unit} readOnly/>
          <button type="button" onClick={this.handleClickOnAddUnit}>+</button>
        </div>
      </div>
    )
  }
}