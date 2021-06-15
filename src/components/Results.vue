<template>
  <div class="container">
    <div
      v-for="item in results"
      :key="item.node.name + '_' + item.node.login"
      class="user-card"
    >
      <div class="card-title">
        <h2>{{ item.node.name || item.node.login || "" }}</h2>
      </div>
      <div class="inner-card">
        <img
          :src="item.node.avatarUrl"
          :alt="item.node.name || item.node.login"
          class="user-avatar"
        />
        <vue-horizontal class="horizontal">
          <template
            v-for="(repo, idx) in item.node.repositories.edges"
            :key="idx"
          >
            <Repo :repo="repo.node" />
          </template>
        </vue-horizontal>
      </div>
    </div>
    <Button
      v-if="store.state.pagination.hasNextPage"
      @clicked="loadMore"
      text="Load more"
      :hasArrow="false"
      class="more-btn"
    />
    <div class="key-nav-info" v-if="showKeyNavInfo">
      <font-awesome-icon :icon="['far', 'keyboard']" size="lg" />
      <p>
        Press <span>space</span> to like/unlike repo. Press
        <span>Enter</span> to open repo in new tab
      </p>
      <font-awesome-icon
        icon="times"
        size="lg"
        aria-label="close"
        @click="showKeyNavInfo = false"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import VueHorizontal from "vue-horizontal";
import Repo from "@/components/Repo.vue";
import Button from "@/components/Button.vue";
/* We're using mitt because we need to trigger TAB key press
 * from Repo.vue only once and Vue 3 has removed $off method
 * https://v3.vuejs.org/guide/migration/events-api.html#overview */
import emitter from "@/services/emitter";

export default {
  name: "Results",
  components: { VueHorizontal, Repo, Button },
  setup() {
    const store = useStore();
    const results = computed(() => store.state.users);
    const showKeyNavInfo = ref(false);

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("likes", JSON.stringify(store.state.likes));
    });

    const loadMore = () => {
      store.dispatch("fetchUsers", { append: true });
    };

    emitter.on("onTabKey", () => {
      showKeyNavInfo.value = true;
      setTimeout(() => {
        showKeyNavInfo.value = false;
        emitter.all.clear();
      }, 7000);
    });

    return {
      results,
      loadMore,
      store,
      showKeyNavInfo,
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  @include col;
  position: relative;

  .user-card {
    @include col;
    position: relative;
    margin-bottom: 60px;

    .card-title {
      @include center-flex-v;
      &::after {
        flex: 1;
        background: rgba($color-border-light, 0.2);
        content: "";
        height: 1px;
      }
      h2 {
        text-align: left;
        font-size: 1.6em;
        margin-bottom: 0.5em;
        padding-right: 15px;
        outline: none;
        &:focus {
          border-bottom: 1px solid red;
        }
        @include sm {
          margin-left: 60px;
          font-size: 1.3em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .inner-card {
      display: flex;

      .no-repos {
        width: 100%;
        @include center-flex-vh;
        p {
          margin-right: 20px;
        }
      }

      .user-avatar {
        height: 100%;
        width: 150px;
        margin-right: 20px;
        border-radius: $border-radius-small * 2;
        @include sm {
          position: absolute;
          top: -20px;
          left: 0;
          height: 50px;
          width: 50px;
        }
      }
      .horizontal {
        justify-content: space-between;
        width: calc(100% - 170px);

        @include sm {
          width: 100vw;
        }
      }
    }
  }

  .more-btn {
    margin: 0 auto;
    width: 90%;
    max-width: 300px;
    height: 4em;
  }
}
.key-nav-info {
  @include center-flex-v;
  justify-content: space-between;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  border-radius: $border-radius-small;
  border: 3px solid $color-main;
  background-color: $color-bg;
  margin-bottom: 1rem;
  padding: 10px 15px;
  svg {
    cursor: pointer;
  }
  p {
    margin: 0 20px 0 10px;
    span {
      padding: 2px 5px;
      background-color: rgba($color-box-shadow-accent, 0.5);
      border-radius: 4px;
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

<style lang="scss">
.horizontal .v-hl-btn {
  @include sm {
    display: none !important;
  }
}
</style>
