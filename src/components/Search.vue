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
import { ref, toRefs, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "Search",
  setup() {
    const store = useStore();
    const route = useRoute();

    /**
     * Search INPUT updating & clearing.
     * If input comes from URL, fetch users immediately, no need to wait
     */
    const timeout = ref(null);

    const input = reactive({
      // TODO: Needs cleanup
      searchInput: computed({
        get() {
          return store.state.searchInput;
        },
        set(val) {
          if (timeout.value) clearTimeout(timeout.value);
          timeout.value = setTimeout(() => {
            store.commit("setSearchInput", val);
          }, 1000);
        },
      }),
    });

    function clearInput() {
      store.commit("setSearchInput", "");
      clearTimeout(timeout.value);
    }

    /**
     * Fill in search input value with value from query in url.
     * Automatically makes a call to API using that query.
     */
    watch(
      () => route.query,
      () => {
        if (route.query.q) {
          input.searchInput = route.query.q;
        }
      },
      { immediate: true }
    );

    /**
     * Make a REQUEST to graphQl API (or local cache) each time search input updates.
     */
    watch(
      () => input.searchInput,
      (val) => {
        if (val !== "") {
          store.commit("setSearchInput", val);
          store.dispatch("fetchUsers");
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
