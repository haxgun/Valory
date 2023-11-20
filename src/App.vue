<script setup>
import Highlights from '@/components/Highlights.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isRouterReady = ref(false)
const router = useRouter()

router.isReady().finally(() => (isRouterReady.value = true))
</script>

<template>
  <Highlights />
  <div v-if="!isRouterReady" class="app-loader">
    <ProgressSpinner
      style="width: 50px; height: 50px"
      strokeWidth="8"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />
  </div>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
</template>

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
  height: 100%;
}
</style>
