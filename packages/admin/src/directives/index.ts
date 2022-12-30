import type { App } from 'vue'
import debounce from './debounce'

export default {
  install: function (app: App) {
    app.directive('debounce', { mounted: debounce })
  }
}
