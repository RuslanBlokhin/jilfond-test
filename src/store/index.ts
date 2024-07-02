import { createStore } from 'vuex';
import IUser from '../models/UserModel';
import $http from '../api';

const store = createStore({
  state: {
    foundUsers: [] as Array<IUser>,
    sortedUsers: [] as Array<IUser>,
  },
  mutations: {
    SET_FOUND_USERS(state, payload: Array<IUser>) {
      state.foundUsers = [...state.foundUsers, ...payload];
    },
    CLEAR_FOUND_USERS(state) {
      state.foundUsers = [];
    },
    SET_SORTED_USERS(state, payload: Array<IUser>) {
      state.sortedUsers = payload;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const { data } = await $http.get('');
        const sortingData = data.sort((a: { username: string }, b: { username: string }) =>
          a.username.localeCompare(b.username),
        );

        commit('SET_SORTED_USERS', sortingData);
        // console.log(sortingData);
      } catch (error) {}
    },
    async searchUsersByIds({ commit }, ids: Array<number>) {
      try {
        let url = `?id=${ids[0]}`;
        if (ids.length > 1) {
          for (let i = 1; i < ids.length; i++) {
            url = url + `&id=${ids[i]}`;
          }
        }

        const { data } = await $http.get(url);
        console.log(data);

        commit('SET_FOUND_USERS', data);
      } catch (error) {}
    },
  },
  getters: {
    // getUsers: state => (name: string) => state.users.filter(user => user.username.includes(name)),
  },
});

export default store;
