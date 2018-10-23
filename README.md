# Vue bootstrapper

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A teeny-weeny Vue plugin for smoother frontend app bootstrapping

## Installation

```bash
npm install --save vue-bootstrapper
```

## Usage

Import `vue-bootstrapper` in your JS entry point and install it via `Vue.use()`

```js
import Vue from 'vue'
import VueBootstrapper from 'vue-bootstrapper'

Vue.use(VueBootstrapper)
```

You can also override default options when installing it

```js
Vue.use(VueBootstrapper, {
  option: '...'
})
```

The plugin exposes a global `$context` object that can be accessed from any part of the application.

To populate the `$context` you just need to pass `data-*` attributes to the root instance mountpoint, such as

```html
<div
  id="vue-root"
  data-some-string="To the Batmobile!"
>
  ...
</div>
```

This will result in

```js
$vm.$context = {
  someString: 'To the Batmobile!'
}
```

You can seamlessly pass numbers or JSON data as well:

```html
<div
  id="vue-root"
  data-some-number="42"
  data-some-object='{
    "firstApiUrl": "/api/v1/firstApi",
    "secondApiUrl": "/api/v1/secondApi",
    "thirdApiUrls": {
      "a": "/api/v1/thirdA",
      "b": "/api/v1/thirdB"
    }
  }'
>
  ...
</div>
```

That will result in

```js
$vm.$context = {
  someNumber: 42,
  someObject: {
    firstApiUrl: '/api/v1/firstApi',
    secondApiUrl: '/api/v1/secondApi',
    thirdApiUrls: {
      a: '/api/v1/thirdA',
      b: '/api/v1/thirdB'
    }
  }
}
```

## Development

### Launch webpack dev server

```bash
npm run dev
```

### Launch tests with Jest

Launch the `test` command, which will perform linting beforehand

```bash
npm run test
```

### Build

Launch the `build` command, which will output a minified bundle in the `dist` folder

```bash
npm run build
```

## Publishing

TODO

## License

[BSD](https://opensource.org/licenses/BSD-3-Clause)