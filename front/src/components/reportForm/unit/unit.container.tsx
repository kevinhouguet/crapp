import React from 'react';
import Unit from '../../../models/unit/unit';
import UnitView from './unit.view';

interface UnitLayoutContainerState {
  unit: Unit;
}

export default class UnitLayoutContainer extends React.Component <Record<never, string>, UnitLayoutContainerState> {
  constructor(props: Record<never, string>) {
    super(props);
    this.state = {
      unit: new Unit(4),
    };
  }

  handleChangeUnit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({
      unit: new Unit(parseInt(e.currentTarget.value, 10)),
    });
  }

  render(): React.ReactNode {
    const { unit } = this.state;
    return (
      <UnitView unit={unit} onClick={this.handleChangeUnit}/>
    )
  }

}
