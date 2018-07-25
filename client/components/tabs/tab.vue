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
  mounted () {
    this.$parent.panes.push(this)
  },
  render () {
    const tab = this.$slots.lable || <span>{this.lable}</span>
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

<style lang="scss" scoped>
.tab{
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
  &.active{
    border-bottom: 2px solid #00b0f0;
  }
  &:last-child{
    margin-right: 0;
  }
}
</style>
