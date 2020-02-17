<template>
  <div class="wrapper">
    <header-component class="header" />
    <div class="content d-flex">
      <SidebarComponent
        class="sidebar"
        @menu-change-button-click="changeMenu"
      />
      <TodoItemList
        class="todo-item-list"
        :todoList="todoList"
        @task-save-button-click="createTask($event)"
        @task-delete-save-button-click="deleteTask($event)"
        @task-update-button-click="updateTask($event)"
        :selectedMenu="selectedMenu"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Todo } from '../../types'
import TodoItemList from '@/components/TodoItemList.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
export default Vue.extend({
  components: {
    TodoItemList,
    HeaderComponent,
    SidebarComponent
  },
  data() {
    return {
      todoList: [
        {
          id: 0,
          taskName: '',
          dueDate: '',
          taskDetail: ''
        }
      ],
      selectedMenu: 'todo'
    }
  },
  created() {
    const todoListStr = localStorage.getItem('todoList')
    if (todoListStr) {
      var todoListObj = JSON.parse(todoListStr)
      this.todoList = todoListObj
    } else {
      this.todoList = []
    }
  },
  methods: {
    createTask(todo: Todo) {
      todo['dueDate'] = todo['dueDate'].replace(/-/g, '/')
      const index = this.todoList.length
      todo['id'] = index + 1
      this.todoList.push(todo)
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
    },
    deleteTask(id: number) {
      this.todoList.forEach((todo, index) => {
        if (todo.id === id) {
          this.todoList.splice(index, 1)
        }
      })
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
    },
    updateTask(updatedTodo: Todo) {
      updatedTodo['dueDate'] = updatedTodo['dueDate'].replace(/-/g, '/')
      this.todoList.forEach((todo, index) => {
        if (todo.id === updatedTodo.id) {
          this.todoList.splice(index, 1, updatedTodo)
        }
      })
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
    },
    changeMenu(menu: string) {
      this.selectedMenu = menu
    }
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  height: 100vh;
}
.content {
  position: absolute;
  top: 0px;
  z-index: 1;
  height: 100%;
  width: 100%;
}
.todo-item-list {
  padding-top: 100px;
  padding-left: 30px;
}
.header {
  position: relative;
  z-index: 3;
}
.sidebar {
  width: 250px;
  height: 100%;
}
.todo-item-list {
  width: 255px;
}
</style>
