const CSS_ = {
  wrapper: 'pentatrion-notifies',
  notification: 'pentatrion-notify',
  crossBtn: 'pentatrion-notify__cross',
  btnsWrapper: 'pentatrion-notify__btns-wrapper'
};

const alert = function alert(message, options) {
  let notify = document.createElement('DIV'),
      cross = document.createElement('DIV'),
      style = options.style;

  let svgCross = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svgCross.innerHTML = '<path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>';
  svgCross.setAttribute('viewBox', '0 0 352 512');
  svgCross.setAttribute('height', 15);
  cross.append(svgCross);
  notify.classList.add(CSS_.notification);

  if (style) {
    notify.classList.add(CSS_.notification + '--' + style);
  }

  notify.innerHTML = message;

  cross.classList.add(CSS_.crossBtn);
  cross.addEventListener('click', notify.remove.bind(notify));

  notify.appendChild(cross);

  return notify;
};

const confirm = function confirm(message, options) {
  let notify = alert(message, options),
      btnsWrapper = document.createElement('div'),
      okBtn = document.createElement('button'),
      cancelBtn = document.createElement('button'),
      crossBtn = notify.querySelector(`.${CSS_.crossBtn}`),
      cancelHandler = options.cancelHandler,
      okHandler = options.okHandler;

  btnsWrapper.classList.add(CSS_.btnsWrapper);

  okBtn.innerHTML = options.okText || 'Valider';
  cancelBtn.innerHTML = options.cancelText || 'Annuler';

  okBtn.classList.add('btn');
  cancelBtn.classList.add('btn', 'outlined');

  if (cancelHandler && typeof cancelHandler === 'function') {
    cancelBtn.addEventListener('click', cancelHandler);
    crossBtn.addEventListener('click', cancelHandler);
  }

  if (okHandler && typeof okHandler === 'function') {
    okBtn.addEventListener('click', okHandler);
  }

  okBtn.addEventListener('click', notify.remove.bind(notify));
  cancelBtn.addEventListener('click', notify.remove.bind(notify));

  btnsWrapper.append(cancelBtn);
  btnsWrapper.append(okBtn);

  notify.append(btnsWrapper);

  return notify;
};

const prompt = function prompt(message, options) {
  options.style = 'prompt';
  let notify = alert(message, options),
      btnsWrapper = document.createElement('form'),
      okBtn = document.createElement('button'),
      input = document.createElement('input'),
      crossBtn = notify.querySelector(`.${CSS_.crossBtn}`),
      cancelHandler = options.cancelHandler,
      okHandler = options.okHandler;

  btnsWrapper.classList.add(CSS_.btnsWrapper);

  okBtn.innerHTML = options.okText || 'Valider';
  okBtn.classList.add('btn');
  input.classList.add('form-input');

  if (options.placeholder) {
    input.setAttribute('placeholder', options.placeholder);
  }

  if (options.default) {
    input.value = options.default;
  }

  if (options.inputType) {
    input.type = options.inputType;
  }

  if (cancelHandler && typeof cancelHandler === 'function') {
    crossBtn.addEventListener('click', cancelHandler);
  }

  btnsWrapper.addEventListener('submit', function (e) {
    e.preventDefault();
    if (okHandler && typeof okHandler === 'function') {
      okHandler(input.value);
    }
  });

  if (okHandler && typeof okHandler === 'function') {
    okBtn.addEventListener('click', function () {
      okHandler(input.value);
    });
  }

  okBtn.addEventListener('click', notify.remove.bind(notify));

  btnsWrapper.appendChild(input);
  btnsWrapper.appendChild(okBtn);

  notify.appendChild(btnsWrapper);

  setTimeout(() => {
    input.focus();
  }, 100);

  return notify;
};

const getWrapper = function getWrapper() {
  let wrapper = document.createElement('DIV');

  wrapper.classList.add(CSS_.wrapper);

  return wrapper;
};

export {
  alert,
  confirm,
  prompt,
  getWrapper
};

