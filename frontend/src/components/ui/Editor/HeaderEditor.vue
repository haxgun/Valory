<script lang="ts" setup></script>

<template>
  <div class="editor__container__header">
    <h1 class="title">{{ $t('editor.header.title') }}</h1>
    <p class="description">{{ $t('editor.header.description') }}</p>
  </div>
</template>

<style lang="scss" scoped>
h1,
p {
  margin: 0;
}

.editor__container__header {
  padding: calc(0.25 * 6rem);
  border-bottom: 1px solid hsla(222deg 6% 30% / 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    font-weight: 600;
    font-size: calc(0.25 * 4.5rem);
  }

  .description {
    color: hsla(222deg 5% 62% / 1);
    font-size: 0.875rem;
    line-height: 1.5;

    display: flex;
    flex-direction: column;
  }
}
</style>
