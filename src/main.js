import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import store from './store/index'
import router from './router'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
createApp(App)
.use(router)
.use(store)
.component('base-card',BaseCard)
.component('base-button',BaseButton)
.component('base-badge',BaseBadge)
.mount('#app')

