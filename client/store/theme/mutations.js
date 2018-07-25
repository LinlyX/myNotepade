import * as func from '../function'

export default {
  SWITCHTHEME (states, obj) {
    states.theme = obj.theme
    func.themeLocal.set(states)
  }
}
