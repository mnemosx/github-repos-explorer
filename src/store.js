import { createStore } from 'vuex'
import { UsersWithRepos } from "@/utils/queries";
import router from "./router";

const state = {
  users: [],
  emptyResults: false,
  isLoading: false
}

const mutations = {
  setEmptyResults(state, payload) {
    state.emptyResults = payload
  },
  setIsLoading(state, payload) {
    state.isLoading = payload
  },
  FETCH_USERS(state, users) {
    state.users = users
    if (state.users.length === 0) state.emptyResults = true
  }
}

const actions = {
  async fetchUsers({ commit }, payload) {
    commit("setEmptyResults", false)
    commit("setIsLoading", true)
    payload.client
      .executeQuery({
        query: UsersWithRepos,
        variables: payload.variables,
      })
      .then((response) => {
        commit("FETCH_USERS", response.data.search.edges);
      })
      .catch((error) => {
        console.error(error.statusText);
      })
      .finally(() => {
        commit("setIsLoading", false)
        router.replace({ path: "search", query: { q: payload.variables.searchQuery } });
      });
  }
}

export default createStore({
  state,
  mutations,
  actions,
})