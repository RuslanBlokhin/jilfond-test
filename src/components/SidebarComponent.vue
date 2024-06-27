<script setup lang="ts">
import ProfileSmall from '../components/ProfileSmall.vue';
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__search">
      <h2 class="sidebar__title">Поиск сотрудников</h2>
      <input type="text" class="sidebar__input" />
    </div>
    <div class="sidebar__search">
      <h2 class="sidebar__title">Результаты</h2>
      <ul class="sidebar__list">
        <ProfileSmall />
      </ul>
    </div>
  </aside>
</template>

<style scoped></style>
