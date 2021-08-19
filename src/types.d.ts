type NotifyOptions = {
  time?: number;
  style?: "success" | "error" | "prompt";
  target?: HTMLElement;
};

type ConfirmOptions = {
  okText?: string;
  cancelText?: string;
  okHandler?: () => void;
  cancelHandler?: () => void;
  target?: HTMLElement;
};

type PromptOptions = NotifyOptions & {
  okText?: string;
  okHandler?: (data: string) => void;
  cancelHandler?: () => void;
  inputType?: HTMLInputElement["type"];
  placeholder?: string;
  default?: string;
};
