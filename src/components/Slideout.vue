<template>
  <div class="slideout">
    <transition name="overlay">
      <div class="slideout__overlay" v-show="show" @click="$emit('close')">
        <transition name="slide">
          <div class="slideout__container" v-if="show" @click.stop>
            <div class="slideout__container__title">
              <h2>Your liked repos</h2>
              <font-awesome-icon
                icon="times"
                size="lg"
                aria-label="close"
                @click="$emit('close')"
              />
            </div>
            <div class="likes">
              <div class="row title">
                <span></span>
                <span>Repository</span>
                <span>Stars</span>
                <span>Fork</span>
              </div>
              <div
                v-for="repo in likedRepos"
                :key="repo.id + repo.name"
                class="row"
              >
                <span>
                  <font-awesome-icon
                    icon="heart-broken"
                    size="lg"
                    :color="color"
                    @click.once="unlike(repo.id)"
                  />
                </span>
                <span>
                  <a :href="repo.url" target="_blank" rel="noreferrer">{{
                    repo.name
                  }}</a>
                </span>
                <span>{{ repo.stargazerCount }}</span>
                <span>
                  <font-awesome-icon icon="check" v-if="repo.isFork" />
                  <font-awesome-icon icon="times" v-else />
                </span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    color: String,
  },
  setup() {
    const store = useStore();
    const likedRepos = computed(() => store.state.likes);
    const unlike = (item) => {
      store.commit("unlike", item);
    };
    return {
      likedRepos,
      unlike,
    };
  },
};
</script>

<style lang="scss" scoped>
.slideout {
  height: 100%;
  width: 100%;

  &__overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
  }

  &__container {
    height: 100%;
    width: 30rem;
    background-color: #fefefe;
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    &__title {
      width: 90%;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      line-height: 1;
      svg {
        cursor: pointer;
        @include transition(0.5s);
        &:hover {
          color: $color-red-dark;
          transform: rotate(-180deg);
        }
      }
    }
    .likes {
      width: 90%;
      margin: 0 auto;
      margin-top: 3rem;
      .row {
        display: grid;
        grid-template-columns: 1fr 4fr minmax(50px, 100px) 1fr;
        align-items: center;
        border-radius: $border-radius-small;
        background-color: $color-bg;
        margin-bottom: 0.3rem;
        padding: 10px 10px 10px 0;
        @include transition;
        span:first-of-type {
          cursor: pointer;
        }
        span:nth-of-type(2) {
          text-align: left;
        }
        &.title {
          margin-bottom: 0.6rem;
          span {
            font-weight: 700;
          }
        }
        &:hover {
          background: rgba($color-box-shadow-accent, 0.7);
          color: black;
        }
        a {
          color: $color-main;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

// TRANSITIONS

.overlay {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }

  &-enter,
  &-leave-to {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.slide {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }

  &-enter,
  &-leave-to {
    transform: translateX(-100%);
  }
}
</style>