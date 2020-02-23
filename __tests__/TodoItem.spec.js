import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem.vue'

let wrapper

beforeEach(() => {
  const todo = {
    id: 0,
    taskName: 'test',
    dueDate: '2020-02-02',
    isDone: false,
    taskDetail: 'testDetail'
  }
  wrapper = shallowMount(TodoItem, {
    propsData: {
      todo
    }
  })
})
describe('Testing TodoItem component', () => {
  it('checkbox click should change todo status', () => {
    const beforeisDone = wrapper.vm.isDone
    const checkbox = wrapper.find('input')

    checkbox.trigger('click')

    const isDone = wrapper.vm.isDone

    expect(beforeisDone).toEqual(!isDone)
  })
  //todoコンポーネントをクリックしたら、モーダルが表示するか
  it('todoItem click should show modal window', async () => {
    const todoItemElement = wrapper.find('.todo-item')

    await todoItemElement.trigger('click')

    expect(wrapper.contains('.modal')).toBe(true)
  })

  //modalで表示されるTodoの初期値が、propsの値であるかどうか
  it('modal window display props properly', async () => {
    //モーダルを開く
    const todoItemElement = wrapper.find('.todo-item')

    await todoItemElement.trigger('click')

    expect(wrapper.find('.task-name-input > input').element.value).toBe(
      wrapper.vm.todo.taskName
    )
    expect(
      wrapper.find('.finish-task-btn').contains('.task-not-finished')
    ).toBe(true)
    expect(wrapper.find('.due-date-input > input').element.value).toBe(
      wrapper.vm.todo.dueDate
    )
    expect(wrapper.find('.task-detail > textarea').element.value).toBe(
      wrapper.vm.todo.taskDetail
    )
  })

  //deleteボタンをクリックしたら、期待される引数でイベントが親コンポーネントにemitされる
  it('delete button click should emit event', async () => {
    const todoItemElement = wrapper.find('.todo-item')

    await todoItemElement.trigger('click')

    const deleteBtn = wrapper.find('.delete-task-btn')

    await deleteBtn.trigger('click')

    expect(wrapper.emitted()['task-delete-save-button-click'][0][0]).toEqual(
      wrapper.vm.todo.id
    )
  })
  //更新ボタン（モーダルを閉じるボタン）をクリックしたら、
  //期待される引数でイベントが親コンポーネントにemitされる
  it('update button click should emit event', async () => {
    const updateTodo = {
      id: 0,
      taskName: 'UpdateTest',
      dueDate: '2020-02-19',
      taskDetail: 'UpdateTaskDetail',
      isDone: true
    }
    //モーダルを開く
    const todoItemElement = wrapper.find('.todo-item')
    await todoItemElement.trigger('click')
    //inputを変更する
    wrapper.find('.task-name-input > input').setValue(updateTodo.taskName)
    wrapper.find('.due-date-input > input').setValue(updateTodo.dueDate)
    wrapper.find('.task-detail > textarea').setValue(updateTodo.taskDetail)
    //タスクステータスを切り替える
    const finishBtn = wrapper.find('.finish-task-btn')

    await finishBtn.trigger('click')

    const updateBtn = wrapper.find('.close')

    await updateBtn.trigger('click')

    expect(wrapper.emitted()['task-update-button-click'][0][0]).toEqual(
      updateTodo
    )
  })
  it('received props display properly', () => {
    expect(wrapper.find('.task-name > p').text()).toBe(wrapper.vm.todo.taskName)
    expect(wrapper.find('.due-date > p').text()).toBe(wrapper.vm.todo.dueDate)
    expect(wrapper.find('.checkbox').element.checked).toBe(
      wrapper.vm.todo.isDone
    )
  })
})
