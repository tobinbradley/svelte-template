import './js/registerServiceWorker'
import App from './App.svelte'
import './utils.css'

const app = new App({
  target: document.querySelector("#app"),
  props: {
    name: 'Hello World!'
  }
})

export default app
