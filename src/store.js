import { createStore } from 'vuex';
import { UsersWithRepos } from "@/utils/queries";
import router from "./router";
import { client } from "./main";
import { updateSearchHistory } from "@/utils/utils";
import { MoreRepos } from './utils/queries';

const state = {
  users: [],
  usersPerPage: 10,
  reposPerUser: 10,
  emptyResults: false,
  isLoading: false,
  isLoadingMoreRepos: { userLogin: null, state: false },
  isResultsFromLS: false,
  pagination: { hasNextPage: false, endCursor: null },
  searchInput: '',
  likes: [],
};

const mutations = {
  initializeStore(state) {
    const storedLikes = JSON.parse(localStorage.getItem('likes'));
    if (storedLikes && storedLikes.length) {
      state.likes = storedLikes;
    }
  },
  setEmptyResults(state, payload) {
    state.emptyResults = payload;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },
  setIsLoadingMoreRepos(state, payload) {
    state.isLoadingMoreRepos = payload;
  },
  setPagination(state, payload) {
    state.pagination = payload;
  },
  setSearchInput(state, payload) {
    state.searchInput = payload;
  },
  setIsResultsFromLS(state, payload) {
    state.isResultsFromLS = payload;
  },
  setUsers(state, users) {
    state.users = users;
    if (state.users.length === 0) state.emptyResults = true;
  },
  appendUsers(state, users) {
    state.users = [...state.users, ...users];
  },
  setMoreRepos(state, payload) {
    const userObj = state.users.find(item => item.login === payload.user);
    userObj.repositories.edges = [...userObj.repositories.edges, ...payload.repos];
    userObj.repositories.pageInfo = payload.pageInfo;
  },

  toggleLike(state, payload) {
    const isLiked = state.likes.some(item => item.id === payload.id);

    if (isLiked) {
      state.likes.splice(state.likes.findIndex(item => item.id === payload.id), 1);
      return;
    }

    state.likes = [...state.likes, payload];
  },
  unlike(state, payload) {
    // FIXME: For reasons unknown calling toggleLike from LikedRepo.vue calls it twice, 
    // thus first removing repo from likes and then adding it back again.
    // After fixing this bug, this mutation should be removed.
    const isLiked = state.likes.some(item => item.id === payload);

    if (isLiked) {
      state.likes.splice(state.likes.findIndex(item => item.id === payload), 1);
    }
  }
};

const actions = {
  fetchMoreRepos({ commit }, payload) {
    commit("setIsLoadingMoreRepos", { userLogin: payload.userLogin, state: true });
    client
      .executeQuery({
        query: MoreRepos,
        variables: {
          user: payload.userLogin,
          number_of_repos: state.reposPerUser,
          cursor: payload.endCursor,
        },
      })
      .then((response) => {
        const repos = response.data.user.repositories.edges;
        const pageInfo = response.data.user.repositories.pageInfo;
        commit("setMoreRepos", { repos, pageInfo, user: payload.userLogin });
        commit("setIsLoadingMoreRepos", { userLogin: payload.userLogin, state: false });
        localStorage.setItem(state.searchInput, JSON.stringify({ users: state.users, pagination: state.pagination }));
      })
      .catch((error) => {
        console.error(error);
      });
  },
  fetchUsers({ commit }, payload) {
    commit("setEmptyResults", false);
    commit("setIsLoading", true);

    const afterFetch = () => {
      commit("setIsLoading", false);
      router.replace({ path: "search", query: { q: state.searchInput } });
      updateSearchHistory(state.searchInput);
    };

    const localResults = JSON.parse(localStorage.getItem(state.searchInput));

    if (localResults && !payload?.append && !payload?.refetch) {
      commit("setIsLoading", true);
      commit('setIsResultsFromLS', true);
      commit("setUsers", localResults.users);
      commit("setPagination", localResults.pagination);
      afterFetch();
      return;
    }

    client
      .executeQuery({
        query: UsersWithRepos,
        variables: {
          number_of_users: state.usersPerPage,
          number_of_repos: state.reposPerUser,
          searchQuery: `${state.searchInput} repos:>0`,
          cursor: payload?.refetch ? null : state.pagination.endCursor,
        },
      })
      .then((response) => {
        const res = response.data.search;

        const filteredUsers = res.edges.filter(user => Object.keys(user.node).length).map(item => item.node);

        if (payload?.append) {
          commit("appendUsers", filteredUsers);
        } else {
          commit("setUsers", filteredUsers);
        }
        commit('setIsResultsFromLS', false);

        const pagination = { hasNextPage: res.pageInfo.hasNextPage, endCursor: res.pageInfo.endCursor };

        commit("setPagination", pagination);
        localStorage.setItem(state.searchInput, JSON.stringify({ users: state.users, pagination }));
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