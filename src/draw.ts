import { ConfigureOptions } from ".";

const CSS_ = {
  container: "mini-notifier-container",
  notification: "mini-notifier-notification",
  crossBtn: "mini-notifier-notification--cross",
  label: "mini-notifier-notification--label",
  btnsWrapper: "mini-notifier-notification--btns",
  formWrapper: "mini-notifier-notification--form",
  theme: "mini-notifier-theme",
};

export type NotifyOptions = {
  time?: number;
  style?: "success" | "error" | "prompt";
  container?: ConfigureOptions["container"];
  position?: ConfigureOptions["position"];
};

export type ConfirmOptions = NotifyOptions & {
  okText?: string;
  cancelText?: string;
  okHandler?: () => void;
  cancelHandler?: () => void;
  container?: ConfigureOptions["container"];
  position?: ConfigureOptions["position"];
};

export type PromptOptions = NotifyOptions & {
  okText?: string;
  okHandler?: (data: string) => void;
  cancelHandler?: () => void;
  inputType?: HTMLInputElement["type"];
  placeholder?: string;
  default?: string;
};

type PromptLoginOkHandler = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type PromptLoginOptions = NotifyOptions & {
  loginText?: string;
  emailText?: string;
  passwordText?: string;
  loginHandler?: (payload: PromptLoginOkHandler) => void;
  container?: ConfigureOptions["container"];
  position?: ConfigureOptions["position"];
  rememberMe?: boolean;
  rememberMeText?: string;
};

const notify = function notify(
  message: string,
  options: NotifyOptions = {}
): HTMLElement {
  const $notify = document.createElement("div"),
    $cross = document.createElement("div"),
    $message = document.createElement("div"),
    style = options.style;

  const svgCross = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgCross.innerHTML =
    '<path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>';
  svgCross.setAttribute("viewBox", "0 0 352 512");
  svgCross.setAttribute("height", "15");
  $cross.append(svgCross);
  $notify.classList.add(CSS_.notification);

  if (style) {
    $notify.classList.add(CSS_.notification + "--" + style);
  }
  $message.innerHTML = message;

  $notify.append($message);

  $cross.classList.add(CSS_.crossBtn);
  $cross.addEventListener("click", $notify.remove.bind($notify));

  $notify.appendChild($cross);

  return $notify;
};

const confirm = function confirm(
  message: string,
  options: ConfirmOptions = {},
  themePrefix: string
): HTMLElement {
  const $notify = notify(message, options),
    btnsWrapper = document.createElement("div"),
    okBtn = document.createElement("button"),
    cancelBtn = document.createElement("button"),
    crossBtn = $notify.querySelector(`.${CSS_.crossBtn}`),
    cancelHandler = options.cancelHandler,
    okHandler = options.okHandler;

  btnsWrapper.classList.add(CSS_.btnsWrapper);

  okBtn.innerHTML = options.okText || "Valider";
  cancelBtn.innerHTML = options.cancelText || "Annuler";

  okBtn.classList.add(`${themePrefix}-button`, "primary-color", "small");
  cancelBtn.classList.add(`${themePrefix}-button`, "outlined", "small");

  if (cancelHandler && typeof cancelHandler === "function") {
    cancelBtn.addEventListener("click", cancelHandler);
    crossBtn && crossBtn.addEventListener("click", cancelHandler);
  }

  if (okHandler && typeof okHandler === "function") {
    okBtn.addEventListener("click", okHandler);
  }

  okBtn.addEventListener("click", $notify.remove.bind($notify));
  cancelBtn.addEventListener("click", $notify.remove.bind($notify));

  btnsWrapper.append(cancelBtn);
  btnsWrapper.append(okBtn);

  $notify.append(btnsWrapper);

  return $notify;
};

