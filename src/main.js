import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTrash, faHeart, faHeartBroken, faStar, faCodeBranch, faCheck, faTimes, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSearch, faTrash, faHeart, faHeartR, faHeartBroken, faStar, faCodeBranch, faCheck, faTimes, faLongArrowAltRight, faUserCircle)

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
