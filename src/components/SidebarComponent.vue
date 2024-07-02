<script setup lang="ts">
import ProfileItem from './ProfileItem.vue';
import BaseInput from './BaseInput.vue';
import IUser from '../models/UserModel';
import type { Ref } from 'vue';
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';

const store = useStore();
const isNotFound: Ref<boolean> = ref(false);
const foundUsers = computed((): Array<IUser> => store.state.foundUsers);
const sortedUsers = computed((): Array<IUser> => store.state.sortedUsers);

function searchUsers(evt: KeyboardEvent) {
  store.commit('CLEAR_FOUND_USERS');

  const currentInpitValue = (evt.currentTarget as HTMLInputElement).value;
  const foundUsers: Array<IUser> = [];
  const usersIds: Array<string> = [];

  currentInpitValue.split(',').forEach(nameOrId => {
    if (!isNaN(+nameOrId)) {
      usersIds.push(nameOrId.trim());
      store.dispatch('searchUsersByIds', usersIds);
    } else {
      const user = searchByName(nameOrId.trim());
      if (user) foundUsers.push(user);
    }
  });

  if (foundUsers.length !== 0) {
    store.commit('SET_FOUND_USERS', foundUsers);
    isNotFound.value = false;
  } else {
    isNotFound.value = true;
  }
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
  }
}

onMounted(() => {
  const result = store.dispatch('getUsers');
});
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__search">
      <h2 class="sidebar__title">Поиск сотрудников</h2>
      <BaseInput @keyup.enter="searchUsers" @keyup="clickBackspace" type="text" placeholder="Введите id или имя" />
    </div>
    <div class="sidebar__search">
      <h2 class="sidebar__title">Результаты</h2>
      <ul v-if="foundUsers.length" class="sidebar__list">
        <ProfileItem v-for="user in foundUsers" :key="user.id" :username="user.username" :email="user.email" />
      </ul>
      <div v-else class="sidebar__text">Начните поиск</div>
      <!-- <div v-if="isNotFound && !foundUsers.length" class="sidebar__text">Ничего не найдео</div> -->
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  // width: 23%;
  height: 100%;
  padding: 23px 30px 27px 20px;
  background-color: #fdfdfd;
  border-right: 1px solid #e0e0e0;

  &__title {
    margin-bottom: 18px;
  }
  &__search {
    margin-bottom: 29px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 18px;
    max-height: 384px;
    overflow-y: scroll;
  }
  &__text {
    margin-top: 10px;
  }
}
</style>
