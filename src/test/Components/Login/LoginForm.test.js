import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '../../../components/Login/LoginForm.vue';

describe('/components/Login/LoginForm.vue', () => {
  it('should contain form', () => {
    const wrapper = shallowMount(LoginForm);
    const form = wrapper.find('form');

    expect(form.exists()).toBe(true);
  });

  it('form should contain input id="login-email" type="email" required', () => {
    const wrapper = shallowMount(LoginForm);
    const form = wrapper.find('form');
    const email = form.find('input#login-email');

    expect(email.exists()).toBe(true);
    expect(email.attributes().type).toBe('email');
    expect(email.attributes().required).toBe('required');
  });

  it('form should contain input id="login-pass" type="password" required', () => {
    const wrapper = shallowMount(LoginForm);
    const form = wrapper.find('form');
    const password = form.find('input#login-pass');

    expect(password.exists()).toBe(true);
    expect(password.attributes().type).toBe('password');
    expect(password.attributes().required).toBe('required');
  });

  it('form should contain button type="submit"', () => {
    const wrapper = shallowMount(LoginForm);
    const form = wrapper.find('form');
    const button = form.find('button');

    expect(button.exists()).toBe(true);
    expect(button.attributes().type).toBe('submit');
  });

  it('form submit should call postLogin VUEX action with proper data', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const actions = { postLogin: jest.fn((arg1, arg2) => {}) };
    const store = new Vuex.Store({ actions });
    const wrapper = shallowMount(LoginForm, { store, localVue });
    const data = {
      email: 'test@test.com',
      password: 'password1',
    };

    wrapper.find('input[type="email"]').setValue(data.email);
    wrapper.find('input[type="password"').setValue(data.password);
    wrapper.find('form').trigger('submit');

    expect(actions.postLogin).toHaveBeenCalledWith(expect.any(Object), data);
  });
});
