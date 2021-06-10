import { createStore } from 'vuex';
import { UsersWithRepos } from "@/utils/queries";
import router from "./router";
import { client } from "./main";

const state = {
  users: [],
  usersPerPage: 10,
  reposPerUser: 10,
  emptyResults: false,
  isLoading: false,
  pagination: { hasNextPage: false, endCursor: null },
  searchInput: ''
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
  }
};

const actions = {
  fetchUsers({ commit }, payload) {
    commit("setEmptyResults", false);
    commit("setIsLoading", true);

    const afterFetch = () => {
      commit("setIsLoading", false);
      router.replace({ path: "search", query: { q: state.searchInput } });

      let searchHistorySaved = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];
      searchHistorySaved.push({ value: state.searchInput, time: Date.now() });
      /* Remove duplicate values leaving the newest ones.  */
      /* FIXME: Perhaps duplicate prevention should be handled while pushing new value to array.  */
      let searchHistoryDeduped = searchHistorySaved
        .slice()
        .reverse()
        .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i);


      let searchHistorySorted = searchHistoryDeduped.sort((a, b) =>
        a.time > b.time ? -1 : b.time > a.time ? 1 : 0
      );

      // Keep only 15 newest entries
      if (searchHistorySorted.length > 15) {
        searchHistorySorted.pop();
      }

      localStorage.setItem('searchHistory', JSON.stringify(searchHistorySorted));
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