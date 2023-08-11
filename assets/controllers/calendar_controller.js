import { Controller } from '@hotwired/stimulus';

/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
export default class extends Controller {
    connect() {
      this.element.appendChild(this.createHeaderCalendar());
      this.element.appendChild(this.createCalendar(8, 2023));
    }
    
    createCalendar(month, year) {
      const date = new Date(year, month - 1, 1);

      let firstDayPosition = date.getDay();
      if (firstDayPosition === 0) { firstDayPosition = 7; }
      const numberOfDayOfDate = new Date(year, month, 0).getDate();

      const days = ['L', 'M', 'Me', 'J', 'V', 'S', 'D'];
      const table = document.createElement('table');
      const tbody = document.createElement('tbody');

      for (let i = 0; i < 7; i++) {
        const line = document.createElement('tr');
        for (let j = 1; j < 8; j++) {
          if (i === 0) {
            const cell = document.createElement('th');
            cell.textContent = days[j-1];
            line.appendChild(cell);
          } else {
            const cell = document.createElement('td');
            const calc = (i - 1) * 7 + j + 1 - firstDayPosition;

            // remove empty cells
            cell.textContent = calc > 0 && calc <= numberOfDayOfDate ? calc : '';

            line.appendChild(cell);
          }          
        }
        if(line.textContent !== '') { tbody.appendChild(line); } // remove empty lines
      }
      table.appendChild(tbody);
      return table;
    }

    createHeaderCalendar() {
      const headerDiv = document.createElement('div');
      headerDiv.classList.add('calendar-header');

      const monthSelect = this.createMonthsSelect();
      const yearSelect = this.createYearCalendar();

      // add event listener
      monthSelect.addEventListener('change', this.handleOnMonthChange);
      // yearSelect.addEventListener('change', this.handleOnYearChange);

      headerDiv.appendChild(monthSelect);
      headerDiv.appendChild(yearSelect);

      return headerDiv;
    }

    createMonthsSelect() {
      const month = document.createElement('select');
      month.classList.add('month');
      const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
                      'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const currentMonth = new Date().getMonth();
      for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = months[i];
        if (i === currentMonth) {
          option.setAttribute('selected', true);
        }
        month.appendChild(option);
      }
      
      return month;
    }

    createYearCalendar() {
      const year = document.createElement('select');
      year.classList.add('year');
      const currentYear = new Date().getFullYear();
      for (let i = 0; i < 10; i++) {
        const option = document.createElement('option');
        option.value = currentYear - i;
        option.textContent = currentYear - i;
        if (i === 0) { option.selected = true; }
        year.appendChild(option);
      }
      return year;
    }

    handleOnMonthChange = (event) => {
      console.log(event.target.value);
      const year = this.element.querySelector('select.year').value;
      this.element.removeChild(this.element.lastChild);
      this.element.appendChild(this.createCalendar(parseInt(event.target.value) + 1, parseInt(year,10)));
    }
}