import calendar from './calendar_controller.js';

export default class extends calendar {
    connect() {
      console.log('Hello from activity_controller.js');
    }

    updateView(day) {
      console.log('update');
      console.log('day: ' + day);
    }
  } 