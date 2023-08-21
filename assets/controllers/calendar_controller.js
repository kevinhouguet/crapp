import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    static targets = ['daySelected', 'unitOfWorkingActivity', 'customers'];

    unitChoose = 0;

    cache = [] // cache data of activity;

    calendarElement = this.element.querySelector('#calendar');

    connect() {
      this.calendarElement.appendChild(this.createHeaderCalendar());
      this.calendarElement.appendChild(this.createCalendar(8, 2023));
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
      this.calendarElement.removeChild(this.calendarElement.lastChild);
      this.calendarElement.appendChild(this.createCalendar(parseInt(event.target.value) + 1, parseInt(year,10)));
    }

    handleOnYearChange = (event) => {
      const month = this.element.querySelector('select.month').value;
      this.calendarElement.removeChild(this.calendarElement.lastChild);
      this.calendarElement.appendChild(this.createCalendar(parseInt(month) + 1, parseInt(event.target.value,10)));
    }

    handleClickedDay = (event) => {

      this.updateCacheActivity();

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
      this.updateViewActivity(date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }));

      // get activity of date selected

      const alreadyInCache = this.cache.find((obj) => {
        return obj.day === day;
      });
      if(alreadyInCache) {
        const activity = this.element.querySelector('#activity');
        const customers = this.element.querySelector('#customers');
        const project = this.element.querySelector('#project');
        const tasks = this.element.querySelector('#tasks');

        activity.value = alreadyInCache.activity;
        customers.value = alreadyInCache.customers;
        project.value = alreadyInCache.project;
        tasks.value = alreadyInCache.tasks;
      }
    }

    updateViewActivity = (day) => {
      this.daySelectedTarget.textContent = day;
    }

    submitActivity = (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      console.log('submit form');
      console.log(formData);
      const url = form.getAttribute('action');
      const method = form.getAttribute('method');
      // const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      // const headers = new Headers({
      //   'X-CSRF-Token': token
      // });
      const body = new URLSearchParams(formData.entries());
      fetch(url, { method, body })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    handleAddNewCustomer = (event) => {
      alert('add new customer');
    }

    updateCacheActivity = () => {
      if(this.element.querySelector('td.selected')){
        const daySelected = this.element.querySelector('td.selected');
        const activity = this.element.querySelector('#activity');
        const customers = this.element.querySelector('#customers');
        const project = this.element.querySelector('#project');
        const tasks = this.element.querySelector('#tasks');

        const alreadyInCache = this.cache.find((obj) => {
          return obj.day === daySelected.textContent;
        });

        if(alreadyInCache) {
          alreadyInCache.activity = activity.value;
          alreadyInCache.customers = customers.value;
          alreadyInCache.project = project.value;
          alreadyInCache.tasks = tasks.value;
        }
        else {

          if(activity.value != '' && customers.value != '' && project.value != '' && tasks.value != '') {
            const obj = { 
              day : daySelected.textContent, 
              activity : activity.value, 
              customers : customers.value, 
              project : project.value, 
              tasks : tasks.value
            };
            
            this.cache.push(obj); // add new activity in cache
    
          }
        }
        activity.value = 1;
        customers.value = '';
        project.value = '';
        tasks.value = '';
        console.log(this.cache);
      }
    }

    handleClickUnit = (event) => {
      event.preventDefault();
      const unitChooses = this.element.querySelectorAll('.unitChoose');
      unitChooses.forEach((unitChoose) => {
        unitChoose.classList.remove('unitChoose-active');
      });
      const unitChoose = event.target;
      unitChoose.classList.add('unitChoose-active');

      this.unitChoose = unitChoose.dataset.value;
    }
}