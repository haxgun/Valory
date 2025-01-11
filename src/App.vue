<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const Highlights = defineAsyncComponent(() => import('@/components/HighlightsItem.vue'))
const IconLoading = defineAsyncComponent(() => import('@/components/icons/IconLoading.vue'))
const isRouterReady = ref<boolean>(false)
const router = useRouter()

router.isReady().finally(() => {
  isRouterReady.value = true
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    {
      name: 'keywords',
      content:
        'valory, valory tracker, valory obs, valory obs tracker,' +
        'valory overlay, obs tracker, obs overlay, valory valorant,' +
        'valorant, valorant obs, valorant tracker, valorant overlay,' +
        'valory obs overlay, valory valorant overlay, valory valorant obs,' +
        'valorant tracker, valorant tracker, valorant stream overlay, ' +
        'valorant player tracker, custom display for valorant, ' +
        'valorant leaderboard overlay, radiant rank tracker, ' +
        'winrate tracker for streamers, valorant win/lose display,' +
        ' custom valorant leaderboard, valorant obs overlay, ' +
        'radiant players tracker, valorant stream custom display, ' +
        'streamer winrate overlay, win/lose tracker for valorant, ' +
        'valorant rank display, valorant custom rank overlay, ' +
        'valorant stream leaderboard, radiant rank winrate, ' +
        'streamer valorant overlay, winrate display for valorant players',
    },
    { name: 'author', content: 'MAGICX, haxgun@vk.com' },
    { name: 'twitter:site', content: '@haxguno' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'img/meta.webp' },
    {
      name: 'twitter:description',
      content:
        'Elevate your Valorant streaming experience by using the Valory.' +
        ' Keep your viewers engaged and informed, and showcase your progress' +
        ' in the game while making your stream more captivating and memorable!',
    },
    { name: 'twitter:title', content: 'Stream Overlays - Valory' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'img/meta.webp' },
    {
      property: 'og:description',
      content:
        'Elevate your Valorant streaming experience by using the Valory. ' +
        'Keep your viewers engaged and informed, and showcase your progress ' +
        'in the game while making your stream more captivating and memorable!',
    },
    { property: 'og:title', content: 'Stream Overlays - Valory' },
    {
      name: 'description',
      content:
        'Elevate your Valorant streaming experience by using the Valory. ' +
        'Keep your viewers engaged and informed, and showcase your progress ' +
        'in the game while making your stream more captivating and memorable!',
    },
  ],
})
</script>

<template>
  <Highlights v-if="!$route.meta.hideHighlight" />
  <Transition mode="out-in" name="fade">
    <div v-if="!isRouterReady" class="app-loader">
      <IconLoading />
    </div>
    <div v-else>
      <router-view v-slot="{ Component }">
        <Transition mode="out-in" name="slide-fade">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </router-view>
    </div>
  </Transition>
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

.router-view-wrapper {
  position: relative;
}
</style>
