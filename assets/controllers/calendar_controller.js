import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    static targets = ['daySelected', 'unitOfWorkingActivity'];

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
        if (i != 0) { line.classList.add('week'); }

        for (let j = 1; j < 8; j++) {
          if (i === 0) {
            // 
            // create header cells
            //
            const cell = document.createElement('th');
            cell.classList.add('cell');
            cell.classList.add('cell-header');
            cell.textContent = days[j-1];
            line.appendChild(cell);
          } else {
            //
            // create days cells
            //
            const cell = document.createElement('td');
            cell.classList.add('cell');
            const calc = (i - 1) * 7 + j + 1 - firstDayPosition;

            // remove empty cells
            cell.textContent = calc > 0 && calc <= numberOfDayOfDate ? calc : '';
            
            if(cell.textContent) { 
              // add class day to days cells only because we don't want to click on empty cells
              cell.classList.add('day');

              // add data-action attribute to days cells only
              cell.setAttribute('data-action', 'click->calendar#handleClickedDay');
            } 

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
      yearSelect.addEventListener('change', this.handleOnYearChange);

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
      const year = this.element.querySelector('select.year').value;
      this.element.removeChild(this.element.lastChild);
      this.element.appendChild(this.createCalendar(parseInt(event.target.value) + 1, parseInt(year,10)));
    }

    handleOnYearChange = (event) => {
      const month = this.element.querySelector('select.month').value;
      this.element.removeChild(this.element.lastChild);
      this.element.appendChild(this.createCalendar(parseInt(month) + 1, parseInt(event.target.value,10)));
    }

    handleClickedDay = (event) => {
      // remove selected class on all days
      const dayElements = this.element.querySelectorAll('td.day');
      dayElements.forEach((dayElem) => {
        dayElem.classList.remove('selected');
      });

      // add selected class on clicked day
      const dayElem = event.target;
      dayElem.classList.add('selected');

      // get date selected
      const day = event.target.textContent;
      const month = this.element.querySelector('select.month').value;
      const year = this.element.querySelector('select.year').value;
      const date = new Date(year, month, day);
      console.log(date);
      this.updateViewActivity(date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }

    updateViewActivity = (day) => {
      this.daySelectedTarget.textContent = day;
    }

    submitActivity = (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      console.log('submit form');
      // const url = form.getAttribute('action');
      // const method = form.getAttribute('method');
      // const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      // const headers = new Headers({
      //   'X-CSRF-Token': token
      // });
      // const body = new URLSearchParams(formData.entries());
      // fetch(url, { method, headers, body })
      //   .then(response => response.json())
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
}