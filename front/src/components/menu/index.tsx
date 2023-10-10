import { Component } from 'react';

export type MenuItem = {
  displayName: string;
  URL: string;
  classes?: string;
  onClick: () => void;
}

export interface IMenuProps {}

export default class Menu extends Component<IMenuProps, IMenuProps> {
  public menuItems: MenuItem[];

  constructor() {
    super({});
    this.menuItems = this.getMenuItem();
  }

  componentDidMount() {
    console.log('Menu component mounted');
    console.log(this.menuItems);
  }

  getMenuItem() {
    return [{
      displayName: 'Home',
      URL: '/',
      onClick: () => { console.log('Home clicked'); }
    }, {
      displayName: 'About',
      URL: '/about',
      onClick: () => { console.log('About clicked'); }
    }, {
      displayName: 'Contact',
      URL: '/contact',
      onClick: () => { console.log('Contact clicked'); }
    }];
  }

  render() {
    return (
      <>
        <ul>
          {this.menuItems.map((item, i) => {
            return <li key={i}><a
              href={item.URL}
              className={item.classes ? item.classes : ''}
            >{item.displayName}</a></li>;
          })}
        </ul>
      </>
    );
  }
}
