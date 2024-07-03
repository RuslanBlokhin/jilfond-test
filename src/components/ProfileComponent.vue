<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import IUser from '../models/UserModel';

const store = useStore();
const currProfile = computed((): IUser => store.state.currProfile);
</script>

<template>
  <div class="profile">
    <div v-if="currProfile" class="profile__full">
      <div class="profile__image-wrapper">
        <img src="../assets/images/bg.png" alt="cover" class="profile__image" />
      </div>
      <div class="profile__info">
        <h2 class="profile__name">{{ currProfile.name }}</h2>
        <div class="profile__info-block email">
          <h3 class="profile__info-block-key">email:</h3>
          <div class="profile__info-block-value">{{ currProfile.email }}</div>
        </div>
        <div class="profile__info-block">
          <h3 class="profile__info-block-key">phone:</h3>
          <div class="profile__info-block-value">{{ currProfile.phone }}</div>
        </div>
        <div class="profile__about">
          <h2 class="profile__about-title">О себе:</h2>
          <p class="profile__about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
    </div>
    <div v-else class="profile__empty">Выберите сотрудника, чтобы посмотреть его профиль</div>
  </div>
</template>

<style scoped lang="scss">
.profile {
  width: 78%;
  height: 100%;
  padding: 30px 30px 30px 21px;

  &__full {
    display: flex;
    justify-content: space-between;
  }
  &__empty {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__image-wrapper {
    width: 44%;
  }
  &__info {
    width: 51%;
  }
  &__name {
    margin-bottom: 10px;
  }
  &__info-block {
    display: flex;
    align-items: center;
    column-gap: 10px;

    &.email {
      margin-bottom: 10px;
    }
  }
  &__about {
    margin-top: 20px;
  }
  &__about-title {
    margin-bottom: 25px;
  }
}
</style>
