<template>
  <div class="wrapper">
    <header-component class="header" />
    <div class="content d-flex ">
      <SidebarComponent class="sidebar" />
      <TodoItemList class="todo-item-list" :todoList="todoList" />
    </div>
  </div>
</template>

<script>
import TodoItemList from '@/components/TodoItemList.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
export default {
  components: {
    TodoItemList,
    HeaderComponent,
    SidebarComponent
  },
  data() {
    return {
      todoList: [
        {
          id: 1,
          title: '7時に起きる',
          isDone: false
        }
      ]
    }
  }
}
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
  display: -webkit-flex;
  -webkit-align-items: stretch;
  align-items: stretch;
  // text-align: center;
  padding-top: 100px;
  padding-left: 30px;
}
.header {
  // height: 5vh;
  position: relative;
  z-index: 3 !important;
}
.sidebar {
  // position: absolute;
  width: 250px;
  height: 100%;
}
.todo-item-list {
  width: 100%;
}
</style>
