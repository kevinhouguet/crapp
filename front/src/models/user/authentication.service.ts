
import Ressource from "../ressource";
import { UserLogin, UserRegister } from "./user";
import Member from "./user.member";
import UserOutputs from "./user.outputs";

export default class AuthenticationService {

  private static readonly fetchUrl = Ressource.fetchUrl;

  static async login(user: UserLogin) {
    const httpResponse = await fetch(`${this.fetchUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    if (httpResponse.status === 200) {
      const response: UserOutputs = await httpResponse.json();
      const user = new Member(response.id, response.name, response.email);
      user.login();
      return user;
    } else {
      throw new Error(httpResponse.statusText);
    }

  }

  static async logout() {
    const httpResponse = await fetch(`${this.fetchUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (httpResponse.status === 200) {
      Member.logout();
    } else {
      throw new Error(httpResponse.statusText);
    }

  }

  static async register(user: UserRegister) {
    const httpResponse = await fetch(`${this.fetchUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    if(httpResponse.status === 200){
      const response: UserOutputs = await httpResponse.json();
      const user = new Member(response.id, response.name, response.email);
      user.login();
      return user;
    }
  }
}