import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faTrash, faHeart, faHeartBroken, faStar, faCodeBranch, faCheck, faTimes, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartR, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faSearch, faTrash, faHeart, faHeartR, faHeartBroken, faStar, faCodeBranch, faCheck, faTimes, faLongArrowAltRight, faUserCircle);

const app = createApp(App);
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app');
