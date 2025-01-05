<script setup lang="ts">
defineProps({
  hdevApiKey: {
    type: String,
    required: true,
  },
  riotId: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="preview">
    <div class="preview__container">
      <div class="preview__component">
        <slot></slot>
        <div class="text" v-if="!(hdevApiKey && riotId)">
          {{ $t('editor.preview.title') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  flex: 1;

  .preview__container {
    width: auto;
    height: 100%;
    padding: calc(0.25 * 6rem);
    background-image: url('@/assets/previews/breeze.webp');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::before {
      content: '';
      height: 100%;
      width: 100%;
      position: absolute;
      background: rgb(0 0 0 / 0.2);
      backdrop-filter: blur(3px);
      z-index: 0;
    }

    .preview__component {
      width: auto;
      z-index: 1;

      .text {
        text-align: center;
      }
    }
  }
}
</style>
