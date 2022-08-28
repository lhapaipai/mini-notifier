import "./css/index.scss";

import * as draw from "./draw";
import { snakeToPascal } from "./strUtil";

const bounceInClass = "mini-notifier-notification--bounce-in";

export type ConfigureOptions = {
  container: HTMLElement;
  position:
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right"
    | "center";
  themePrefix: string;
};

let defaultContainer: ConfigureOptions["container"] = document.body;
let defaultPosition: ConfigureOptions["position"] = "bottom-left";
let defaultThemePrefix: ConfigureOptions["themePrefix"] = "penta";

export function configure(options: Partial<ConfigureOptions> = {}) {
  if (options.container) {
    defaultContainer = options.container;
  }
  if (options.position) {
    defaultPosition = options.position;
  }
  if (options.themePrefix) {
    defaultThemePrefix = options.themePrefix;
  }
}

function getContainer(
  container = defaultContainer,
  position = defaultPosition
): HTMLElement {
  const key = `miniNotifier${snakeToPascal(position)}`;
  if (container?.dataset[key]) {
    const elt = document.querySelector<HTMLElement>(
      `#${container.dataset[key]}`
    );
    if (elt) {
      return elt;
    }
  }

  const box = draw.createContainer(position);
  box.id = `mini-notifier-container-${Math.floor(Math.random() * 100000)}`;
  if (container === document.body) {
    box.classList.add("fixed");
  }
  container.dataset[key] = box.id;
  container.appendChild(box);

  return box;
}

export function notify(message = "", options: draw.NotifyOptions = {}): void {
  const wrapper = getContainer(options.container, options.position);

  const time = options.time || 5000;

  const elt = draw.notify(message, options);
  window.setTimeout(function () {
    elt.remove();
  }, time);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function confirm(message = "", options: draw.ConfirmOptions = {}): void {
  const wrapper = getContainer(options.container, options.position);

  const elt = draw.confirm(message, options, defaultThemePrefix);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}

export function prompt(message = "", options: draw.PromptOptions = {}): void {
  const wrapper = getContainer(options.container, options.position);

  const elt = draw.prompt(message, options, defaultThemePrefix);

  wrapper.appendChild(elt);
  elt.classList.add(bounceInClass);
}
