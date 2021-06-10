<template>
  <div>
    <Home />
  </div>
</template>

<script>
import Home from "@/views/Home.vue";

export default {
  components: { Home },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: $color-bg;
  padding-bottom: 5em;
}

#app {
  font-family: $sans-serif-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-main;
  width: 90%;
  margin: 0 auto;
}

input {
  &:-webkit-autofill {
    border: none;
    -webkit-text-fill-color: $color-main;
    -webkit-box-shadow: none;
  }
}
</style>
