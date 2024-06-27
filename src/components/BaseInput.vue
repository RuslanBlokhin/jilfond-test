<script setup lang="ts"></script>

<template>
  <input type="text" class="input" placeholder="Введите id или имя" />
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  height: 49px;
  padding: 16px 24px;
  color: #76787d;
  border: 1.5px solid #e9ecef;
  border-radius: 8px;

  &::placeholder {
    font-family: 'Montserrat-Regular', sans-serif;
    color: #76787d;
  }
}
</style>
