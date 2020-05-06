import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '../../../components/Login/LoginForm.vue';

describe('/components/Login/LoginForm.vue', () => {
  it('should contains form with required email & password inputs & submit button', () => {
    const wrapper = shallowMount(LoginForm);
    const form = wrapper.find('form');
    const email = form.find('input[type="email"]');
    const password = form.find('input[type="password"');
    const button = form.find('button[type="submit"');

    expect(form.exists()).toBe(true);
    expect(email.exists()).toBe(true);
    expect(email.attributes().required).toBe('required');
    expect(password.exists()).toBe(true);
    expect(password.attributes().required).toBe('required');
    expect(button.exists()).toBe(true);
  });

  it('form submit should call postLogin VUEX action with proper data', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const actions = { postLogin: jest.fn((arg1, arg2) => {}) };
    const store = new Vuex.Store({actions});
    const wrapper = shallowMount(LoginForm, {store, localVue});
    const data = {
      email: 'test@test.com',
      password: 'password1'
    };

    wrapper.find('input[type="email"]').setValue(data.email);
    wrapper.find('input[type="password"').setValue(data.password);
    wrapper.find('form').trigger('submit');

    expect(actions.postLogin).toHaveBeenCalledWith(expect.any(Object), data);
  });
});
