import "./css/index.css";
import * as draw from "./draw";

const bounceInClass = "mini-notifier_notification--bounce-in";

export function prepareContainer(container = document.body, theme?: string): HTMLElement {
  if (container.dataset.miniNotifier) {
    const elt = document.querySelector<HTMLElement>(`#${container.dataset.miniNotifier}`);
    if (elt) {
      return elt;
    }
  }

  const wrapper = draw.getWrapper(theme);
  wrapper.id = `mini-notifier-container-${Math.floor(Math.random() * 100000)}`;
  if (container === document.body) {
    wrapper.classList.add("fixed");
  }
  container.dataset.miniNotifier = wrapper.id;
  container.appendChild(wrapper);

  return wrapper;
}

export function notify(message = "", options: draw.NotifyOptions = {}): void {
  const wrapper = prepareContainer(options.target);

  const time = options.time || 5000;

  const elt = draw.alert(message, options);
  window.setTimeout(function () {
    elt.remove();
  }, time);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function confirm(message = "", options: draw.ConfirmOptions = {}): void {
  const wrapper = prepareContainer(options.target);

  const elt = draw.confirm(message, options);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function prompt(message = "", options: draw.PromptOptions = {}): void {
  const wrapper = prepareContainer(options.target);

  const elt = draw.prompt(message, options);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}
