<script setup lang="ts">
import Overlay from '@/components/Overlay.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const overlayId = route.params.overlayID as string | undefined;
if (!overlayId) {
  console.error('ID оверлея отсутствует');
}

const apiUrl = 'http://localhost:8000';

interface OverlayData {
  nickname: string;
  tag: string;
}

const nickname = ref<string>('');
const tag = ref<string>('');

async function fetchOverlayData(): Promise<void> {
  if (!overlayId) return;

  try {
    const response = await fetch(`${apiUrl}/overlays/${overlayId}`);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: OverlayData = await response.json();
    nickname.value = data.nickname;
    tag.value = data.tag;

    console.log('Nickname:', nickname.value);
    console.log('Tag:', tag.value);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

onMounted(() => {
  fetchOverlayData();
});
</script>

<template>
  <div style="color: black">
    <p>Nickname: {{ nickname }}</p>
    <p>Tag: {{ tag }}</p>
  </div>
  <Overlay />
</template>

<style lang="scss">
:root {
  background: none !important;
}

.blicks {
  display: none;
}
</style>
