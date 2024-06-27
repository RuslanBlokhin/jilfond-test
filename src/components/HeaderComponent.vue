<script setup lang="ts"></script>

<template>
  <header class="header">
    <h1 class="header__title">Жилфонд</h1>
    <div class="header__page-name">Пользователь</div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 26px;

  &__title {
    font-family: 'Montserrat-Bold', sans-serif;
    color: rgb(227, 31, 36);
    font-size: 32px;
    line-height: 1.22;
  }
  &__page-name {
    font-size: 16px;
    line-height: 1.25;
  }
}
</style>
