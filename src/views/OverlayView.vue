<script setup lang="ts">
import Overlay from '@/components/OverlayItem.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const overlayId = route.params.overlayID as string | undefined
if (!overlayId) {
  console.error('ID оверлея отсутствует')
}
</script>

<template>
  <Overlay />
</template>

<style lang="scss">
body {
  background: none !important;
}
</style>
