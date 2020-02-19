import { shallowMount } from '@vue/test-utils'
import Index from '@/views/Index.vue'

let wrapper

beforeEach(() => {
  const todoList = [
    {
      id: 1,
      taskName: 'test1',
      dueDate: '2020/02/01',
      isDone: false,
      taskDetail: 'testDetail1'
    },
    {
      id: 2,
      taskName: 'test2',
      dueDate: '2020/02/02',
      isDone: false,
      taskDetail: 'testDetail2'
    },
    {
      id: 3,
      taskName: 'test3',
      dueDate: '2020/02/03',
      isDone: true,
      taskDetail: 'testDetail3'
    }
  ]
  localStorage.setItem('todoList', JSON.stringify(todoList))
  wrapper = shallowMount(Index)
})

describe('Testing Index component', () => {
  //selectedMenuがtodo時に、追加ボタンクリックで、モーダル表示
  it('todoList of data should be match localStorage value', async () => {
    console.log(wrapper.vm.todoList[0].id)
    console.log(localStorage.getItem('todoList'))
    expect(wrapper.vm.todoList).toMatchObject(
      JSON.parse(localStorage.getItem('todoList'))
    )
  })
})
