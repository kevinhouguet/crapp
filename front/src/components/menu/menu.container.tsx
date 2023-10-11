import React, { Component } from "react";
import Menu from "./menu.view";
import { MenuItem } from "./menuItem";
import User from "../../models/user/user";
import Member from "../../models/user/user.member";

export default class MenuContainer extends Component {

  componentDidMount() {
    console.log('Menu component mounted');
    console.log(this.isUserLoggedIn());
  }

  isUserLoggedIn() {
    return User.isLoggedIn();
  }

  onLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.log('Logout clicked');
    Member.logout();
  }

  onProfil(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.log('Profile clicked');
  }

  onLogin = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    console.log('Login clicked');
  }

  render() {
    const menuItemsUserLogged: MenuItem[] = [{
      displayName: 'Profil',
      URL: '/profil',
      onClick: (e) => this.onProfil(e)
    }, {
      displayName: 'Logout',
      URL: '/logout',
      onClick: (e) => this.onLogout(e)
    }];

    const menuItemsUserNotLogged: MenuItem[] = [{
      displayName: 'Login',
      URL: '/login',
      onClick: (e) => this.onLogin(e)
    }];
    return (
      <>
        <Menu
          menuItems={this.isUserLoggedIn() ? menuItemsUserLogged : menuItemsUserNotLogged}
        />
      </>
    );
  }
}