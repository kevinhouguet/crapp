const form = {
  create: (method, action, classes = [], dataset) => {
    const formElem = document.createElement('form');
    formElem.method = method;
    formElem.action = action;
    formElem.classList.add(...classes);
    formElem.dataset.action = dataset ? dataset : '';
    return formElem;
  }
}

const input = {
  create: ({type, name, placeholder = '', required = false, classes = [], dataset, attributes = [], value = ''}) => {
    const inputElem = document.createElement('input');
    inputElem.type = type;
    inputElem.name = name;
    inputElem.placeholder = placeholder;
    inputElem.required = required;
    inputElem.classList.add(...classes);
    inputElem.dataset.action = dataset ? dataset : '';
    inputElem.value = value;
    attributes.forEach((attribute) => {
      inputElem.setAttribute(attribute.name, attribute.value);
    });
    return inputElem;
  },
  createLabel: ({forElem, innerText, classes = [], dataset}) => {
    const labelElem = document.createElement('label');
    labelElem.for = forElem;
    labelElem.innerText = innerText;
    labelElem.classList.add(...classes);
    labelElem.dataset.action = dataset ? dataset : '';
    return labelElem;
  },
  /**
   * createInputGroup
   * @param {{type}} Type Type of input
   * @param {{name}} Name Name of input
   * @param {{placeholder}} Placeholder Placeholder of input
   * @param {{required}} Required Required of input
   * @param {{classes}} Classes Classes of input
   * @param {{dataset}} Dataset Dataset of input
   * @param {{labelInfo}} LabelInfo LabelInfo of input
   * @returns HTMLElement
   */
  createInputGroup: ({classes = [], dataset, inputInfo = {}, labelInfo = {}}) => {
    const inputGroupElem = document.createElement('div');
    inputGroupElem.classList.add(...classes);
    inputGroupElem.dataset.action = dataset ? dataset : '';

    const labelElem = input.createLabel(labelInfo);
    const inputElem = input.create(inputInfo);
    inputGroupElem.append(labelElem, inputElem);
    
    return inputGroupElem;
  }
}

export default {
  form,
  input,
};