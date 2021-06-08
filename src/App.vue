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
@import "styles/_variables";
@import "styles/_mixins";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: $color-bg;
}

#app {
  font-family: $sans-serif-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-main;
  width: 90%;
  max-width: 990px;
  margin: 0 auto;
}
</style>
