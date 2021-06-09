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
          <template v-if="item.node.repositories.edges.length">
            <vue-horizontal class="horizontal">
              <div
                class="repo"
                v-for="(repo, idx) in item.node.repositories.edges"
                :key="idx"
              >
                <div class="repo-header">
                  <font-awesome-icon
                    v-if="liked"
                    :icon="['fas', 'heart']"
                    size="lg"
                    class="repo-heart"
                  />
                  <font-awesome-icon
                    v-else
                    :icon="['far', 'heart']"
                    size="lg"
                    class="repo-heart"
                  />
                  <h3>{{ repo.node.name }}</h3>
                </div>
                <div class="repo-stats">
                  <div class="repo-stats-field fork">
                    <div>
                      <font-awesome-icon icon="code-branch" />
                    </div>
                    <div
                      :style="{
                        background: repo.node.isFork
                          ? 'rgba(113, 255, 200, 0.3)'
                          : 'rgba(250, 94, 159, 0.1)',
                      }"
                    >
                      <font-awesome-icon icon="check" v-if="repo.node.isFork" />
                      <font-awesome-icon icon="times" v-else />
                    </div>
                  </div>
                  <div class="repo-stats-field stars">
                    <div>
                      <font-awesome-icon icon="star" />
                    </div>
                    <div>
                      <p>
                        {{ repo.node.stargazerCount }}
                      </p>
                    </div>
                  </div>
                </div>
                <a :href="repo.node.url" target="_blank" class="card-btn">
                  Open<font-awesome-icon icon="long-arrow-alt-right" />
                </a>
              </div>
            </vue-horizontal>
          </template>
          <div v-else class="no-repos">
            <p>This user has no repositories</p>
            <font-awesome-icon icon="heart-broken" size="lg" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="noResultsReturned" class="error-wrapper">
      <font-awesome-icon icon="heart-broken" size="10x" flip="horizontal" />
      No results :(
    </div> -->
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import VueHorizontal from "vue-horizontal";

export default {
  name: "Results",
  components: { VueHorizontal },
  setup() {
    const store = useStore();
    const liked = ref(false);
    const results = computed(() => store.state.users);
    return {
      results,
      liked,
    };
  },
};
</script>

<style scoped lang="scss">
// .error-wrapper {
//   margin-top: 20vh;
//   @include center-flex;
//   font-size: 1.5em;
// }

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

        .repo {
          height: 150px;
          position: relative;
          min-width: 290px;
          @include col;
          justify-content: space-evenly;
          margin: 2px 10px;
          padding: 0 20px 10px 20px;
          background-color: $color-white;
          border-radius: $border-radius-small;
          @include transition;
          &:first-of-type {
            margin-left: 2px;
          }
          &:hover .card-btn {
            opacity: 1;
          }

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

          .repo-header {
            @include center-flex-v;

            .repo-heart {
              @include transition;
              &:hover {
                color: $color-red-dark;
                cursor: pointer;
              }
            }

            h3 {
              margin-left: 10px;
              font-size: 1.2em;
              font-weight: 400;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .repo-stats {
            display: flex;
            .repo-stats-field {
              display: inline-block;
              &:first-of-type {
                margin-right: 20px;
              }

              > div {
                border: 1px solid rgba($color-border-light, 0.5);
                padding: 10px 20px;
                display: inline-block;
                width: 55px;
                &:first-child {
                  border-right: none;
                }
                &:last-child {
                  border-left: none;
                }
              }
              &.stars > div:last-child {
                border-left: 1px solid rgba($color-border-light, 0.1);
              }
            }
          }
        }
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
