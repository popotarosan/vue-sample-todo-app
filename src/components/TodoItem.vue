<template>
  <div class="todo-container w-100">
    <div @click="displayedModal = true" class="todo-item">
      <div class="task-name">
        <p>{{ todo.taskName }}</p>
      </div>
      <div class="due-date">
        <p>{{ todo.dueDate }}</p>
      </div>
      <div class="status">
        <input
          type="checkbox"
          @click.stop="changeTaskStatus"
          class="checkbox"
          :checked="todo.isDone"
        />
      </div>
    </div>
    <div v-if="displayedModal">
      <div class="modal bg-secondary">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pb-0">
              <h5 class="modal-title" id="exampleModalLongTitle">
                タスク詳細
              </h5>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="updateTask"
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
              <div class="input-error text-danger" v-if="isDisplayedInpErrMsg">
                タスク名を入力してください
              </div>
              <div class="due-date-input mb-3 pt-4">
                <label class="mr-5 align-top">期日</label>
                <input v-model="dueDate" type="date" />
              </div>
              <div class="task-detail">
                <label class="mr-5 align-top">詳細</label>
                <textarea v-model="taskDetail" class="w-100" />
              </div>
            </div>
            <div class="modal-footer justify-content-between ">
              <button
                @click="deleteTask"
                type="button"
                class="float-left text-danger delete-task-btn border-0 bg-white"
                data-dismiss="modal"
              >
                タスク削除
              </button>
              <button
                type="button"
                class="float-right finish-task-btn rounded"
                @click="isDone = !isDone"
                :class="{
                  'task-finished': isDone,
                  'task-not-finished': !isDone
                }"
              >
                {{ statusText }}
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
interface Data {
  id: number
  taskName: string
  dueDate: string
  taskDetail: string
  displayedModal: boolean
  isDone: boolean
  isDisplayedInpErrMsg: boolean
}
import Vue, { PropType } from 'vue'
import { Todo } from '../../types'

export default Vue.extend({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  data() {
    var data: Data = {
      id: 0,
      taskName: '',
      dueDate: '',
      taskDetail: '',
      isDone: false,
      displayedModal: false,
      isDisplayedInpErrMsg: false
    }
    return data
  },
  computed: {
    statusText() {
      if (this.isDone) {
        return '✔完了済み'
      } else {
        return '✔完了にする'
      }
    }
  },
  created() {
    this.id = this.todo.id
    this.taskName = this.todo.taskName
    this.dueDate = this.todo.dueDate.replace(/\//g, '-')
    this.taskDetail = this.todo.taskDetail
    this.isDone = this.todo.isDone
  },
  methods: {
    deleteTask() {
      //TodoItemListコンポーネントにemitでイベント伝播
      this.$emit('task-delete-save-button-click', this.id)
      this.displayedModal = false
    },
    updateTask() {
      if (this.taskName === '') {
        this.isDisplayedInpErrMsg = true
        return
      }
      this.isDisplayedInpErrMsg = false
      const todo: Todo = {
        id: this.id,
        taskName: this.taskName,
        dueDate: this.dueDate,
        taskDetail: this.taskDetail,
        isDone: this.isDone
      }
      this.displayedModal = false
      this.$emit('task-update-button-click', todo)
    },
    changeTaskStatus() {
      this.isDone = !this.isDone
      setTimeout(this.updateTask, 600)
    }
  }
})
</script>
<style scoped lang="scss">
@keyframes click-wave {
  0% {
    position: relative;
    width: 30px;
    height: 30px;
    opacity: 0.35;
  }
  100% {
    width: 200px;
    height: 200px;
    margin-top: -80px;
    margin-left: -80px;
    opacity: 0;
  }
}
.status .checkbox {
  position: relative;
  top: 3px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 15px;
  height: 15px;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out 0s;
  color: #000;
  border: none;
  outline: none;
  background: #fff;
  -webkit-appearance: none;
  appearance: none;
  border: solid 2px #00a5dd;
}
.status .checkbox:hover {
  background: #c2e2ec;
}
.status .checkbox:checked {
  background: white;
}
.status .checkbox:checked::before {
  font-size: 16px;
  line-height: 30px;
  position: absolute;
  bottom: 5px;
  left: -3px;
  display: inline-block;
  width: 20px;
  height: 20px;
  content: '✔';
  text-align: center;
}
.status .checkbox:checked::after {
  position: relative;
  display: block;
  content: '';
  -webkit-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #fff;
}
.status .checkbox.radio {
  border-radius: 50%;
}
.status .checkbox.radio::after {
  border-radius: 50%;
}

.status .checkbox:disabled {
  cursor: not-allowed;
  background: #b8b7b7;
}
.status .checkbox:disabled::before {
  font-size: 20px;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  content: '✖︎';
  text-align: center;
}
.todo-item {
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  -webkit-align-items: center; /* 縦方向中央揃え（Safari用） */
  align-items: center;
  margin-bottom: 20px;
}
.todo-item:hover {
  cursor: pointer;
}
.task-name {
  width: 120px;
  font-size: 12px;
  margin-right: 10px;
  padding-left: 10px;
}
.task-name > p {
  height: 100%;
  margin: 0;
  word-wrap: break-word;
}
.due-date {
  top: 10px;
  position: relative;
  width: 50px;
  font-size: 10px;
  margin-right: 10px;
}
.status {
  width: 20px;
}
.modal {
  display: block;
}
.task-not-finished {
  background-color: #fff;
  color: rgb(187, 187, 187);
  border: solid 1px rgb(187, 187, 187);
}
.task-not-finished:hover {
  color: #00a5dd;
  background-color: #daf4fd;
  border: solid 1px #00a5dd;
}
.delete-task-btn {
  font-size: 12px;
}
.task-finished {
  background-color: #00a5dd;
  color: white;
  border: solid 1px #00a5dd;
}
.task-finished:hover {
  background-color: #0085b1;
  color: white;
  border: solid 1px #0085b1;
}
.input-error {
  font-size: 12px;
}
</style>
