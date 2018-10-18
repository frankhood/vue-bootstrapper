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

[MIT](http://opensource.org/licenses/MIT)