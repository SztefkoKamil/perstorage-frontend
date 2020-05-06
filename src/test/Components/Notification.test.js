import { shallowMount } from '@vue/test-utils';
import Notification from '../../components/Notification.vue';

describe('/components/Notification.vue', () => {
  const propsData = { info: { message: 'testing message' } };

  it('should show info.message in span', () => {
    const wrapper = shallowMount(Notification, { propsData });
    const spanText = wrapper.find('span').text();

    expect(spanText).toBe(propsData.info.message);
  });

  it('should add "message" class to div if it is message Notification', () => {
    const wrapper = shallowMount(Notification, { propsData });
    const divClass = wrapper.find('div').attributes().class;

    expect(divClass).toMatch('message');
  });

  it('should add "error" class to div if it is error Notification', () => {
    propsData.info.error = true;
    const wrapper = shallowMount(Notification, { propsData });
    const divClass = wrapper.find('div').attributes().class;

    expect(divClass).toMatch('error');
  });
});
