<template>
  <div :class="['todo-item',filter==='已完成'?'completed':'']">
    <div v-show="filter==='未完成'" class="flexItem">
      <div class="itemLeft">
        <input
          type="checkbox"
          class="toggle"
          v-model="todo.completed"
          @click="toggleToCompleted"
        >
        <label>{{todo.content}}</label>
      </div>
      <button class="destroy" @click.prevent="cancelTodo"></button>
    </div>
    <div v-show="filter==='已完成'" class="flexItem">
      <div class="itemLeft">
        <input
          type="checkbox"
          class="toggle"
          v-model="todo.completed"
          @click="toggleTodo"
        >
        <label>{{todo.content}}</label>
      </div>
      <p class="event-time">{{todo.time}}</p>
    </div>
    <div v-show="filter==='已取消'" class="flexItem">
      <div class="itemLeft">
        <label>{{todo.content}}</label>
      </div>
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
  .flexItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    .itemLeft {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .todo-item {
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    height: 46px
  }

  .todo-item:hover .destroy:after {
    content: "x";
  }

  .todo-item label {
    white-space: pre-line;
    word-break: break-all;
    margin-left: 45px;
    display: block;
    transition: color 0.4s;
    font-size: 16px;
    padding-left: 5px;
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
    cursor: pointer;
    padding-left: 5px;
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
    font-size: 12px;
    color: #aaa;
  }
</style>
