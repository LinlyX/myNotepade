/** 组件调用的方法 */
import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstancde = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

// 全局方法，通过方法调用
const notify = (options) => {
  // 服务端没有Dom运行环境
  if (Vue.prototype.$isServer) return

  // new出组件的内容，插入到Dom中，需要控制组件定位，所以要控制组件的样式
  // 定位需要根据当前有多少个N去判断=》用数组去保存列表
  const instance = new NotificationConstructor(options)

  const id = `notification_${seed++}` // 独一无二的id
  instance.id = id
  instance.vm = instance.$mount() // 这时已经生成了el对象，还没挂载到Dom中去，但div标签已经有了
  document.body.appendChild(instance.vm.$el) // 将这个全局对象插入到body中区
  instance.vm.visible = true // 节点插入进去之后再可见，就可以出发transition动画了

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstancde(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy() // 消除vm对象
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
