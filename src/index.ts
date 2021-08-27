import "./css/index.css";
import * as draw from "./draw";

const bounceInClass = "pentatrion-notification--bounce-in";

const wrappers_: HTMLElement[] = [];

function prepare_(container = document.body) {
  if (container.dataset.miniNotifier) {
    return wrappers_[+container.dataset.miniNotifier];
  }

  const wrapper = draw.getWrapper();

  if (container === document.body) {
    wrapper.classList.add("fixed");
  }
  const length = wrappers_.push(wrapper);
  container.dataset.miniNotifier = (length - 1).toString();
  container.appendChild(wrapper);

  return wrapper;
}

export function notify(message = "", options: draw.NotifyOptions = {}): void {
  const wrapper = prepare_(options.target);

  const time = options.time || 5000;

  const elt = draw.alert(message, options);
  window.setTimeout(function () {
    elt.remove();
  }, time);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function confirm(message = "", options: draw.ConfirmOptions = {}): void {
  const wrapper = prepare_(options.target);

  const elt = draw.confirm(message, options);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function prompt(message = "", options: draw.PromptOptions = {}): void {
  const wrapper = prepare_(options.target);

  const elt = draw.prompt(message, options);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}
