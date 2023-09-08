import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    const navListToken = ['Account', 'Data', 'Your Reports', 'Your Company'];
    const navListElem = document.createElement('ul');
    navListToken.forEach((item, i) => {
      const navListItemElem = document.createElement('li');
      const navListItemLinkElem = document.createElement('a');
      navListItemLinkElem.classList.add('btn');
      navListItemLinkElem.classList.add('btn-link');

      if(i === 0) {
        navListItemLinkElem.classList.add('active');
      }

      navListItemLinkElem.innerText = item;
      navListItemElem.appendChild(navListItemLinkElem);
      navListElem.appendChild(navListItemElem);
    });
    this.element.appendChild(navListElem);
  }
}