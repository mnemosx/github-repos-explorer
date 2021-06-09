<template>
  <div class="container">
    <div class="search">
      <input
        v-model.trim="searchInput"
        type="search"
        id="search-input"
        class="search__input"
        placeholder="Search for a GitHub user"
      />
      <font-awesome-icon
        v-if="searchInput"
        icon="trash"
        class="search__delete"
        size="lg"
        @click="clearInput"
      />
    </div>
  </div>
</template>

<script>
import { createClient, defaultPlugins } from "villus";
import { ref, toRefs, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "Search",
  setup() {
    /**
     * Search INPUT debouncing and clearing.
     */
    const timeout = ref(null);

    const input = reactive({
      debouncedSearchInput: "",
      searchInput: computed({
        get() {
          return input.debouncedSearchInput;
        },
        set(val) {
          if (timeout.value) clearTimeout(timeout.value);
          timeout.value = setTimeout(() => {
            input.debouncedSearchInput = val;
          }, 1000);
        },
      }),
    });

    function clearInput() {
      input.debouncedSearchInput = "";
      clearTimeout(timeout.value);
    }

    /**
     * Make a REQUEST to graphQl API (or local cache) each time search input updates.
     * @param {number} number_of_users The number of users returned per page.
     * @param {number} number_of_repos The number of repos returned for each user.
     * TODO: Pagination for both users and repos
     * TODO: Cache received data
     */

    function authPlugin({ opContext }) {
      opContext.headers.Authorization = `Bearer ${process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN}`;
    }
    const client = createClient({
      url: "https://api.github.com/graphql",
      use: [authPlugin, ...defaultPlugins()],
    });

    const store = useStore();

    const number_of_users = 10;
    const number_of_repos = 10;
    let variables = {
      number_of_users,
      number_of_repos,
    };

    const route = useRoute();
    watch(
      () => route.query,
      () => {
        if (route.query.q) {
          input.searchInput = route.query.q;
        }
      },
      { immediate: true }
    );

    watch(
      () => input.debouncedSearchInput,
      (val) => {
        if (val !== "") {
          variables = { ...variables, searchQuery: val };
          store.dispatch("fetchUsers", { client, variables });
        }
      }
    );

    return {
      ...toRefs(input),
      clearInput,
    };
  },
};
</script>

<style scoped lang="scss">
.search {
  margin: 5em auto 4em;
  position: relative;

  &__input {
    width: 100%;
    padding: 5px 10px;
    font-family: $sans-serif-font;
    font-size: 1.4em;
    border: none;
    outline: none;
    border-radius: $border-radius-small;
    box-shadow: 0px 3px 10px 0px rgba($color-box-shadow-accent, 0.3);
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
    &:focus {
      box-shadow: 0 2px 0px -0px $color-main;
    }
  }

  &__delete {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 13px;
    cursor: pointer;
    @include transition;
    &:hover {
      color: $color-red-dark;
    }
  }
}
</style>
