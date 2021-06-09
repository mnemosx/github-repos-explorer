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
import { UsersWithRepos } from "@/utils/queries";

export default {
  name: "Search",
  setup() {
    const number_of_users = 10;
    const number_of_repos = 10;

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

    function authPlugin({ opContext }) {
      opContext.headers.Authorization = `Bearer ${process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN}`;
    }
    const client = createClient({
      url: "https://api.github.com/graphql",
      use: [authPlugin, ...defaultPlugins()],
    });

    watch(
      () => input.debouncedSearchInput,
      (val) => {
        client // TODO: move query execution to vuex action
          .executeQuery({
            query: UsersWithRepos,
            variables: {
              searchQuery: val,
              number_of_users,
              number_of_repos,
            },
          })
          .then((response) => {
            console.log(response.data.search.edges);
            // then get the response data to vuex store
          }); // TODO: handle errors and isFetching state manually
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
