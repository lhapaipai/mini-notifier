import "./css/index.scss";
import * as draw from "./draw";

const bounceInClass = "pentation-notification--bounce-in";

let wrappers_ = [];

function prepare_(container = document.body) {
  if (container.dataset.miniNotifier) {
    return wrappers_[+container.dataset.miniNotifier];
  }

  let wrapper = draw.getWrapper();

  if (container === document.body) {
    wrapper.classList.add("fixed");
  }
  let length = wrappers_.push(wrapper);
  container.dataset.miniNotifier = length - 1;
  container.appendChild(wrapper);

  return wrapper;
}

export function notify(message = "", options = {}) {
  let wrapper = prepare_(options.target);

  const time = options.time || 5000;

  let elt = draw.alert(message, options);
  window.setTimeout(function () {
    elt.remove();
  }, time);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function confirm(message = "", options = {}) {
  let wrapper = prepare_(options.target);

  let elt = draw.confirm(message, options);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function prompt(message = "", options = {}) {
  let wrapper = prepare_(options.target);

  let elt = draw.prompt(message, options);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}
