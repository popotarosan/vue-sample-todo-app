import { shallowMount } from '@vue/test-utils'
import HeaderComponent from '@/components/HeaderComponent.vue'

let wrapper
beforeEach(() => {
  wrapper = shallowMount(HeaderComponent)
})

describe('Testing HeaderComponent component', () => {
  it('application name should display', () => {
    const appNameElement = wrapper.find('.navbar-brand')
    expect(appNameElement.text()).toBe('TodoApp')
  })
})
