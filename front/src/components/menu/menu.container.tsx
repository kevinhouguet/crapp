import React, { Component } from "react";
import Menu, { IMenuProps } from "./menu.view";
import User from "../../models/user/user";
import Member from "../../models/user/user.member";
import { MenuItem } from "./menuItem";

export default class MenuContainer extends Component <Record<string, never>, IMenuProps>{

  public menuForGuest: MenuItem[] = [{
      displayName: 'Login',
      URL: '/login',
      onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this.onLogin(e)
    }]

  public menuForMember: MenuItem[] = [{
      displayName: 'Profile',
      URL: '/profile',
      onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this.onProfil(e)
    }, {
      displayName: 'Logout',
      URL: '/logout',
      onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this.onLogout(e)
    }];

  constructor(props = {}) {
    super(props);
    this.state = {
      menuItems: this.menuForGuest
    } as IMenuProps;
  }

  isUserLoggedIn(): boolean{
    return User.isLoggedIn();
  }

  setMenuForMember(): void {
    this.setState({
      menuItems: this.menuForMember
    });
  }

  setMenuForGuest(): void{
    this.setState({
      menuItems: this.menuForGuest
    });
  }

  onLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault();
    Member.logout();
    
    this.setMenuForGuest();
  }

  onProfil(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault();
  }

  onLogin(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault();
    if(this.isUserLoggedIn()) {
      return;
    }
    const user = new Member(1,'John Doe', 'jd@gmail.com');
    user.login();
    
    this.setMenuForMember();
  }

  render() {
    return (
      <>
        <Menu menuItems={this.state.menuItems} />
      </>
    );
  }
}