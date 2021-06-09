import { createStore } from 'vuex'
import { UsersWithRepos } from "@/utils/queries";

const state = {
  users: []
}

const mutations = {
  FETCH_USERS(state, users) {
    state.users = users
  }
}

const actions = {
  async fetchUsers({ commit }, payload) {
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
      });
  }
}

export default createStore({
  state,
  mutations,
  actions,
})