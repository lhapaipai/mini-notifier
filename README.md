# miniNotifier

Show notification, confirmation, prompt

## Installation

```
npm install mini-notifier
```

## Utilisation

```html
<link rel="stylesheet" href="dist/style.css">
<script src="dist/mini-notifier.umd.js"></script>
```

```js
import { notify, prompt, confirm } from 'mini-notifier';
import 'mini-notifier/dist/style.css';
```

```js
miniNotifier.notify('hello world');

miniNotifier.notify(message, {
  time: 5000,
  style: 'success|error'
});

miniNotifier.confirm('Are you sure ?', {
  okText: 'Yes',
  cancelText: 'Sorry, no',
  okHandler: () => console.log('ok'),
  cancelHandler: () => console.log('cancel')
});


miniNotifier.prompt('Enter your email', {
  okText: 'Enter',
  okHandler: (data) => console.log('your email:', data),
  inputType: 'email',
  placeholder: 'team@ifmo.su'
})

miniNotifier.notify('hello world', {
  target: document.querySelector('#box')
});
```