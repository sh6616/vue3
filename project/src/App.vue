<script setup>
import { useRoute } from 'vue-router'
import AdminLayout from './layouts/AdminLayout.vue'

const route = useRoute()
</script>

<template>
  <AdminLayout v-if="route.meta.requiresAuth" />
  <router-view v-else />
</template>