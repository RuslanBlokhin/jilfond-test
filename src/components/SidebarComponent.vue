<script setup lang="ts">
import ProfileItem from './ProfileItem.vue';
import BaseInput from './BaseInput.vue';
import type { Ref } from 'vue';
import IUser from '../models/UserModel';
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';

const store = useStore();
const firstLetter: Ref<string> = ref('');
const filteredUsers = computed((): Array<IUser> => store.getters.getUsers);
const users = computed((): Array<IUser> => store.state.users);

async function searchUsers(evt: Event) {
  const currentName = (evt.currentTarget as HTMLInputElement).value.trim();
  firstLetter.value = currentName[0];

  console.log(findUsersIds(currentName));
}

let usersArr = [...users.value];
function findUsersIds(name: string): number {
  const interval = 10;
  let startId = Math.round(usersArr.length / 2) - interval / 2;
  let endId = Math.round(usersArr.length / 2) + interval / 2;

  if (usersArr.length <= interval) {
    startId = 0;
    endId = usersArr.length;
  }

  for (let i = startId; i < endId; i++) {
    if (usersArr[i].username.toLowerCase() === name.toLowerCase()) return usersArr[i].id;
  }

  if (firstLetter.value < usersArr[startId].username[0]) {
    usersArr.splice(startId);

    findUsersIds();
  } else {
    usersArr = usersArr.splice(endId);

    findUsersIds();
  }

  return 0;
}

// function chekInterval(userArr) {
//   const interval = 10;
//   const startId = Math.round(usersArr.length / 2) - interval / 2;
//   const endId = Math.round(usersArr.length / 2) + interval / 2;

//   for (let i = startId; i < endId; i++) {
//     if (usersArr[i]?.username.toLowerCase() === name.toLowerCase()) return usersArr[i].id;
//   }
// }

onMounted(() => {
  const result = store.dispatch('getUsersAction');
});
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__search">
      <h2 class="sidebar__title">Поиск сотрудников</h2>
      <input @keyup.enter="searchUsers" type="text" class="input" placeholder="Введите id или имя" />
    </div>
    <div class="sidebar__search">
      <h2 class="sidebar__title">Результаты</h2>
      <ul class="sidebar__list">
        <ProfileItem v-for="user in filteredUsers" :key="user.id" :username="user.username" :email="user.email" />
      </ul>
      <div class="sidebar__text">Начните поиск</div>
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
