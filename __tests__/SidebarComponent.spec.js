import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import SidebarComponent from '@/components/SidebarComponent.vue'
import VueRouter from 'vue-router'

// const localVue = createLocalVue()
// localVue.use(VueRouter)
const $route = {
  path: '/',
  query: {
    status: ''
  }
}

let wrapper

beforeEach(() => {
  wrapper = shallowMount(SidebarComponent, {
    stubs: {
      RouterLink: RouterLinkStub
    },
    mocks: {
      $route
    }
  })
})
describe('Testing SidebarComponent component', () => {
  //リンクの確認
  it('intended link should exist ', () => {
    const links = wrapper.findAll(RouterLinkStub)

    expect(links.at(0).props().to).toBe('/')
    expect(links.at(1).props().to.name).toBe('index')
    expect(links.at(1).props().to.query.status).toBe('done')
  })
  //メニューをクリックして、クラスが変化し親コンポーネントにemitが発生するか
  it('menu-item click should change class and emit event', async () => {
    const menuItemTodo = wrapper.findAll('.menu-item').at(0)
    const menuItemDone = wrapper.findAll('.menu-item').at(1)

    expect(menuItemDone.contains('.selected')).toBe(false)

    await menuItemDone.trigger('click')

    expect(wrapper.emitted()['menu-change-button-click'][0][0]).toBe('done')
    expect(menuItemDone.classes()).toContain('selected')
    expect(menuItemTodo.contains('.selected')).toBe(false)

    await menuItemTodo.trigger('click')

    expect(menuItemTodo.classes()).toContain('selected')
    expect(wrapper.emitted()['menu-change-button-click'][1][0]).toBe('todo')
  })
})
