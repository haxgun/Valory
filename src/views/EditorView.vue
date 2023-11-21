<script setup>
import Input from '@/components/ui/Input.vue'
import { ref } from 'vue'

const riotId = ref('')
</script>

<template>
  <main>
    <div class="main__body">
      <div class="main__container">
        <div class="editor">
          <div class="editor__body">
            <div class="editor__container">
              <div class="editor__container__header">
                <h1 class="title">{{ $t('editor.header.title') }}</h1>
                <p class="description">
                  {{ $t('editor.header.description') }}
                </p>
              </div>
              <div class="editor__container__body">
                <div class="editor__settings">
                  <div class="editor__settings__header">
                    <h1 class="title">{{ $t('editor.riotId.title') }}</h1>
                    <p class="description">
                      {{ $t('editor.riotId.description') }}
                    </p>
                  </div>
                  <Input v-model="riotId" placeholder="Riot ID" />
                  <span @click="riotId = 'MAGICX#1337'" class="random">{{
                    $t('editor.riotId.random')
                  }}</span>
                </div>
              </div>
              <div class="editor__container__body">
                <div class="editor__settings">
                  <div class="editor__settings__header">
                    <h1 class="title">{{ $t('editor.customization.title') }}</h1>
                    <p class="description">
                      {{ $t('editor.customization.description') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="preview">
              <div class="preview__container">
                <div class="preview__component">
                  <div>{{ $t('editor.preview.title') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.editor {
  width: 60vw;
  height: fit-content;
  background: hsl(0, 0%, 8%);
  border-radius: 8px;
  border: 1px solid hsla(222deg 6% 30% / 0.25);
  overflow: hidden;
  color: #fffbf5;

  h1,
  p {
    margin: 0;
  }

  .editor__body {
    display: flex;
    align-items: stretch;

    .editor__container {
      flex: 1;
      .editor__container__header,
      .editor__settings {
        padding: calc(0.25 * 6rem);
        border-bottom: 1px solid hsla(222deg 6% 30% / 0.25);
        display: flex;
        flex-direction: column;
        gap: 12px;

        .editor__settings__header {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .title {
          font-weight: 600;
          font-size: calc(0.25 * 4.5rem);
        }
        .description {
          color: hsla(222deg 5% 62% / 1);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .random {
          color: rgb(0, 143, 253);
          font-size: 0.875rem;
          line-height: 1.5;
          cursor: pointer;
        }
      }
    }

    .preview {
      flex: 1;

      .preview__container {
        width: 100%;
        height: 100%;
        padding: calc(0.25 * 6rem);
        background-image: url('@/assets/previews/breeze.webp');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;

        .preview__component {
          width: auto;
        }
      }
    }
  }
}
</style>
