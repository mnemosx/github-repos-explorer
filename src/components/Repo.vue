<template>
  <div class="repo">
    <div class="repo-header">
      <font-awesome-icon
        v-if="liked"
        :icon="['fas', 'heart']"
        size="lg"
        class="repo-heart"
      />
      <font-awesome-icon
        v-else
        :icon="['far', 'heart']"
        size="lg"
        class="repo-heart"
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
              ? 'rgba(113, 255, 200, 0.3)'
              : 'rgba(250, 94, 159, 0.1)',
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
    <Button :url="repo.url" isLink class="repo-btn" />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { ref } from "vue";

export default {
  name: "Repo",
  components: { Button },
  props: ["repo"],
  setup() {
    const liked = ref(false);
    return {
      liked,
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
  margin: 2px 10px;
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

  .repo-header {
    @include center-flex-v;

    .repo-heart {
      @include transition;
      &:hover {
        color: $color-red-dark;
        cursor: pointer;
      }
    }

    h3 {
      margin-left: 10px;
      font-size: 1.2em;
      font-weight: 400;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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
        width: 55px;
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
