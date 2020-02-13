<template>
  <div class="wrapper">
    <header-component class="header" />
    <div class="content d-flex">
      <SidebarComponent class="sidebar" />
      <TodoItemList
        class="todo-item-list"
        :todoList="todoList"
        v-on:task-save-button-click="createTask($event)"
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
      ]
    }
  },
  created() {
    const todoListStr = localStorage.getItem('todoList')
    if (todoListStr) {
      var todoListObj = JSON.parse(todoListStr)
      this.todoList = todoListObj
    }
  },
  methods: {
    createTask(todo: Todo) {
      todo['dueDate'] = todo['dueDate'].replace(/-/g, '/')
      const index = this.todoList.length
      todo['id'] = index + 1
      this.todoList.push(todo)
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
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
  z-index: 1 !important;
  height: 100%;
  width: 100%;
}
.todo-item-list {
  padding-top: 100px;
  padding-left: 30px;
}
.header {
  position: relative;
  z-index: 3 !important;
}
.sidebar {
  width: 250px;
  height: 100%;
}
.todo-item-list {
  width: 255px;
}
</style>
