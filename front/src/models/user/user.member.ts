import Ressource from "../ressource";
import User, { UserProps } from "./user";

export interface MemberUser extends UserProps {
  login(): void;
  logout(): void;
  get(): UserProps;
  save(user: UserProps): Promise<void>;
}

export default class Member extends User {
  private static readonly fetchUrl = Ressource.fetchUrl;

  public login() {
    if(User.isLoggedIn()) {
      throw new Error('User is not logged in');
    } else {
      localStorage.setItem('user', JSON.stringify(this));
    }
  }

  static logout() {
    localStorage.removeItem('user');
  }

  public get() {
    return JSON.parse(localStorage.getItem('user') || '{}') as UserProps;
  }

  public async save(user: UserProps) {
    const httpResponse = await fetch(`${Member.fetchUrl}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    if (httpResponse.status === 200) {
      const response: UserProps = await httpResponse.json();
      localStorage.setItem('user', JSON.stringify(response));
    } else {
      throw new Error(httpResponse.statusText);
    }
  }
}