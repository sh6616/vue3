import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'
import ImageCompress from '../views/ImageCompress.vue'

const routes = [
  {
    // 定义登录页面的路由
    path: '/login',
    // 路由名称
    name: 'Login',
    // 对应的组件
    component: Login,
    // 元数据，不需要认证即可访问
    meta: { requiresAuth: false }
  },
  {
    // 定义根路径的路由，通常是应用的首页
    path: '/',
    // 路由名称
    name: 'Dashboard',
    // 对应的组件
    component: Dashboard,
    // 元数据，需要认证才能访问
    meta: { requiresAuth: true }
  },
  {
    // 定义用户管理页面的路由
    path: '/users',
    // 路由名称
    name: 'Users',
    // 对应的组件
    component: Users,
    // 元数据，需要认证才能访问
    meta: { requiresAuth: true }
  },
  {
    // 定义图片压缩页面的路由
    path: '/image-compress',
    // 路由名称
    name: 'ImageCompress',
    // 对应的组件
    component: ImageCompress,
    // 元数据，需要认证才能访问
    meta: { requiresAuth: true }
  },
  {
    // 定义设置页面的路由
    path: '/settings',
    // 路由名称
    name: 'Settings',
    // 对应的组件
    component: Settings,
    // 元数据，需要认证才能访问
    meta: { requiresAuth: true }
  }
]

/**
 * 创建并配置Vue Router实例
 * @type {import('vue-router').Router}
 */
const router = createRouter({
  // 使用HTML5历史模式
  history: createWebHistory(),
  // 路由配置数组
  routes
})

/**
 * 全局前置守卫，用于在导航触发前进行权限检查
 * @param {import('vue-router').RouteLocationNormalized} to - 即将要进入的目标路由对象
 * @param {import('vue-router').RouteLocationNormalized} from - 当前导航正要离开的路由对象
 * @param {(to?: import('vue-router').RouteLocationRaw) => void} next - 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 */
router.beforeEach((to, from, next) => {
  // 使用useAuth组合式函数获取认证状态
  const { checkAuth } = useAuth()
  // 检查用户是否已认证
  const isAuthenticated = checkAuth()

  // 如果目标路由需要认证且用户未认证，则重定向到登录页面
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  // 如果目标路由是登录页面且用户已认证，则重定向到首页
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  // 否则，继续导航
  } else {
    next()
  }
})

export default router
