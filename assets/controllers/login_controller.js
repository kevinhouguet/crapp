import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  handleClickLogin(event) {
    console.log('Login button clicked');
    event.preventDefault();
    
    const loginFormLayout = document.createElement('div');
    loginFormLayout.classList.add('login-form-layout');

    const loginForm = document.createElement('form');
    loginForm.method = 'POST';
    loginForm.action = '/api/signin';
    loginForm.classList.add('login-form');
    loginForm.dataset.action = 'submit->login#handleClickSubmit';
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Email';
    emailInput.required = true;
    emailInput.classList.add('login-form__email');
    emailInput.classList.add('login-form--input');
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.required = true;
    passwordInput.classList.add('login-form__password');
    passwordInput.classList.add('login-form--input');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Login';
    submitButton.classList.add('login-form__submit');

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.innerText = 'X';
    closeButton.classList.add('login-form__close');
    closeButton.classList.add('login-form--input');
    closeButton.dataset.action = 'click->login#handleClickClose';
    
    loginForm.appendChild(closeButton);
    loginForm.appendChild(emailInput);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitButton);
    loginFormLayout.appendChild(loginForm);
    this.element.appendChild(loginFormLayout);

    

  }

  async handleClickSubmit(event) {
    event.preventDefault();
    console.log('Submit button clicked');
    console.log(event.target);

    // #TODO : send form data to server
    // #TODO : handle server response
    // #TODO : if login success, redirect to /backoffice
    // #TODO : if login failed, display error message

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
      window.location.href = '/backoffice';
    } else {
      console.error(response.message);
    }
  }

  handleClickClose(event) {
    event.preventDefault();
    event.target.closest('.login-form-layout').remove();
  }
}