export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default class User implements UserProps {
  public id: number;
  public name: string;
  public email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static isLoggedIn() {
    return !!localStorage.getItem('user');
  }
}

