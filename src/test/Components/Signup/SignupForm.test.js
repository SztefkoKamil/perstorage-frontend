import sinon from 'sinon';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import eventBus from '../../../eventBus';
import SignupForm from '../../../components/Signup/SignupForm.vue';

describe('/components/Login/SignupForm.vue', () => {
  it('should contains form', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');

    expect(form.exists()).toBe(true);
  });

  it('form should contain input id="signup-name" type="text" required', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');
    const name = form.find('input#signup-name');

    expect(name.exists()).toBe(true);
    expect(name.attributes().type).toBe('text');
    expect(name.attributes().required).toBe('required');
  });

  it('form should contain input id="signup-email" type="email" required', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');
    const email = form.find('input#signup-email');

    expect(email.exists()).toBe(true);
    expect(email.attributes().type).toBe('email');
    expect(email.attributes().required).toBe('required');
  });

  it('form should contain input id="signup-pass1" type="password" required', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');
    const pass1 = form.find('input#signup-pass1');

    expect(pass1.exists()).toBe(true);
    expect(pass1.attributes().type).toBe('password');
    expect(pass1.attributes().required).toBe('required');
  });

  it('form should contain input id="signup-pass2" type="password" required', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');
    const pass2 = form.find('input#signup-pass2');

    expect(pass2.exists()).toBe(true);
    expect(pass2.attributes().type).toBe('password');
    expect(pass2.attributes().required).toBe('required');
  });

  it('form should contain input id="signup-policy" type="checkbox" required', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');
    const policyCheckbox = form.find('input#signup-policy');

    expect(policyCheckbox.exists()).toBe(true);
    expect(policyCheckbox.attributes().type).toBe('checkbox');
    expect(policyCheckbox.attributes().required).toBe('required');
  });

  it('form should contain button id="show-policy-btn" type="button"', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');
    const policyBtn = form.find('button#show-policy-btn');

    expect(policyBtn.exists()).toBe(true);
    expect(policyBtn.attributes().type).toBe('button');
  });

  it('form should contain button id="signup-submit" type="submit"', () => {
    const wrapper = shallowMount(SignupForm);
    const form = wrapper.find('form');
    const submitBtn = form.find('button#signup-submit');

    expect(submitBtn.exists()).toBe(true);
    expect(submitBtn.attributes().type).toBe('submit');
  });

  it('should call "showPolicy" event via eventBus when "show-policy-btn" has been clicked', () => {
    const emit = sinon.stub(eventBus, '$emit');
    const wrapper = shallowMount(SignupForm);
    const policyBtn = wrapper.find('button#show-policy-btn');
    policyBtn.trigger('click');

    sinon.assert.calledOnceWithExactly(emit, 'showPolicy');
  });

  it('form submit should call postSignup VUEX action with proper data', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const actions = { postSignup: jest.fn((arg1, arg2) => {}) };
    const store = new Vuex.Store({ actions });
    const wrapper = shallowMount(SignupForm, { store, localVue });
    const data = {
      name: 'Tester',
      email: 'test@test.com',
      password: 'password1',
    };

    wrapper.find('#signup-name').setValue(data.name);
    wrapper.find('#signup-email').setValue(data.email);
    wrapper.find('#signup-pass1').setValue(data.password);
    wrapper.find('#signup-pass2').setValue(data.password);
    wrapper.find('#signup-policy').setChecked();
    wrapper.vm.$data.recaptcha = true;
    wrapper.find('form').trigger('submit');

    expect(actions.postSignup).toHaveBeenCalledWith(expect.any(Object), data);
  });
});