const promptLogin = function promptLogin(
  message: string,
  options: PromptLoginOptions = {},
  themePrefix: string
): HTMLElement {
  const $notify = notify(message, options),
    formWrapper = document.createElement("form"),
    btnsWrapper = document.createElement("div"),
    emailLabel = document.createElement("div"),
    emailInput = document.createElement("input"),
    passwordLabel = document.createElement("div"),
    passwordInput = document.createElement("input"),
    rememberGroup = document.createElement("div"),
    rememberLabel = document.createElement("label"),
    rememberInput = document.createElement("input"),
    loginBtn = document.createElement("button"),
    crossBtn = $notify.querySelector(`.${CSS_.crossBtn}`),
    loginHandler = options.loginHandler;

  $notify.classList.add("login");

  formWrapper.classList.add(CSS_.formWrapper);
  btnsWrapper.classList.add(CSS_.btnsWrapper);

  emailLabel.classList.add(CSS_.label);
  emailLabel.innerHTML = options.emailText || "Email";
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.classList.add(`${themePrefix}-input-text`);

  passwordLabel.classList.add(CSS_.label);
  passwordLabel.innerHTML = options.passwordText || "Mot de passe";
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.classList.add(`${themePrefix}-input-text`);

  loginBtn.innerHTML = options.loginText || "Se connecter";

  loginBtn.classList.add(`${themePrefix}-button`, "primary-color", "small");

  formWrapper.addEventListener("submit", function (e) {
    e.preventDefault();
    if (loginHandler && typeof loginHandler === "function") {
      const payload = {
        email: emailInput.value,
        password: passwordInput.value,
        rememberMe: rememberInput.checked,
      };
      loginHandler(payload);
    }

    $notify.remove();
  });

  if (loginHandler && typeof loginHandler === "function") {
    loginBtn.addEventListener("click", function () {
      loginHandler({
        email: emailInput.value,
        password: passwordInput.value,
        rememberMe: rememberInput.checked,
      });
      $notify.remove();
    });
  }

  // loginBtn.addEventListener("click", $notify.remove.bind($notify));
  crossBtn && crossBtn.addEventListener("click", $notify.remove.bind($notify));

  btnsWrapper.append(loginBtn);
  formWrapper.append(emailLabel, emailInput, passwordLabel, passwordInput);

  if (options.rememberMe) {
    rememberGroup.classList.add(CSS_.label, "remember-me");

    rememberInput.type = "checkbox";
    rememberInput.id = "login-remember-me";
    rememberInput.classList.add(`${themePrefix}-input-checkbox`);

    rememberLabel.innerHTML = options.rememberMeText || "se souvenir";
    rememberLabel.setAttribute("for", "login-remember-me");

    rememberGroup.append(rememberInput, rememberLabel);
    formWrapper.append(rememberGroup);
  }

  formWrapper.append(btnsWrapper);

  $notify.append(formWrapper);

  return $notify;
};

const prompt = function prompt(
  message: string,
  options: PromptOptions = {},
  themePrefix: string
): HTMLElement {
  options.style = "prompt";
  const $notify = notify(message, options),
    btnsWrapper = document.createElement("form"),
    okBtn = document.createElement("button"),
    input = document.createElement("input"),
    crossBtn = $notify.querySelector(`.${CSS_.crossBtn}`),
    cancelHandler = options.cancelHandler,
    okHandler = options.okHandler;

  btnsWrapper.classList.add(CSS_.btnsWrapper);

  okBtn.innerHTML = options.okText || "Valider";
  okBtn.classList.add(`${themePrefix}-button`, "primary-color", "small");
  input.classList.add(`${themePrefix}-input-text`);

  if (options.placeholder) {
    input.setAttribute("placeholder", options.placeholder);
  }

  if (options.default) {
    input.value = options.default;
  }

  if (options.inputType) {
    input.type = options.inputType;
  }

  if (cancelHandler && typeof cancelHandler === "function") {
    crossBtn && crossBtn.addEventListener("click", cancelHandler);
  }

  btnsWrapper.addEventListener("submit", function (e) {
    e.preventDefault();
    if (okHandler && typeof okHandler === "function") {
      okHandler(input.value);
    }
  });

  if (okHandler && typeof okHandler === "function") {
    okBtn.addEventListener("click", function () {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      okHandler!(input.value);
    });
  }

  okBtn.addEventListener("click", $notify.remove.bind($notify));

  btnsWrapper.appendChild(input);
  btnsWrapper.appendChild(okBtn);

  $notify.appendChild(btnsWrapper);

  setTimeout(() => {
    input.focus();
  }, 100);

  return $notify;
};

const createContainer = function (position: ConfigureOptions["position"]) {
  const container = document.createElement("div");

  container.classList.add(CSS_.container, position);
  return container;
};

export { notify, confirm, prompt, promptLogin, createContainer };
