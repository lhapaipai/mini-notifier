# MiniNotifier

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
import miniNotifier from 'mini-notifier';
import 'mini-notifier/dist/style.css';
```


```js
miniNotifier.show('hello world');

miniNotifier.show(message, {
  time: 5000,
  style: 'success|error'
});

miniNotifier.confirm('Are you sure ?', {
  okText: 'Yes',
  cancelText: 'Oh, wait',
  okHandler: () => console.log('ok'),
  cancelHandler: () => console.log('cancel')
});


miniNotifier.prompt('Enter your email', {
  okText: 'Enter',
  okHandler: (data) => console.log('your email:', data),
  inputType: 'email',
  placeholder: 'team@ifmo.su'
})

miniNotifier.show('hello world', {
  target: document.querySelector('#box')
});
```