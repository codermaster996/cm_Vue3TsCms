<template>
  <div class="user">
    <user-search />
    <user-content />
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
</script>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
