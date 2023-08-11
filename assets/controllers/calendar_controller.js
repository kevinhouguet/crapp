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
      this.element.innerHTML = this.createCalendar(8, 2023);
    }
    createCalendar(month, year) {
      const date = new Date(year, month - 1, 1);

      const firstDayPosition = date.getDay();
      const numberOfDayOfDate = new Date(year, month, 0).getDate();

      console.log(firstDayPosition, numberOfDayOfDate);

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
      return table.outerHTML; // return html string
    }
}