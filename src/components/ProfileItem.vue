<script setup lang="ts">
const props = defineProps<{
  username: string;
  email: string;
  id: string;
}>();
</script>

<template>
  <li class="profile-item" :id="props.id">
    <div class="profile-item__image-wrapper">
      <img src="../assets/images/bg-small.png" alt="cover" class="profile-item__image" />
    </div>
    <div class="profile-item__info">
      <h3 class="profile-item__name">{{ props.username }}</h3>
      <div class="profile-item__email">{{ props.email }}</div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.profile-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  padding-right: 8px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001a;
  cursor: pointer;

  &__image-wrapper {
    min-width: 70px;
    height: 70px;
  }
  &__info {
    padding: 0 15px;
    overflow: hidden;
  }
  &__name {
    margin-bottom: 5px;
  }
}
</style>
