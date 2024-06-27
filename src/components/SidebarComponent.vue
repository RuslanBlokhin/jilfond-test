<script setup lang="ts">
import ProfileItem from './ProfileItem.vue';
import BaseInput from './BaseInput.vue';
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__search">
      <h2 class="sidebar__title">Поиск сотрудников</h2>
      <BaseInput />
    </div>
    <div class="sidebar__search">
      <h2 class="sidebar__title">Результаты</h2>
      <ul class="sidebar__list">
        <ProfileItem />
      </ul>
      <div class="sidebar__text">Начните поиск</div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 23%;
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
  }
  &__text {
    margin-top: 10px;
  }
}
</style>
