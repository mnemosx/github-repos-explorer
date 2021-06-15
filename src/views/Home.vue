<template>
  <div class="container">
    <div class="top">
      <article class="controls">
        <font-awesome-icon
          v-show="likes.length"
          icon="heart"
          size="lg"
          :color="styles.redDarkColor"
          class="controls-btn"
          @click="toggleSlideout"
          @keyup.enter.stop="toggleSlideout(e)"
          tabindex="0"
        />
        <font-awesome-icon
          v-show="isResultsFromLS"
          icon="sync-alt"
          class="controls-btn controls-btn__refetch"
          size="lg"
          @click="refetch"
          @keyup.enter="refetch"
          tabindex="0"
        />
      </article>
      <Search />
    </div>
    <div v-if="!route.query.q">
      <h1>
        Type a GitHub user or login name in the search bar above to browse user
        repositories
      </h1>
      <div ref="lottieContainer" class="lottie-container"></div>
    </div>
    <SearchHistory
      v-if="
        !route.query.q &&
        JSON.parse(localStorage.getItem('searchHistory')) !== null
      "
      @searchPicked="onSearchPicked($event)"
    />
    <!-- FIXME: v-if on <Results /> instead of inside it -->
    <Results />
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
    <EmptyResults v-if="emptyResults" />

    <Slideout
      :show="isOpen"
      @close="toggleSlideout"
      :color="styles.redDarkColor"
      title="Your liked repos"
    >
      <div class="likes">
        <div class="liked-repo-row title">
          <span></span>
          <span>Repository</span>
          <span>Stars</span>
          <span>Fork</span>
        </div>
        <template v-for="(repo, idx) in likes" :key="'liked+' + repo.id">
          <LikedRepo
            :repo="repo"
            :color="styles.redDarkColor"
            :idx="idx"
            :lastIdx="likes.length - 1"
          />
        </template>
      </div>
    </Slideout>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Results from "@/components/Results.vue";
import EmptyResults from "@/components/EmptyResults.vue";
import SearchHistory from "@/components/SearchHistory.vue";
import Slideout from "@/components/Slideout.vue";
import LikedRepo from "@/components/LikedRepo.vue";
import styles from "./Home.vue?vue&type=style&index=0&lang=scss&module=1";
import animationData from "@/assets/lottie-home.json";
import lottie from "lottie-web";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";

export default {
  name: "Home",
  components: {
    Search,
    Results,
    Loading,
    EmptyResults,
    SearchHistory,
    Slideout,
    LikedRepo,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const results = computed(() => store.state.users);
    const likes = computed(() => store.state.likes);
    const isLoading = computed(() => store.state.isLoading);
    const emptyResults = computed(() => store.state.emptyResults);
    const isResultsFromLS = computed(() => store.state.isResultsFromLS);

    const isOpen = ref(false);
    const toggleSlideout = () => {
      isOpen.value = !isOpen.value;
      isOpen.value
        ? document.documentElement.classList.add("noscroll")
        : document.documentElement.classList.remove("noscroll");
    };

    const lottieContainer = ref(null);
    onMounted(() => {
      lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
      store.commit("initializeStore");
    });

    const onSearchPicked = (val) => {
      store.commit("setSearchInput", val);
      store.dispatch("fetchUsers");
    };

    function refetch() {
      store.dispatch("fetchUsers", { refetch: true });
    }

    return {
      isOpen,
      likes,
      results,
      emptyResults,
      isLoading,
      route,
      lottieContainer,
      onSearchPicked,
      localStorage,
      styles,
      toggleSlideout,
      isResultsFromLS,
      refetch,
    };
  },
};
</script>

<style>
.noscroll {
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.container {
  position: relative;
  .top {
    @include center-flex-v;
    display: flex;
    margin: 5em auto 4em;
    @include sm {
      margin-top: 2em;
    }
    .controls {
      display: flex;
      &-btn {
        margin-right: 20px;
        cursor: pointer;
        &__refetch {
          @include transition(0.2s);
          &:hover {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  h1 {
    @include sm {
      font-size: 1.5em;
    }
  }
  .lottie-container {
    width: 300px;
    height: 300px;
    margin: 0 auto 5em;
    @include sm {
      width: 200px;
      height: 200px;
      margin-bottom: 2em;
    }
  }
  .likes {
    width: 90%;
    margin: 0 auto;
    margin-top: 3rem;
  }
}
</style>