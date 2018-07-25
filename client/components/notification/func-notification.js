import Notification from './notification.vue'

export default {
  extends: Notification, // 扩展组件
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer() // 自动关闭弹窗
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight // 当组件完全进入后，获取组件的高，否则，在transition期间获取不到
    }
  },
  beforeDestroy () {
    this.clearTimer()
  },
  data () {
    return {
      verticalOffset: 0, // 继承后的Vue组件会用到，要声明
      autoClose: 3000,
      height: 0, // 节点正式渲染成功时，为它设置，组件经理动画时，拿不到值
      visible: false
    }
  }
}
