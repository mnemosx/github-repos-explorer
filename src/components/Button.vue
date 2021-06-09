<template>
  <a :href="url" target="_blank" class="card-btn">
    {{ text }}
    <font-awesome-icon v-if="hasArrow" icon="long-arrow-alt-right" />
  </a>
</template>

<script>
export default {
  name: "Button",
  props: {
    url: String,
    hasArrow: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: "Open",
    },
  },
};
</script>

<style scoped lang="scss">
.card-btn {
  opacity: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-10%, 50%);
  padding: 10px 10px;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.8em;
  letter-spacing: 0.1em;
  font-weight: 700;
  border: none;
  border-radius: $border-radius-small;
  color: $color-white;
  background-color: $color-accent;
  box-shadow: 0 2px 10px rgba($color-box-shadow-accent, 0.6);
  @include transition;
  svg {
    margin-left: 10px;
  }
  &:hover {
    color: $color-accent;
    background-color: $color-white;
    box-shadow: 0 2px 10px rgba($color-box-shadow-accent, 1);
    cursor: pointer;
  }
}
</style>


