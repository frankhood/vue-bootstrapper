/* eslint-disable */
// import { mount } from '@vue/test-utils'
import Vue from 'vue/dist/vue.min'
import VueBootstrapper from 'src'

const createRootElement = () => {
  const div = document.createElement('div');
  div.innerHTML = '<div id="vue-main" data-env="1" data-api=\'{"firstApi": "/api/v1/api1","secondApi": "/api/v1/api2"}\' data-more-data="2" data-more-api=\'{"thirdApi": "/api/v1/api3","fourthApi": "/api/v1/api4"}\'></div>'.trim();
  return div.firstChild;
};

Vue.use(VueBootstrapper)
const $el = createRootElement();
const vm = new Vue().$mount($el);

test('Vue gets $context custom property correctly created', () => {
  expect(vm.$context).toBeDefined();
});

test('All data attributes are correctly mapped to the $context object', () => {
  expect(Object.keys(vm.$context).length).toBe(4);
  expect(Object.keys(vm.$context)).toContain('env');
  expect(Object.keys(vm.$context)).toContain('api');
  expect(Object.keys(vm.$context)).toContain('moreData');
  expect(Object.keys(vm.$context)).toContain('moreApi');
});

test('JSON data are correctly parsed', () => {
  expect(typeof vm.$context.api).toBe('object');
  expect(vm.$context.api.firstApi).toBe('/api/v1/api1');
  expect(vm.$context.api.secondApi).toBe('/api/v1/api2');
})

test('Numeric data are correctly parsed', () => {
  expect(typeof vm.$context.env).toBe('number')
  expect(vm.$context.env).toBe(1)
})
