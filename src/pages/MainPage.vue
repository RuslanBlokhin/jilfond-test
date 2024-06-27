<script setup lang="ts">
import SidebarComponent from '../components/SidebarComponent.vue';
import ProfileComponent from '../components/ProfileComponent.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <main class="main-page">
      <SidebarComponent />
      <ProfileComponent />
    </main>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  align-items: flex-start;
  max-width: 1266px;
  width: 100%;
  height: 589px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001a;
}
</style>
