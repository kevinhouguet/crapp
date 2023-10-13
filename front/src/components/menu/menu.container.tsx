import React, { Component } from "react";
import Menu, { IMenuProps } from "./menu.view";
import User from "../../models/user/user";
import Member from "../../models/user/user.member";

export default class MenuContainer extends Component {

  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      menuItems: [{
        displayName: 'Login',
        URL: '/login',
        onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this.onLogin(e)
      }],
    };
  }

  isUserLoggedIn() {
    return User.isLoggedIn();
  }

  onLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.log('Logout clicked');
    Member.logout();
    this.setState({
      menuItems: [{
        displayName: 'Login',
        URL: '/login',
        onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this.onLogin(e)
      }]
    });
  }

  onProfil(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.log('Profile clicked');
  }

  onLogin = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if(this.isUserLoggedIn()) {
      console.log('User is already logged in')
      return;
    }
    const user = new Member(1,'John Doe', 'jd@gmail.com');
    user.login();
    
    this.setState({
      menuItems: [{
        displayName: 'Profile',
        URL: '/profile',
        onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this.onProfil(e)
      },{
        displayName: 'Logout',
        URL: '/logout',
        onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this.onLogout(e)
      }],
    });

    console.log('Login clicked');
  }

  render() {
    // console.log(this.state.menuItems);
    return (
      <>
        <Menu
          menuItems={this.state.menuItems}
        />
      </>
    );
  }
}