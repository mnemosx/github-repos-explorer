<template>
  <transition name="overlay">
    <div
      class="slideout-overlay"
      v-show="show"
      @click="$emit('close')"
      @keydown.esc="$emit('close')"
    >
      <transition name="slide">
        <aside
          class="slideout-container"
          @click.stop
          v-show="show"
          tabindex="0"
        >
          <div class="slideout-container__title">
            <h2>{{ title }}</h2>
            <font-awesome-icon
              icon="times"
              size="lg"
              aria-label="close"
              @click="$emit('close')"
              @keyup.enter="$emit('close')"
              tabindex="0"
              class="first-focus-item"
            />
          </div>
          <slot></slot>
        </aside>
      </transition>
    </div>
  </transition>
</template>

<script>
import { nextTick, watch } from "vue";

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
  setup(props) {
    /*
     * Keep focus inside Slideout content by
     * shifting the focus back and forth between first and
     * last keyboard focusable elements inside overlay.
     * Css class 'last-focus-item' needs to be added to the element
     * that's supposed to be last keyboard focusable element.
     */

    let lastFocusElemInOverlay, firstFocusElemInOverlay;
    function tabFocusHandler(e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusElemInOverlay) {
          lastFocusElemInOverlay.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusElemInOverlay) {
          firstFocusElemInOverlay.focus();
          e.preventDefault();
        }
      }
    }

    watch(
      () => props.show,
      (val) => {
        if (val) {
          nextTick(() => {
            firstFocusElemInOverlay =
              document.querySelector(".first-focus-item");
            firstFocusElemInOverlay.parentElement.parentElement.focus();

            lastFocusElemInOverlay = document.querySelector(".last-focus-item");

            firstFocusElemInOverlay.addEventListener(
              "keydown",
              tabFocusHandler
            );
            lastFocusElemInOverlay.addEventListener("keydown", tabFocusHandler);
          });
        } else {
          firstFocusElemInOverlay.removeEventListener(
            "keydown",
            tabFocusHandler
          );
          lastFocusElemInOverlay.removeEventListener(
            "keydown",
            tabFocusHandler
          );
        }
      }
    );
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
        @include icon-focus;
        &:hover {
          @include transition(0.5s);
          color: $color-red-dark;
          transform: rotate(-180deg);
        }
      }
    }
    &:focus {
      outline: none;
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