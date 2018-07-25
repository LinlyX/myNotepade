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
           placeholder="代办事项"
           autofocus="autofocus"
           @keyup.enter="addTodo">
        <item v-for="todo in filterTodos"
              :key="todo.id"
              :todo="todo"
              :filter="filter"
              @cancel="cancelThis"
              @completed="completedThis"
              @backTo="todoThis"/>
        <helper
            :todos="todoEvents"
            :filter="filter"
            @clearAllCompleted="clearAllCompleted()"/>
    </div>
</template>

<script>
import item from './item.vue'
import helper from './helper.vue'
export default {
  data () {
    return {
      content: '',
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
    todoEvents () {
      return this.$store.getters.getToDo
    },
    doneEvents () {
      return this.$store.getters.getDone
    },
    cancelEvents () {
      return this.$store.getters.getCancel
    },
    filterTodos () {
      if (this.filter === '未完成') {
        return this.todoEvents
      } else if (this.filter === '已完成') {
        return this.doneEvents
      } else if (this.filter === '已取消') {
        return this.cancelEvents
      }
    }
  },
  methods: {
    addTodo (e) {
      let self = this
      let params = {
        id: 0,
        type: 1,
        content: '',
        time: '',
        completed: false
      }
      self.content = e.target.value.trim()
      if (self.content) {
        params.content = self.content
        self.$store.dispatch('addevent', params)
        self.content = ''
        e.target.value = ''
        this.$notify({
          content: '您有一件新的代办事项',
          btn: '关闭'
        })
      } else {
        this.$notify({
          content: '输入不能为空！',
          btn: '关闭'
        })
      }
    },
    cancelThis (id) {
      this.$store.dispatch('eventcancel', id)
      this.$notify({
        content: '您清除了一件事情',
        btn: '关闭'
      })
    },
    completedThis (id) {
      this.$store.dispatch('eventdone', id)
      this.$notify({
        content: '您完成了一件事情',
        btn: '关闭'
      })
    },
    todoThis (id) {
      this.$store.dispatch('eventtodo', id)
      this.$notify({
        content: '您有一件新的代办事项',
        btn: '关闭'
      })
    },
    clearAllCompleted (active) {
      const ids = this.doneEvents.map(t => t.id) || []
      for (let i = 0; i < ids.length; i++) {
        this.$store.dispatch('delevent', {id: ids[i], index: i})
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
    margin: 36px auto;
    box-shadow: 0 0 10px #00b0f0;
    padding: 0 15px;
    box-sizing: border-box;
}
.add-input{
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 16px;
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
