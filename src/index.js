import './css/index.scss';
import * as draw from './draw';

const bounceInClass = 'pentatrion-notify--bounce-in';
// const bounceInClass = 'pentatrion-notify--translate-in';

let wrappers_ = [];

function prepare_(container = document.body) {
  if (container.dataset.miniNotifier) {
    return wrappers_[+container.dataset.miniNotifier];
  }

  let wrapper = draw.getWrapper();

  if (container === document.body) {
    wrapper.classList.add('fixed')
  };
  let length = wrappers_.push(wrapper);
  container.dataset.miniNotifier = length - 1;
  container.appendChild(wrapper);

  return wrapper;
}

function show(message = '', options = {}) {

  // On construit un élément _wrapper dans document.body
  let wrapper = prepare_(options.target);

  const time = options.time || 5000;

  let notify = draw.alert(message, options);
  // notify : elt DOM du conteneur
  window.setTimeout(function () {
    notify.remove();
  }, time);

  wrapper.appendChild(notify);
  notify.classList.add(bounceInClass);
}

function confirm(message = '', options = {}) {
  let wrapper = prepare_(options.target);

  let notify = draw.confirm(message, options);

  wrapper.appendChild(notify);
  notify.classList.add(bounceInClass);
}

function prompt(message = '', options = {}) {
  let wrapper = prepare_(options.target);

  let notify = draw.prompt(message, options);

  wrapper.appendChild(notify);
  notify.classList.add(bounceInClass);
}

export default {
  show,
  confirm,
  prompt
};