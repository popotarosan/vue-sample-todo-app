<template>
  <div class="todo-list-container">
    <div
      class="todo-add w-100 mb-3 d-flex justify-content-end"
      v-if="selectedMenu === 'todo'"
    >
      <button
        @click="displayedModal = true"
        class=" float-right rounded-circle text-white "
      >
        +
      </button>
    </div>
    <div class="todo-list d-flex flex-column">
      <TodoItem
        v-for="todo in filteredTodoList"
        :key="todo.id"
        :todo="todo"
        @task-delete-save-button-click="deleteTask($event)"
        @task-update-button-click="updateTask($event)"
      />
    </div>
    <div v-if="displayedModal">
      <div class="modal bg-secondary">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pb-0">
              <h5 class="modal-title" id="exampleModalLongTitle">
                タスク新規作成<span class="text-danger">(必須)</span>
              </h5>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="displayedModal = false"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="task-name-input w-100">
                <input
                  v-model="taskName"
                  type="text"
                  class="w-100"
                  placeholder="タスク名を入力してください"
                />
              </div>
              <div class="input-error text-danger" v-if="isdisplayed">
                タスク名を入力してください
              </div>
              <div class="due_date mb-3 pt-4">
                <label class="mr-5 align-top">期日</label>
                <input v-model="dueDate" type="date" />
              </div>
              <div class="task-detail">
                <label class="mr-5 align-top">詳細</label>
                <textarea v-model="taskDetail" class="w-100" />
              </div>
            </div>
            <div class="modal-footer justify-content-end ">
              <button
                type="button"
                v-on:click="createTask"
                class=" text-white float-right save-task-btn rounded border-0 pl-3 pr-3"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import { Todo } from '../../types'

export default Vue.extend({
  components: {
    TodoItem
  },
  data() {
    return {
      taskName: '',
      dueDate: '',
      taskDetail: '',
      displayedModal: false,
      isdisplayed: false
    }
  },
  computed: {
    filteredTodoList() {
      const filteredTodoList: Todo[] = []
      this.todoList.forEach((todo, index) => {
        if (this.selectedMenu === 'todo') {
          if (!todo.isDone) {
            filteredTodoList.push(todo)
          }
        }
        if (this.selectedMenu === 'done') {
          if (todo.isDone) {
            filteredTodoList.push(todo)
          }
        }
      })
      return filteredTodoList
    }
  },

  props: {
    todoList: {
      type: Array as PropType<Todo[]>,
      required: true
    },
    selectedMenu: {
      type: String,
      required: true
    }
  },
  methods: {
    createTask() {
      if (this.taskName === '') {
        this.isdisplayed = true
        return
      }
      this.isdisplayed = false
      this.displayedModal = false
      const data: Todo = {
        id: 0,
        isDone: false,
        taskName: this.taskName,
        dueDate: this.dueDate,
        taskDetail: this.taskDetail
      }
      this.$emit('task-save-button-click', data)
      this.taskName = ''
      this.dueDate = ''
      this.taskDetail = ''
    },
    deleteTask(id: number) {
      this.$emit('task-delete-save-button-click', id)
    },
    updateTask(todo: Todo) {
      this.$emit('task-update-button-click', todo)
    }
  }
})
</script>
<style scoped>
.todo-list {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 90%;
}
.todo-add > button {
  width: 30px;
  height: 30px;
  background-color: #00a5dd;
  box-shadow: 2px 2px 2px gray;
  border: none;
}
.modal {
  display: block;
}
.save-task-btn {
  background-color: #00a5dd;
}
.delete-task-btn {
  font-size: 12px;
}
.input-error {
  font-size: 12px;
}
</style>
