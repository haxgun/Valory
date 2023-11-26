<script setup>
import Highlights from '@/components/Highlights.vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { h } from 'vue'
import { useRouter } from 'vue-router'

const isRouterReady = ref(false)
const router = useRouter()

router.isReady().finally(() => (isRouterReady.value = true))

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '36px'
  },
  spin: true
})
</script>

<template>
  <Highlights />
  <div v-if="!isRouterReady" class="app-loader">
    <a-spin :indicator="indicator" />
  </div>
  <router-view v-else v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
</template>

<style>
@import '@/assets/style.scss';
@import 'ant-design-vue/dist/reset.css';
</style>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.app-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
