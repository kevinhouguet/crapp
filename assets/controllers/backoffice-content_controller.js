import { Controller } from '@hotwired/stimulus';
import Helper from '../helpers';

export default class extends Controller {

  async connect() {
    console.log('Backoffice content controller connected');
    const activeMenu = document.querySelector('.btn-link.active');
    const userData = await this.getUser();
    console.log(userData);
    switch(activeMenu.innerText) {
      case 'Account':
        this.renderAccount(userData);
        break;
      case 'Data':
        this.renderData(userData);
        break;
      case 'Your Reports':
        this.renderReports(userData);
        break;
      case 'Your Company':
        this.renderCompany(userData);
        break;
      default:
        break;
    }
  }

  async getUser() {
    const token = window.localStorage.getItem('token');
    const httpResponse = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const response = await httpResponse.json();
    return response;
  }

  renderAccount({data}) {
    const accountGeneralInfoElem = Helper.form.create('POST', '', ['account-general-info'], 'submit->backoffice-content#handleUpdateAccountGeneral');
    const accountInputGroupNameElem = Helper.input.createInputGroup({
      'classes': ['input-group'],
      'inputInfo': {
        'type': 'text',
        'name': 'name',
        'placeholder': 'Name',
        'required': true,
        'classes': ['input-group__name', 'input-group--input'],
      },
      'labelInfo': {
        'forElem': 'name',
        'innerText': 'Name',
        'classes': ['input-group__name-label', 'input-group--label'],
      }
    });
    const accountInputGroupSurnameElem = Helper.input.createInputGroup({
      'classes': ['input-group'],
      'inputInfo': {
        'type': 'text',
        'name': 'surname',
        'placeholder': 'Surname',
        'required': true,
        'classes': ['input-group__surname', 'input-group--input'],
      },
      'labelInfo': {
        'forElem': 'surname',
        'innerText': 'Surname',
        'classes': ['input-group__surname-label', 'input-group--label'],
      }
    });
    const accountInputGroupCompanyElem = Helper.input.createInputGroup({
      'classes': ['input-group'],
      'inputInfo': {
        'type': 'text',
        'name': 'company',
        'placeholder': 'Your Company',
        'required': true,
        'classes': ['input-group__company', 'input-group--input'],
      },
      'labelInfo': {
        'forElem': 'company',
        'innerText': 'Your Company',
        'classes': ['input-group__company-label', 'input-group--label'],
      }
    });

    const accountInputGroupEmailElem = Helper.input.createInputGroup({
      'classes': ['input-group'],
      'inputInfo': {
        'type': 'email',
        'name': 'email',
        'placeholder': data.email,
        'required': true,
        'classes': ['input-group__email', 'input-group--input'],
        'attributes': [{name: 'readonly', value: true}],
      },
      'labelInfo': {
        'forElem': 'email',
        'innerText': 'Email',
        'classes': ['input-group__email-label', 'input-group--label'],
      }
    });
    const accountGeneralInfoSubmitElem = Helper.input.create({
      'type': 'submit',
      'name': 'submit',
      'value': 'Send modification',
      'classes': ['input-group__submit', 'input-group--input']
    });

    accountGeneralInfoElem.append(accountInputGroupNameElem, accountInputGroupSurnameElem, accountInputGroupEmailElem, accountInputGroupCompanyElem, accountGeneralInfoSubmitElem);
    this.element.appendChild(accountGeneralInfoElem);

    const accountPasswordFormElem = Helper.form.create('PATCH', '', ['account-password'], 'submit->backoffice-content#handleUpdatePassword');
    const accountInputGroupActualPasswordElem = Helper.input.createInputGroup({
      'classes': ['input-group'],
      'inputInfo': {
        'type': 'password',
        'name': 'password',
        'placeholder': 'Actual Password',
        'required': true,
        'classes': ['input-group__password', 'input-group--input'],
      },
      'labelInfo': {
        'forElem': 'password',
        'innerText': 'Actual Password',
        'classes': ['input-group__password-label', 'input-group--label'],
      }
    });
    const accountInputGroupNewPasswordElem = Helper.input.createInputGroup({
      'classes': ['input-group'],
      'inputInfo': {
        'type': 'password',
        'name': 'newPassword',
        'placeholder': 'New Password',
        'required': true,
        'classes': ['input-group__new-password', 'input-group--input'],
      },
      'labelInfo': {
        'forElem': 'newPassword',
        'innerText': 'New Password',
        'classes': ['input-group__new-password-label', 'input-group--label'],
      }
    });
    const accountInputGroupNewPasswordConfirmElem = Helper.input.createInputGroup({
      'classes': ['input-group'],
      'inputInfo': {
        'type': 'password',
        'name': 'newPasswordConfirm',
        'placeholder': 'Confirm New Password',
        'required': true,
        'classes': ['input-group__new-password-confirm', 'input-group--input'],
      },
      'labelInfo': {
        'forElem': 'newPasswordConfirm',
        'innerText': 'Confirm New Password',
        'classes': ['input-group__new-password-confirm-label', 'input-group--label'],
      }
    });
    const accountPasswordSubmitElem = Helper.input.create({
      'type': 'submit',
      'name': 'changePassword',
      'value': 'Change your password',
      'classes': ['input-group__submit', 'input-group--input'],
    });
    accountPasswordFormElem.append(accountInputGroupActualPasswordElem, accountInputGroupNewPasswordElem, accountInputGroupNewPasswordConfirmElem, accountPasswordSubmitElem);
    this.element.appendChild(accountPasswordFormElem);

    const accountDeleteSubmitElem = Helper.input.create({
      'type': 'button',
      'name': 'delete',
      'value': 'Delete your account',
      'dataset': {'action': 'click->backoffice-content#handleDeleteAccount'},
      'classes': ['input-group__submit', 'input-group--input', 'btn', 'btn-danger'],
    });
    
    this.element.appendChild(accountDeleteSubmitElem);

  }

  async handleUpdateAccountGeneral(event) {
    event.preventDefault();
    const form = event.target;

    const data = new FormData(form);
    // Data structure issue so we need to convert it to json before sending it
    // Issue : API can't read FormData with Method PUT or PATCH 
    const jsondata = {};
    data.forEach((value, key) => jsondata[key] = value);
    
    const httpResponse = await fetch('/api/truc', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(jsondata),
    });
    const response = await httpResponse.json();
    console.log(response);
  }
}