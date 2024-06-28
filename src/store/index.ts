import { createStore } from 'vuex';
import IUser from '../models/UserModel';
import $http from '../api';

const store = createStore({
  state: {
    users: [] as Array<IUser>,
  },
  mutations: {
    SET_USERS(state, payload: Array<IUser>) {
      state.users = payload;
    },
  },
  actions: {
    async getUsersAction({ commit }) {
      try {
        const { data } = await $http.get('');
        const sortingData = data.sort((a: { username: string }, b: { username: string }) =>
          a.username.localeCompare(b.username),
        );

        commit('SET_USERS', sortingData);
        console.log(sortingData);
      } catch (error) {}
    },
    async searchUsersAction({ commit }, id: number) {
      try {
        const { data } = await $http.get(`?id=${id}`);
        console.log(data);

        commit('SET_USERS', data);
      } catch (error) {}
    },
  },
  getters: {
    getUsers: state => (name: string) => state.users.filter(user => user.username.includes(name)),
  },
});

export default store;
