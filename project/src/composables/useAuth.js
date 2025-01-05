import { ref } from 'vue'

const isAuthenticated = ref(false)
const user = ref(null)

// 模拟用户数据，实际项目中应该从后端获取
const MOCK_USER = {
  username: 'admin',
  password: 'admin123'
}

export function useAuth() {
  const login = async (username, password) => {
    // 模拟API调用
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === MOCK_USER.username && password === MOCK_USER.password) {
          isAuthenticated.value = true
          user.value = { username }
          localStorage.setItem('isAuthenticated', 'true')
          resolve(user.value)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('isAuthenticated')
  }

  const checkAuth = () => {
    const auth = localStorage.getItem('isAuthenticated')
    isAuthenticated.value = auth === 'true'
    return isAuthenticated.value
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth
  }
}