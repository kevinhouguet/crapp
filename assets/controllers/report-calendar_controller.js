import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

  createCalendar(schedule) {
    // const date = new Date(year, month - 1, 1);

    // let firstDayPosition = date.getDay();
    // if (firstDayPosition === 0) { firstDayPosition = 7; }
    // const numberOfDayOfDate = new Date(year, month, 0).getDate();

    // const days = ['L', 'M', 'Me', 'J', 'V', 'S', 'D'];
    // const table = document.createElement('table');
    // const tbody = document.createElement('tbody');

    // for (let i = 0; i < 7; i++) {
    //   const line = document.createElement('tr');
    //   if (i != 0) { line.classList.add('week'); }

    //   for (let j = 1; j < 8; j++) {
    //     if (i === 0) {
    //       // 
    //       // create header cells
    //       //
    //       const cell = document.createElement('th');
    //       cell.classList.add('cell');
    //       cell.classList.add('cell-header');
    //       cell.textContent = days[j-1];
    //       line.appendChild(cell);
    //     } else {
    //       //
    //       // create days cells
    //       //
    //       const cell = document.createElement('td');
    //       cell.classList.add('cell');
    //       const calc = (i - 1) * 7 + j + 1 - firstDayPosition;

    //       // remove empty cells
    //       cell.textContent = calc > 0 && calc <= numberOfDayOfDate ? calc : '';
          
    //       if(cell.textContent) { 
    //         // add class day to days cells only because we don't want to click on empty cells
    //         cell.classList.add('day');

    //         // add data-action attribute to days cells only
    //         cell.setAttribute('data-action', 'click->calendar#handleClickedDay');
    //       } 

    //       line.appendChild(cell);
    //     }          
    //   }
    //   if(line.textContent !== '') { tbody.appendChild(line); } // remove empty lines
    // }
    // table.appendChild(tbody);
    // return table;
  }

}