<script setup lang="ts"></script>

<template>
  <li class="profile-item">
    <div class="profile-item__image-wrapper">
      <img src="../assets/images/bg-small.png" alt="cover" class="profile-item__image" />
    </div>
    <div class="profile-item__info">
      <h3 class="profile-item__name">Bret</h3>
      <div class="profile-item__email">Sincere@april.biz</div>
    </div>
  </li>
  <li class="profile-item">
    <div class="profile-item__image-wrapper">
      <img src="../assets/images/bg-small.png" alt="caver" class="profile-item__image" />
    </div>
    <div class="profile-item__info">
      <h3 class="profile-item__name">Antonette</h3>
      <div class="profile-item__email">Shanna@melissa.tv</div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.profile-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001a;

  &__image-wrapper {
    min-width: 70px;
    height: 70px;
  }
  &__info {
    padding: 0 15px;
  }
  &__name {
    margin-bottom: 5px;
  }
}
</style>
