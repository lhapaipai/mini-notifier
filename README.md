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
import { notify, prompt, confirm, prepareContainer } from 'mini-notifier';
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

If you want to custom the MiniNotifier theme. You can ask mini-notifier not to load css vars with `prepareContainer`.

```js
import { notify, prepareContainer } from 'mini-notifier';
import 'mini-notifier/dist/style.css';

// Do not inject css vars.
prepareContainer(document.body, false);

notify('hello world');
```

```css
/* add here your custom css vars */
.mini-notifier-container {
  --primary-color: #ffea66;
  --primary-color-dark: #eac800;
  
  --red500: #dc3545;
  --red200: #f8d7da;
  --green500: #2b5229;
  --green200: #e1fae1;
  
  --border-radius: .25rem;
}
```
