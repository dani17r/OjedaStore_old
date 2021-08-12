import {LocalStorage} from 'quasar'
import {Validated} from '@tools/utils.js'

export const Dark = {
  set(value) {
    const ElementBody = document.getElementsByTagName('body')[0];
    ElementBody.classList.remove("body--light")

    if (value) {
      ElementBody.classList.add("mode--dark")
      ElementBody.classList.remove("mode--light")
      LocalStorage.set("modeDark", true)

    } else {
      ElementBody.classList.add("mode--light")
      ElementBody.classList.remove("mode--dark")
      LocalStorage.set("modeDark", false)
    }

  },

  isActive() {
    return LocalStorage.getItem("modeDark") || false
  }
}
