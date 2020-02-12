<template>
  <div class="sidebar d-flex flex-column bg-dark text-white">
    <div
      :class="{ selected: isSelectedTodo }"
      class="menu-item p-2 pl-3 text-left"
    >
      <span>TODO</span>
    </div>
    <div
      :class="{ selected: isSelectedDone }"
      class="menu-item p-2 pl-3 text-left"
    >
      <span>DONE</span>
    </div>
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
.menu-item:hover {
  background-color: rgb(175, 175, 175);
  cursor: pointer;
}
</style>
