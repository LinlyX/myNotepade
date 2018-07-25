<template>
    <div class="real-app">
        <div class="tab-container">
          <tabs :value="filter" @change="handleChangeTab">
            <tab :lable="tab" :index="tab" v-for="tab in states" :key="tab" />
          </tabs>
        </div>
        <input
           type="text"
           class="add-input"
           placeholder="接下来要做的事情"
           autofocus="autofocus"
           @keyup.enter="addTodo">
        <item v-for="todo in filterTodos"
              :key="todo.id"
              :todo="todo"
              @del="deleteThis"/>
        <helper
            :todos="todos"
            :filter="filter"
            @clearAllCompleted="clearAllCompleted()"/>
        <!-- <router-view /> -->
    </div>
</template>

<script>
import item from './item.vue'
import helper from './helper.vue'
export default {
  data () {
    return {
      todos: [],
      allCounts: 0,
      filter: '未完成',
      id: 0,
      states: ['未完成', '已完成', '已取消']
    }
  },
  components: {
    item, helper
  },
  computed: {
    filterTodos () {
      if (this.filter === '未完成') { return this.todos }
      const completed = this.filter === '已完成'
      return this.todos.filter(item => item.completed === completed)
    }
  },
  methods: {
    addTodo (e) {
      if (e.target.value === '') {
        this.$notify({
          content: '不能为空！',
          btn: '关闭'
        })
        return
      }
      if (e.target.value !== '') {
        this.todos.unshift({
          id: this.id++,
          content: e.target.value.trim(),
          completed: false
        })
        this.$notify({
          content: '您有一件新的代办事项',
          btn: '关闭'
        })
      }
      e.target.value = ''
      this.allCounts = this.todos.length
    },
    deleteThis (id) {
      this.todos.splice(this.todos.findIndex(obj => { return obj.id === id }), 1)
      this.$notify({
        content: '您清除了一件事情',
        btn: '关闭'
      })
    },
    clearAllCompleted (active) {
      const ids = this.todos.filter(item => item.completed === true).map(t => t.id) || []
      for (let i = 0; i < ids.length; i++) {
        this.todos.splice(this.todos.findIndex(id => { return id === ids[i] }), 1)
      }
      this.$notify({
        content: '清除所有已完成事项',
        btn: '关闭'
      })
    },
    handleChangeTab (value) {
      this.filter = value
    }
  }
}
</script>

<style lang="scss" scope>
.real-app {
    max-width: 770px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
    padding: 0 15px;
    box-sizing: border-box;
}
.add-input{
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: "微软雅黑";
    font-weight: normal;
    line-height: 1.4em;
    outline: none;
    color: inherit;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    padding: 16px 16px 16px 36px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.tab-container {
  background: #ffffff;
}
</style>
