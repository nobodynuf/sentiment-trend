import { shallowMount, mount } from '@vue/test-utils'
import Example from '@/components/Example/index.vue'

describe('Example.vue', () => {

  it('renders a div', () => {
    const wrapper = shallowMount(Example);
    expect(wrapper.contains('v-container')).toBeTruthy();
  })
})

