<template>
  <div class="search-history">
    <h2>Your recent searches</h2>
    <div
      v-for="(item, idx) in searchHistory"
      :key="idx"
      @click="$emit('searchPicked', item.value)"
      class="recent-search"
    >
      <div class="left">
        <font-awesome-icon icon="search" size="xs" />
        <p class="value">
          {{ item.value }}
        </p>
      </div>
      <p class="time">
        <span class="time-num" v-show="item.time.replace(/\D/g, '')">
          {{ item.time.replace(/\D/g, "") }}
        </span>
        {{ item.time.replace(/[0-9]/g, "") }}
      </p>
    </div>
  </div>
</template>

<script>
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
export default {
  setup() {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    searchHistory =
      searchHistory &&
      searchHistory.map((item) => {
        return {
          value: item.value,
          time: timeAgo.format(item.time),
        };
      });

    return {
      searchHistory,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-history {
  text-align: left;
  .recent-search {
    @include center-flex-v;
    font-size: 1.2em;
    margin: 10px 0;
    padding: 15px 25px;
    border-radius: $border-radius-small;
    justify-content: space-between;
    cursor: pointer;
    background-color: rgba($color-box-shadow-accent, 0.3);
    @include transition;
    &:hover {
      background: rgba($color-box-shadow-accent, 0.7);
      color: black;
    }
    .left {
      @include center-flex-v;
      overflow: hidden;
      white-space: nowrap;
      svg {
        margin-right: 15px;
      }
    }
    .time-num {
      background-color: rgba($color-main, 0.5);
      color: $color-white;
      padding: 3px 10px;
      border-radius: $border-radius-small * 2;
    }
  }
}
</style>

