import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faTrash, faHeart, faHeartBroken, faStar, faCodeBranch, faCheck, faTimes, faLongArrowAltRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartR, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faSearch, faTrash, faHeart, faHeartR, faHeartBroken, faStar, faCodeBranch, faCheck, faTimes, faLongArrowAltRight, faUserCircle, faSyncAlt);

/* villus setup */
import { createClient, defaultPlugins } from "villus";

function authPlugin({ opContext }) {
  opContext.headers.Authorization = `Bearer ${process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN}`;
}

export const client = createClient({
  url: "https://api.github.com/graphql",
  use: [authPlugin, ...defaultPlugins()],
});

const app = createApp(App);
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app');
