<script setup lang="ts">
import Highlights from '@/components/HighlightsItem.vue'
import IconLoading from '@/components/icons/IconLoading.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isRouterReady = ref<boolean>(false)

const router = useRouter()

router.isReady().finally(() => {
  isRouterReady.value = true
})
</script>

<template>
  <Highlights />
  <div v-if="!isRouterReady" class="app-loader">
    <IconLoading />
  </div>
  <router-view v-else v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
</template>

<style>
@import '@/assets/style.scss';
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.app-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}
</style>
