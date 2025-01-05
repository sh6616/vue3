<script setup>
import Sidebar from '../components/Sidebar.vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="admin-layout">
    <Sidebar class="sidebar" />
    <div class="right-content">
      <header class="header">
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </header>
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.right-content {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #d9d9d9;
  color: #666;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 64px);
}
</style>