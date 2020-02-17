import { mount, shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem.vue'

const todo = {
  id: 0,
  taskName: 'test',
  dueDate: '2020/02/02',
  isDone: false,
  taskDetail: 'testDetail'
}

const wrapper = mount(TodoItem, {
  propsData: {
    todo
  }
}) as any
// todo: 型定義したいが一旦any

describe('Testing TodoItem component', () => {
  // 成功する
  it('checkbox click should change todo status', async () => {
    const checkbox = wrapper.find('input')
    const beforeisDone = wrapper.vm.$data.isDone
    checkbox.trigger('click')
    const isDone = wrapper.vm.$data.isDone
    expect(beforeisDone).toEqual(!isDone)
  })

  //以下失敗する
  it('todoItem click should show modal window', () => {
    const todoItemElement = wrapper.find('.todo-item')
    todoItemElement.trigger('click')
    expect(wrapper.contains('.modal')).toBe(true)
  })
})
