<template>
  <div
    class="repo"
    tabindex="0"
    @keydown.enter="openLink"
    @keydown.space.prevent="toggleLike"
    @keydown.tab.once="emitter.emit('onTabKey')"
  >
    <div class="repo-header">
      <font-awesome-icon
        :icon="[`fa${isLiked ? 's' : 'r'}`, 'heart']"
        size="lg"
        :color="isLiked ? styles.redDarkColor : styles.mainColor"
        :class="[{ 'repo-heart__liked': isLiked }, 'repo-heart']"
        tabindex="-1"
        @click="toggleLike"
      />
      <h3>{{ repo.name }}</h3>
    </div>
    <div class="repo-stats">
      <div class="repo-stats-field">
        <div>
          <font-awesome-icon icon="code-branch" />
        </div>
        <div
          :style="{
            background: repo.isFork
              ? styles.greenLightColor
              : styles.redLightColor,
          }"
        >
          <font-awesome-icon icon="check" v-if="repo.isFork" />
          <font-awesome-icon icon="times" v-else />
        </div>
      </div>
      <div class="repo-stats-field stars">
        <div>
          <font-awesome-icon icon="star" />
        </div>
        <div>
          <p>
            {{ repo.stargazerCount }}
          </p>
        </div>
      </div>
    </div>
    <Button :url="repo.url" isLink class="repo-btn" tabindex="-1" />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import styles from "./Repo.vue?vue&type=style&index=0&lang=scss&module=1";

import { computed } from "vue";
import { useStore } from "vuex";
import emitter from "@/services/emitter";

export default {
  name: "Repo",
  components: { Button },
  props: ["repo"],
  setup(props) {
    const store = useStore();

    const isLiked = computed(
      () =>
        store.state.likes &&
        store.state.likes.length &&
        store.state.likes.find((x) => x.id === props.repo.id)
    );

    const toggleLike = () => {
      store.commit("toggleLike", props.repo);
    };

    const openLink = () => {
      window.open(`${props.repo.url}`, "_blank");
    };

    return {
      styles,
      isLiked,
      toggleLike,
      openLink,
      emitter,
    };
  },
};
</script>

<style scoped lang="scss">
.repo {
  height: 150px;
  position: relative;
  min-width: 290px;
  @include col;
  justify-content: space-evenly;
  margin: 0 10px;
  padding: 0 20px 10px 20px;
  background-color: $color-white;
  border-radius: $border-radius-small;
  @include transition;
  &:first-of-type {
    margin-left: 2px;
  }
  &:hover .card-btn {
    opacity: 1;
  }
  &:focus {
    outline: none;
    box-shadow: inset 4px 0px 0px 0px $color-accent;
    .repo-btn {
      opacity: 1;
    }
  }

  .repo-header {
    @include center-flex-v;

    @media (hover: hover) {
      .repo-heart {
        outline: none;
        @include transition;
        &:hover {
          color: $color-red-dark;
          cursor: pointer;
        }
        &__liked {
          &:hover {
            color: $color-main;
          }
        }
      }
    }

    h3 {
      margin-left: 10px;
      font-size: 1.2em;
      font-weight: 400;
    }
  }
  .repo-stats {
    display: flex;
    .repo-stats-field {
      display: inline-block;
      &:first-of-type {
        margin-right: 20px;
      }

      > div {
        border: 1px solid rgba($color-border-light, 0.5);
        padding: 10px 20px;
        display: inline-block;
        &:first-child {
          border-right: none;
        }
        &:last-child {
          border-left: none;
        }
      }
      &.stars > div:last-child {
        border-left: 1px solid rgba($color-border-light, 0.1);
      }
    }
  }
  .repo-btn {
    opacity: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-10%, 50%);
    @include sm {
      opacity: 1;
      right: auto;
    }
  }
}
</style>

<style>
.horizontal .v-hl-container {
  clip-path: unset !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.horizontal .v-hl-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
