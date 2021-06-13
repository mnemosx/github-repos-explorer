<template>
  <transition name="overlay">
    <div class="slideout-overlay" v-show="show" @click="$emit('close')">
      <transition name="slide">
        <aside class="slideout-container" v-if="show" @click.stop>
          <div class="slideout-container__title">
            <h2>{{ title }}</h2>
            <font-awesome-icon
              icon="times"
              size="lg"
              aria-label="close"
              @click="$emit('close')"
            />
          </div>
          <slot></slot>
        </aside>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.slideout-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  overscroll-behavior: contain;

  .slideout-container {
    height: 100%;
    width: 90%;
    max-width: 30rem;
    background-color: #fefefe;
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    overflow-y: auto;
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

  &-enter-from,
  &-leave-to {
    transform: translateX(-100%);
  }
}
</style>