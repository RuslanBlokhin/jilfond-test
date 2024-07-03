import { createStore } from 'vuex';
import IUser from '../models/UserModel';
import $http from '../api';

const store = createStore({
  state: {
    foundUsers: [] as Array<IUser>,
    sortedUsers: [] as Array<IUser>,
    currProfile: null as IUser | null,
    isLoading: false,
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
    SET_CURR_PROFILE(state, payload: IUser) {
      state.currProfile = payload;
    },
    CLEAR_CURR_PROFILE(state) {
      state.currProfile = null;
    },
    SET_LOADING(state, payload: boolean) {
      state.isLoading = payload;
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
      } catch (error: any) {
        if (error.response) {
          console.log(`Статус: ${error.response.status}`);

          if (error.response.status >= 400 && error.response.status < 500) return 'Ресурс не найден';
          if (error.response.status >= 500) return 'Ошибка сервера';
        } else if (error.request) {
          console.log(error);

          return `Неверные параметры запроса: ${error.message}`;
        } else {
          return `Ошибка: ${error.message}`;
        }
        console.error(error);
      }
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

        commit('SET_FOUND_USERS', data);
      } catch (error: any) {
        if (error.response) {
          console.log(`Статус: ${error.response.status}`);

          if (error.response.status >= 400 && error.response.status < 500) return 'Ресурс не найден';
          if (error.response.status >= 500) return 'Ошибка сервера';
        } else if (error.request) {
          console.log(error);

          return `Неверные параметры запроса: ${error.message}`;
        } else {
          return `Ошибка: ${error.message}`;
        }
        console.error(error);
      }
    },
    searchCurrProfile({ state, commit }, id: string) {
      const currProfile = state.foundUsers.find(user => user.id === +id);

      commit('SET_CURR_PROFILE', currProfile);
    },
  },
  getters: {},
});

export default store;
