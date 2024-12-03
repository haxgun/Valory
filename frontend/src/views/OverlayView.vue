<script setup>
import Overlay from '@/components/Overlay.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const overlayId = route.params.overlayID
const apiUrl = 'http://localhost:8000'

// Объявляем реактивные переменные для отображения в интерфейсе
const nickname = ref('')
const tag = ref('')

// Функция для загрузки данных
async function fetchOverlayData() {
  try {
    const response = await fetch(`${apiUrl}/overlay/${overlayId}`) // обратите внимание на путь (должно быть `overlays`)
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)

    // Присваиваем значения реактивным переменным
    nickname.value = data.nickname
    tag.value = data.tag

    console.log(nickname)
    console.log(tag)
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }
}

// Вызываем загрузку данных при монтировании компонента
onMounted(() => {
  fetchOverlayData()
})
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
