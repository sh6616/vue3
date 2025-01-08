<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuItems = ref([
  { name: '仪表盘', path: '/', icon: '📊' },
  { name: '用户管理', path: '/users', icon: '👥' },
  { name: '图片压缩', path: '/image-compress', icon: '🖼️' },
  { name: '设置', path: '/settings', icon: '⚙️' },
])
</script>

<template>
  <nav class="sidebar-nav">
    <div class="logo">
      <h2>后台管理系统</h2>
    </div>
    <ul class="menu-list">
      <li
        v-for="item in menuItems"
        :key="item.path"
        class="menu-item"
        @click="router.push(item.path)"
      >
        <span class="icon">{{ item.icon }}</span>
        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  height: 100vh;
  position: fixed;
  width: 250px;
  background-color: #001529;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid #ffffff22;
  margin-bottom: 20px;
}

.logo h2 {
  color: white;
  font-size: 1.2rem;
}

.menu-list {
  list-style: none;
  flex: 1;
}

.menu-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.65);
}

.menu-item:hover {
  background-color: #1890ff;
  color: white;
}

.icon {
  margin-right: 10px;
}
</style>
