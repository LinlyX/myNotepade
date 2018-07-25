<script>
export default {
  name: 'tab',
  props: {
    // 存储对应的tab应该是哪个value
    index: {
      type: [String, Number],
      required: true
    },
    // 表示里面显示的内容
    lable: {
      type: String,
      default: 'tab'
    }
  },
  computed: {
    active () {
      return this.$parent.value === this.index
    }
  },
  methods: {
    handleClick () {
      this.$parent.onChange(this.index)
    }
  },
  // beforeMount () {
  //   console.log('----------------tab beforemounted-------------')
  // },
  mounted () {
    this.$parent.panes.push(this)
    // console.log(this)
    // console.log('----------------tab mounted-------------')
  },
  // created () {
  //   console.log('----------------tab created-------------')
  // },
  render () {
    const tab = this.$slots.lable || <span>{this.lable}</span>
    console.log(this.lable)
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>{tab}</li>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tab{
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
  &.active{
    border-bottom: 2px solid blue;
  }
  &:last-child{
    margin-right: 0
  }
}
</style>
