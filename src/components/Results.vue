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
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import VueHorizontal from "vue-horizontal";
import Repo from "@/components/Repo.vue";
import Button from "@/components/Button.vue";

export default {
  name: "Results",
  components: { VueHorizontal, Repo, Button },
  setup() {
    const store = useStore();
    const results = computed(() => store.state.users);

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("likes", JSON.stringify(store.state.likes));
    });

    const loadMore = () => {
      store.dispatch("fetchUsers", { append: true });
    };

    return {
      results,
      loadMore,
      store,
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
