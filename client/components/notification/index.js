/** 全局可通用
 * 可发布到第三平台
 * vue插件
 */
// 全局注册N组件
import Notification from './notification.vue'
import notify from './function'

// 写组件库的时候很多组件都要注册到全局
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify // 每个组件都可以用this，去调用=>相当于声明了全局的组件函数
}
