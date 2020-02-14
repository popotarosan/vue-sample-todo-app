<template>
  <div class="sidebar d-flex flex-column bg-dark text-white">
    <router-link to="/" tag="div">
      <div
        @click="changeMenu"
        :class="{ selected: isSelectedTodo }"
        class="menu-item p-2 pl-3 text-left"
      >
        <span>TODO</span>
      </div>
    </router-link>
    <router-link :to="{ name: 'index', query: { status: 'done' } }" tag="div">
      <div
        @click="changeMenu"
        :class="{ selected: isSelectedDone }"
        class="menu-item p-2 pl-3 text-left"
      >
        <span>DONE</span>
      </div>
    </router-link>
  </div>
</template>

<script type="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return{
      isSelectedTodo:true,
      isSelectedDone:false
    }
  },
  methods: {
    changeMenu(event) {
      const element = event.target
      if (element.classList.contains('selected')){
        return
      }
      this.isSelectedTodo = !this.isSelectedTodo
      this.isSelectedDone = !this.isSelectedDone
      if(this.isSelectedTodo){
        this.$emit('menu-change-button-click', 'todo')
      }else{
        this.$emit('menu-change-button-click', 'done')

      }
    }
  },
  created(){
    if (this.$route.query.status === 'done'){
      this.isSelectedTodo = false
      this.isSelectedDone = true
      this.$emit('menu-change-button-click', 'done')
    }
  }
})
</script>
<style scoped>
.sidebar {
  background-color: #b50099;
  padding-top: 80px;
  width: 300px;
  height: 100%;
}
.selected {
  border-right: solid 5px #00a5dd;
}
.menu-item {
  color: white;
  text-decoration: none;
}
.menu-item:hover {
  background-color: rgb(175, 175, 175);
  cursor: pointer;
}
</style>
