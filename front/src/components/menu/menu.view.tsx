import { Component } from 'react';
import { MenuItem } from './menuItem';

export interface IMenuProps {
  menuItems: MenuItem[];
}

export default class Menu extends Component<IMenuProps, IMenuProps> {
  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      menuItems: this.props.menuItems
    };
  }

  render() {
    const { menuItems } = this.state;
    return (
      <>
        <ul>
          {menuItems.map((item, i) => {
            return <li key={i}><a
              onClick={item.onClick}
              href={item.URL}
              className={item.classes ? item.classes : ''}
            >{item.displayName}</a></li>;
          })}
        </ul>
      </>
    );
  }
}
