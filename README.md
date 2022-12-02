# miniNotifier

Show notification, confirmation, prompt

## Installation

```
npm install mini-notifier
```

## Utilisation

```html
<link rel="stylesheet" href="dist/style.css">
<script src="dist/mini-notifier.umd.cjs"></script>
<script>
  { notify, prompt, confirm, promptLogin, configure } = miniNotifier;
</script>
```

with a bundler like `vite` or `webpack`.

```js
import { notify, prompt, confirm, promptLogin, configure } from 'mini-notifier';
import 'mini-notifier/dist/style.css';
```

```js
notify('hello world');

notify(message, {
  time: 5000,
  style: 'success|error',
  position: 'top-left'
});

confirm('Are you sure ?', {
  okText: 'Yes',
  cancelText: 'Sorry, no',
  okHandler: () => console.log('ok'),
  cancelHandler: () => console.log('cancel')
});


prompt('Enter your email', {
  okText: 'Enter',
  okHandler: (data) => console.log('your email:', data),
  inputType: 'email',
  placeholder: 'team@ifmo.su'
})

notify('hello world', {
  container: document.querySelector('#box')
});

promptLogin('Login box', {
  okHandler: ({email, password}) => console.log('your email:', email, 'your password', password)
})

configure({
  container: document.body,
  position: 'bottom-left',
  themePrefix: 'penta'
});
```

## Theme

If you want to custom the MiniNotifier theme. You can define your own css vars.


```css
:root {
  --primary-color500: #ffea66;

  --red500: #dc3545;
  --red200: #f8d7da;
  --green500: #2b5229;
  --green200: #e1fae1;

  --border-radius: .25rem;
}
```

in order to integrate as much as possible into your application, no css has been applied to the buttons.

If you want ready-to-go theme you can add `pentatrion-theme` package from npm.

```
import "pentatrion-theme/css/button.scss";
import "pentatrion-theme/css/text-textarea-select.scss";
import "pentatrion-theme/css/variables.scss";
```
