import { shallowMount } from '@vue/test-utils'
import TodoItemList from '@/components/TodoItemList.vue'
import TodoItem from '@/components/TodoItem.vue'

let wrapper

beforeEach(() => {
  const todoList = [
    {
      id: 1,
      taskName: 'test1',
      dueDate: '2020-02-01',
      isDone: false,
      taskDetail: 'testDetail1'
    },
    {
      id: 2,
      taskName: 'test2',
      dueDate: '2020-02-02',
      isDone: false,
      taskDetail: 'testDetail2'
    },
    {
      id: 3,
      taskName: 'test3',
      dueDate: '2020-02-03',
      isDone: true,
      taskDetail: 'testDetail3'
    }
  ]
  const selectedMenu = 'todo'
  wrapper = shallowMount(TodoItemList, {
    propsData: {
      todoList,
      selectedMenu
    }
  })
})

describe('Testing TodoItemList component', () => {
  //selectedMenuがtodo時に、追加ボタンクリックで、モーダル表示
  it('add-button click should display modal', async () => {
    const addButton = wrapper.find('.todo-add > button')
    await addButton.trigger('click')
    expect(wrapper.contains('.modal')).toBe(true)
  })
  //新規作成画面の保存ボタンで親コンポーネントにイベントをemit
  it('save-button click should emit event', async () => {
    const addButton = wrapper.find('.todo-add > button')
    await addButton.trigger('click')
    wrapper.find('.task-name-input > input').setValue('newTask')
    wrapper.find('.due_date > input').setValue('2020-02-11')
    wrapper.find('.task-detail > textarea').setValue('newTaskDetail.')
    const saveButton = wrapper.find('.save-task-btn')
    await saveButton.trigger('click')
    console.log(wrapper.emitted())
  })
  //新規作成画面で、タスク名を設定せずに保存ボタン時に、エラー表示
  it('save-button click without filling in the task name should display alert', async () => {
    const addButton = wrapper.find('.todo-add > button')
    await addButton.trigger('click')
    expect(wrapper.contains('.input-error')).toBe(false)
    const saveButton = wrapper.find('.save-task-btn')
    await saveButton.trigger('click')
    expect(wrapper.contains('.input-error')).toBe(true)
  })
  //受け取ったtodoListに応じて、TodoItemをレンダリングする
  it('received todoList props should display properly', () => {
    expect(wrapper.findAll(TodoItem).length).toBe(2)
  })
  //selectedMenuに応じて表示するTodoItemを変更する
  it('change selectedMenu should display TodoItem properly', async () => {
    wrapper.setProps({ selectedMenu: 'todo' })
    expect(wrapper.findAll(TodoItem).length).toBe(2)
    await wrapper.setProps({ selectedMenu: 'done' })
    expect(wrapper.findAll(TodoItem).length).toBe(1)
  })
})
