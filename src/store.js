import { createStore } from 'vuex'
import { UsersWithRepos } from "@/utils/queries";

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
        commit("setIsLoading", false)
      })
      .catch((error) => {
        console.error(error.statusText);
      });
  }
}

export default createStore({
  state,
  mutations,
  actions,
})