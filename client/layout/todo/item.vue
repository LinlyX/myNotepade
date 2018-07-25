<template>
  <div :class="['todo-item',filter==='已完成'?'completed':'']">
    <div v-show="filter==='未完成'">
      <input
        type="checkbox"
        class="toggle"
        v-model="todo.completed"
        @click="toggleToCompleted"
      >
      <label>{{todo.content}}</label>
      <button class="destroy" @click.prevent="cancelTodo"></button>
    </div>
    <div v-show="filter==='已完成'">
      <input
        type="checkbox"
        class="toggle"
        v-model="todo.completed"
        @click="toggleTodo"
      >
      <label>{{todo.content}}</label>
      <span class="event-time">{{todo.time}}</span>
    </div>
    <div v-show="filter==='已取消'">
      <label>{{todo.content}}</label>
      <button class="recoverBtn" @click.prevent="backTodo">恢复</button>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    todo: {
      type: Object,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    cancelTodo (e) {
      this.$emit('cancel', this.todo.id)
    },
    backTodo (e) {
      this.$emit('backTo', this.todo.id)
    },
    toggleTodo (e) {
      this.todo.completed = ''
      this.$emit('backTo', this.todo.id)
    },
    toggleToCompleted (e) {
      this.$emit('completed', this.todo.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo-item {
    position: relative;
    background-color: #fff;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .todo-item:hover .destroy:after {
    content: "x";
  }

  .todo-item label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2em;
    transition: color 0.4s;
  }

  .todo-item .completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  .toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    -webkit-appearance: none;
    outline: none;
    padding-left: 5px;
    cursor: pointer;
  }

  .toggle:after {
    content: url('../../assets/images/round.png');
  }

  .toggle:checked:after {
    content: url('../../assets/images/done.png');
    margin: 0 auto;
  }

  .destroy {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    background-color: transparent;
    -webkit-appearance: none;
    border-width: 0;
    cursor: pointer;
    outline: none;
  }

  .recoverBtn {
    -webkit-appearance: none;
    position: absolute;
    right: 10px;
    top: 7px;
    width: 50px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #666;
    font-size: 12px;
  }

  .event-time {
    position: absolute;
    right: 10px;
    top: 0;
    line-height: 44px;
    font-size: 12px;
    color: #aaa;
  }
</style>
