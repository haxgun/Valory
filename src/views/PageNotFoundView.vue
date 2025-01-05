<script lang="ts" setup>
import UiButton from '@/components/ui/ButtonUI.vue'
import { ArrowLeftIcon } from '@untitledui-icons/vue/solid'
</script>

<template>
  <main>
    <div class="main__body">
      <div class="main__container">
        <img alt="" class="s404" src="/404.png" />
        <h1 class="title">Whooops, this page is gone</h1>
        <p class="subtitle">This page is missing or you wrote the link incorrectly.</p>
      </div>
      <ui-button @click="$router.push('/')">
        <ArrowLeftIcon class="arrow-icon" />
        Back to home
      </ui-button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.s404 {
  filter: drop-shadow(0 0 100px #ff0016);
  width: 100%;
  margin-bottom: 20px;
}

.title {
  margin: 0;
  font-weight: bold;
  font-size: 34px;
}

.subtitle {
  margin: 0;
  font-weight: 300;
  font-size: 15px;
  color: #9f9f9f;
  position: relative;
  top: -20px;
}

svg {
  width: 15px;
}

button {
  margin-top: 15%;
}
</style>
