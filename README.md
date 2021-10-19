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

## Theme

If you want to custom the MiniNotifier theme.

```js
import { notify, prepareContainer } from 'mini-notifier';
import 'mini-notifier/dist/style.css';

// Add custom class `my-theme` to the mini-notifier container.
prepareContainer(document.body, "my-theme");

notify('hello world');
```

```css
.my-theme {
  --primary-color: #ffea66;
  --primary-color-dark: #eac800;
  
  --red: #dc3545;
  --red-light: #f8d7da;
  --green: #2b5229;
  --green-light: #e1fae1;
  
  --border-radius: .25rem;
}
```