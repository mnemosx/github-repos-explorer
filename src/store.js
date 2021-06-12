import { createStore } from 'vuex';
import { UsersWithRepos } from "@/utils/queries";
import router from "./router";
import { client } from "./main";
import { updateSearchHistory } from "@/utils/utils";

const state = {
  users: [],
  usersPerPage: 10,
  reposPerUser: 10,
  emptyResults: false,
  isLoading: false,
  pagination: { hasNextPage: false, endCursor: null },
  searchInput: '',
  likes: [],
};

const mutations = {
  setEmptyResults(state, payload) {
    state.emptyResults = payload;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },
  setPagination(state, payload) {
    state.pagination = payload;
  },
  setSearchInput(state, payload) {
    state.searchInput = payload;
  },
  setUsers(state, users) {
    state.users = users;
    if (state.users.length === 0) state.emptyResults = true;
  },
  appendUsers(state, users) {
    state.users = [...state.users, ...users];
  },
  toggleLike(state, payload) {
    const isLiked = state.likes.some(item => item.id === payload.id);
    if (isLiked) {
      state.likes.splice(state.likes.findIndex(item => item.id === payload.id), 1);
      return;
    }

    state.likes = [...state.likes, payload];
  }
};

const actions = {
  fetchUsers({ commit }, payload) {
    commit("setEmptyResults", false);
    commit("setIsLoading", true);

    const afterFetch = () => {
      commit("setIsLoading", false);
      router.replace({ path: "search", query: { q: state.searchInput } });
      updateSearchHistory(state.searchInput);
    };

    const localResults = JSON.parse(localStorage.getItem(state.searchInput));

    if (localResults && !payload?.append) {
      commit("setUsers", localResults);
      afterFetch();
      return;
    }

    client
      .executeQuery({
        query: UsersWithRepos,
        variables: {
          number_of_users: state.usersPerPage,
          number_of_repos: state.reposPerUser,
          searchQuery: state.searchInput,
          cursor: state.pagination.endCursor,
        },
      })
      .then((response) => {
        const res = response.data.search;

        if (payload?.append) {
          commit("appendUsers", res.edges);
        } else {
          commit("setUsers", res.edges);
        }

        commit("setPagination", { hasNextPage: res.pageInfo.hasNextPage, endCursor: res.pageInfo.endCursor });
        localStorage.setItem(state.searchInput, JSON.stringify(state.users));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        afterFetch();
      });
  }
};

export default createStore({
  state,
  mutations,
  actions,
});