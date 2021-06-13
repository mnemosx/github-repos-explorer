<template>
  <div class="liked-repo-row">
    <span>
      <font-awesome-icon
        icon="heart-broken"
        size="lg"
        :color="color"
        @click.once="unlike(repo.id)"
      />
    </span>
    <span>
      <a :href="repo.url" target="_blank" rel="noreferrer">{{ repo.name }}</a>
    </span>
    <span>{{ repo.stargazerCount }}</span>
    <span>
      <font-awesome-icon icon="check" v-if="repo.isFork" />
      <font-awesome-icon icon="times" v-else />
    </span>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    repo: Object,
    color: String,
  },
  setup() {
    const store = useStore();
    const unlike = (item) => {
      store.commit("unlike", item);
    };

    return {
      unlike,
    };
  },
};
</script>

<style lang="scss">
.liked-repo-row {
  display: grid;
  grid-template-columns: 50px minmax(0, 4fr) minmax(50px, 70px) 40px;
  align-items: center;
  border-radius: $border-radius-small;
  background-color: $color-bg;
  margin-bottom: 0.3rem;
  padding: 10px 10px 10px 0;
  span:nth-of-type(2) {
    text-align: left;
    margin-right: 10px;
  }
  &.title {
    margin-bottom: 0.6rem;
    font-weight: 700;
  }
}
</style>

<style lang="scss" scoped>
.liked-repo-row {
  @include transition;
  span:first-of-type {
    cursor: pointer;
  }
  &:not(:first-of-type):hover {
    background: rgba($color-box-shadow-accent, 0.7);
    color: black;
  }
  a {
    color: $color-main;
    text-decoration: none;
    word-wrap: break-word;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>