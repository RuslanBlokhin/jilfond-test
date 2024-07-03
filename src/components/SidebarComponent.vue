<script setup lang="ts">
import ProfileItem from './ProfileItem.vue';
import BaseInput from './BaseInput.vue';
import BasePreloader from './BasePreloader.vue';
import IUser from '../models/UserModel';
import type { Ref } from 'vue';
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';

const store = useStore();
const isNotFound: Ref<boolean> = ref(false);
const isLoading = computed((): boolean => store.state.isLoading);
const foundUsers = computed((): Array<IUser> => store.state.foundUsers);
const sortedUsers = computed((): Array<IUser> => store.state.sortedUsers);

function searchUsers(evt: KeyboardEvent) {
  store.commit('CLEAR_FOUND_USERS');
  store.commit('SET_LOADING', true);

  const currentInpitValue = (evt.currentTarget as HTMLInputElement).value;
  const foundUsers: Array<IUser> = [];
  const usersIds: Array<string> = [];

  currentInpitValue.split(',').forEach(nameOrId => {
    if (!isNaN(+nameOrId)) {
      usersIds.push(nameOrId.trim());
    } else {
      const user = searchByName(nameOrId.trim());
      if (user) foundUsers.push(user);
    }
  });

  if (usersIds.length) {
    store.dispatch('searchUsersByIds', usersIds);
  }

  if (foundUsers.length) {
    store.commit('SET_FOUND_USERS', foundUsers);
  }

  if (!foundUsers.length && !usersIds.length) {
    isNotFound.value = true;
  } else {
    isNotFound.value = false;
  }

  store.commit('SET_LOADING', false);
}

function searchByName(name: string): IUser | null {
  let usersArr = [...sortedUsers.value];
  const interval = 4;

  let startId;
  let endId;

  checkInterval();

  function checkInterval(): IUser | null {
    if (usersArr.length === 0) return null;

    startId = Math.round(usersArr.length - interval) / 2;
    endId = Math.round(usersArr.length + interval) / 2;

    if (usersArr.length <= interval) {
      startId = 0;
      endId = usersArr.length;
    }

    for (let i = startId; i < endId; i++) {
      if (usersArr[i].username.toLowerCase() === name.toLowerCase()) return usersArr[i];
    }

    if (name[0] < usersArr[startId].username[0]) {
      usersArr.splice(startId);
      checkInterval();
    } else {
      usersArr = usersArr.splice(endId);
      checkInterval();
    }

    return null;
  }

  return checkInterval();
}

function clickBackspace(evt: KeyboardEvent) {
  const currentInpitValue = (evt.currentTarget as HTMLInputElement).value;
  if (evt.key === 'Backspace' && foundUsers.value.length && !currentInpitValue.length) {
    store.commit('CLEAR_FOUND_USERS');
    store.commit('CLEAR_CURR_PROFILE');
  }
}

function searchCurrProfile(evt: any) {
  if (evt.currentTarget) {
    store.dispatch('searchCurrProfile', evt.currentTarget.id);
  }
}

onMounted(() => {
  store.dispatch('getUsers').then(err => {
    if (err) alert(err);
  });
});
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__search">
      <h2 class="sidebar__title">Поиск сотрудников</h2>
      <BaseInput @keyup.enter="searchUsers" @keyup="clickBackspace" type="text" placeholder="Введите id или имя" />
    </div>
    <h2 class="sidebar__title-results">Результаты</h2>
    <div class="sidebar__search-results">
      <div class="sidebar__results-block">
        <div v-if="isNotFound" class="sidebar__text">Ничего не найдео</div>
        <div v-else class="sidebar__results-wrapper">
          <ul v-if="foundUsers.length" class="sidebar__list">
            <ProfileItem
              @click="searchCurrProfile"
              v-for="user in foundUsers"
              :key="user.id"
              :id="String(user.id)"
              :username="user.username"
              :email="user.email"
            />
          </ul>
          <BasePreloader v-else-if="isLoading" />
          <div v-else class="sidebar__text">Начните поиск</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 23%;
  height: 100%;
  padding: 23px 0 20px;
  background-color: #fdfdfd;
  border-right: 1px solid #e0e0e0;

  &__search,
  &__title-results,
  &__text {
    padding: 0 30px 0 20px;
  }
  &__title-results {
    margin-bottom: 10px;
  }
  &__title {
    margin-bottom: 18px;
  }
  &__search {
    margin-bottom: 29px;
  }
  &__loader-wrapper {
    height: 40px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 18px;
    height: 384px;
    padding: 6px 30px 7px 20px;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgb(194, 194, 194);
      border-radius: 100px;
    }
  }

  &__text {
    margin-top: 10px;
  }
}
</style>
