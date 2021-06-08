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
import { ref, toRefs, reactive, watch, computed } from "vue";
export default {
  name: "Search",
  setup() {
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

    watch(input, (newValue) => {
      if (newValue !== "") search(newValue);
    });

    const timeout = ref(null);
    const results = ref([]);

    function search(val) {
      if (val === "") return;
      /*
      // some API call goes here
        .then((response) => {
          if (response) {
            // populate results with data
            return;
          }
        })
        .catch((error) => console.error(error)); 
      */
    }
    function clearInput() {
      input.debouncedSearchInput = "";
      clearTimeout(timeout.value);
    }

    return {
      ...toRefs(input),
      input,
      results,
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
