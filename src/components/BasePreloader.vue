<script setup lang="ts"></script>

<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 40px;
  padding: 4px;
  margin: 0 auto;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgb(227, 31, 36);
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
