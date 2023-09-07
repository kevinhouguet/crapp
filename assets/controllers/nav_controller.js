import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

  connect() {
    if(!window.localStorage.getItem('token')) {
      const listElem = document.createElement('li');
      const linkElem = document.createElement('a');
      linkElem.classList.add('btn-secondary');
      linkElem.dataset.action = 'click->nav#handleClickLogin';
      linkElem.innerText = 'Login';
      listElem.appendChild(linkElem);
      this.element.appendChild(listElem);
    } else {
      const optionListElem = document.createElement('li');
      const optionLinkElem = document.createElement('a');
      optionLinkElem.classList.add('btn');
      optionLinkElem.classList.add('btn-link');
      optionLinkElem.href = '/backoffice';
      optionLinkElem.innerText = 'Options';
      optionListElem.appendChild(optionLinkElem);

      const logoutListElem = document.createElement('li');
      const logoutLinkElem = document.createElement('a');
      logoutLinkElem.classList.add('btn');
      logoutLinkElem.classList.add('btn-link');
      logoutLinkElem.dataset.action = 'click->nav#handleClickLogout';
      logoutLinkElem.innerText = 'Logout';
      logoutListElem.appendChild(logoutLinkElem);

      this.element.appendChild(optionListElem);
      this.element.appendChild(logoutListElem);
    } 
  }

  handleClickLogin(event) {
    console.log('Login button clicked');
    event.preventDefault();
    
    const loginFormBackground = document.createElement('div');
    loginFormBackground.classList.add('login-form-background');
    const loginFormLayout = document.createElement('div');
    loginFormLayout.classList.add('login-form-layout');

    this.createForm({'method': 'POST', 'action': '/api/signin'},'signin', 'submit->nav#handleClickSignin', loginFormLayout);
    this.createForm({'method': 'POST', 'action': '/api/signup'},'signup', 'submit->nav#handleClickSignup', loginFormLayout);
    this.createButton({'type': 'button', 'innerText': 'Close', 'className': ['login-form-layout__close'], 'dataset': {'action': 'click->nav#handleClickClose'}, 'parent': loginFormLayout});

    loginFormBackground.appendChild(loginFormLayout);
    this.element.appendChild(loginFormBackground);

  }

  createForm({method, action}, className, dataset, parent) {
    const form = document.createElement('form');
    form.method = method;
    form.action = action;
    form.classList.add(`${className}-form`);
    form.dataset.action = dataset;

    this.createInput({type: 'email', name: 'email', placeholder: 'Email', required: true, className: [`${className}-form__email`, `${className}-form--input`], parent: form});
    this.createInput({type: 'password', name: 'password', placeholder: 'Password', required: true, className: [`${className}-form__password`, `${className}-form--input`], parent: form});
    this.createButton({type: 'submit', innerText: `${className}`, className: [`${className}-form__submit`], parent: form});

    parent.appendChild(form);
    return form;
  }

  createInput({type, name, placeholder = '', required = false, className = [''], parent}) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.required = required;
    className.forEach((className) => {
      input.classList.add(className);
    });
    parent.appendChild(input);
    return input;
  }

  createButton({type, innerText, className = [''], parent, dataset = {}}) {
    const button = document.createElement('button');
    button.type = type;
    button.innerText = innerText;
    if(dataset) {
      button.dataset.action = dataset.action;
    }
    className.forEach((className) => {
      button.classList.add(className);
    });
    parent.appendChild(button);
    return button;
  }

  async handleClickSignin(event) {
    event.preventDefault();
    console.log('Submit button clicked');
    console.log(event.target);

    const data = new FormData(event.target);
    const url = event.target.action;
    const method = event.target.method;

    const httpResponse = await fetch(url, {
      method: method,
      body: data
    })

    const response = await httpResponse.json();
    console.log(response);
    if(response.OK) {
      window.localStorage.setItem('token', response.token);
      window.location.reload();
    } else {
      console.error(response.message);
    }
  }

  async handleClickSignup(event) {
    event.preventDefault();
    console.log('Submit button clicked');
    console.log(event.target);

    const data = new FormData(event.target);
    const url = event.target.action;
    const method = event.target.method;

    const httpResponse = await fetch(url, {
      method: method,
      body: data
    })

    const response = await httpResponse.json();
    console.log(response);
    if(response.OK) {
      window.localStorage.setItem('token', response.token);
      window.location.reload();
    } else {
      console.error(response.message);
    }
  }

  handleClickClose(event) {
    event.preventDefault();
    event.target.closest('.login-form-background').remove();
  }

  handleClickLogout(event) {
    event.preventDefault();
    console.log('Logout button clicked');
    window.localStorage.removeItem('token');
    window.location.reload();
  }
}