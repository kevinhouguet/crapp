import React from "react";
import Unit from "../../../models/unit/unit";

interface UnitViewProps {
  unit: Unit;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default class UnitView extends React.Component<UnitViewProps> {
  private units: Unit[];
  constructor(props: UnitViewProps) {
    super(props);
    this.units = [new Unit(1), new Unit(4)]
  }

  render(): React.ReactNode {
    const { unit, onClick } = this.props;
    return (
      <>
        <span>Unité horaire: </span>
        {this.units.map((unity) => (
          <button type="button"
            className= {unit.getUnit() === unity.getUnit() ? "btn btn-primary" : "btn btn-outline-primary" }
            key={unity.getUnit()}
            value={unity.getUnit()}
            onClick={onClick}
          >
            {unity.toString()}
          </button>
        ))  
        }
      </>
    )
  }
}