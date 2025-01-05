<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMsg.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    await login(username.value, password.value)
    router.push('/')
  } catch (error) {
    errorMsg.value = '用户名或密码错误'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>后台管理系统</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-item">
          <input
            v-model="username"
            type="text"
            placeholder="用户名"
            autocomplete="username"
          >
        </div>
        <div class="form-item">
          <input
            v-model="password"
            type="password"
            placeholder="密码"
            autocomplete="current-password"
          >
        </div>
        <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1890ff;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-item input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}

.form-item input:focus {
  border-color: #1890ff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.error-message {
  color: #ff4d4f;
  font-size: 0.875rem;
  text-align: center;
}

button {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #40a9ff;
}

button:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}
</style>