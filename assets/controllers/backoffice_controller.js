import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

  connect() {
    console.log('Backoffice controller connected');
    console.log(window.localStorage.getItem('token'));
    const token = window.localStorage.getItem('token');

    const user = this.getUser(token);
  }

  async getUser(id) {
    const httpResponse = await fetch(`/api/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${id}`
      },
    })
    const response = await httpResponse.json();
    if(response.OK){
      console.log(response.data);
    } else {
      console.log(response.message);
    }
  }

}
