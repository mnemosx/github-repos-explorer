<template>
  <div class="container">
    <div class="user-card-wrapper">
      <div v-for="item in results" :key="item.node.name" class="user-card">
        <div class="card-title">
          <h2>{{ item.node.name || item.node.login }}</h2>
        </div>
        <div class="inner-card">
          <img
            :src="item.node.avatarUrl"
            :alt="item.node.name || item.node.login"
            class="user-avatar"
          />
          <template v-if="item.node.repositories?.edges.length">
            <vue-horizontal class="horizontal">
              <template
                v-for="(repo, idx) in item.node.repositories.edges"
                :key="idx"
              >
                <Repo :repo="repo.node" />
              </template>
            </vue-horizontal>
          </template>
          <div v-else class="no-repos">
            <p>This user has no repositories</p>
            <font-awesome-icon icon="heart-broken" size="lg" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="emptyResults" class="error-wrapper">
      <font-awesome-icon icon="heart-broken" size="10x" flip="horizontal" />
      No results :(
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import VueHorizontal from "vue-horizontal";
import Repo from "@/components/Repo.vue";

export default {
  name: "Results",
  components: { VueHorizontal, Repo },
  setup() {
    const store = useStore();
    const results = computed(() => store.state.users);
    const emptyResults = computed(() => store.state.emptyResults);
    return {
      results,
      emptyResults,
    };
  },
};
</script>

<style scoped lang="scss">
.error-wrapper {
  margin-top: 20vh;
  @include center-flex-vh;
  @include col;
  font-size: 1.5em;
}

.user-card-wrapper {
  @include col;

  .user-card {
    @include col;
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
      }
      .horizontal {
        justify-content: space-between;
        width: calc(100% - 170px);
      }
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
