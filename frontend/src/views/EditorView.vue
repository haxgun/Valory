<script setup lang="ts">
import Overlay from '@/components/Overlay.vue';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import { ref } from 'vue';

interface Form {
  riotId: string;
  hdevApiKey: string;
}

const form = ref<Form>({
  riotId: '',
  hdevApiKey: '',
});

const riotId = ref<string>('');

const overlayBol = ref<boolean>(true);

const handleSubmit = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8000/overlay', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      console.error('Ошибка при отправке!');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};
</script>

<template>
  <main>
    <div class="main__body">
      <div class="main__container">
        <div class="editor">
          <div class="editor__body">
            <div class="editor__container" key="form">
              <form @submit.prevent="handleSubmit">
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
                    <div class="editor__input">
                      <Input
                        style="flex: 2"
                        v-model="form.riotId"
                        placeholder="Riot ID"
                      />
                      <Button class="editor__button">{{
                        $t('editor.riotId.submit')
                      }}</Button>
                    </div>
                    <span @click="riotId = 'MAGICX#1337'" class="random">{{
                      $t('editor.riotId.random')
                    }}</span>
                  </div>
                </div>
                <div class="editor__container__body">
                  <div class="editor__settings">
                    <div class="editor__settings__header">
                      <h1 class="title">{{ $t('editor.hdevKey.title') }}</h1>
                      <p class="description">
                        {{ $t('editor.hdevKey.description') }}
                      </p>
                    </div>
                    <div class="editor__input">
                      <Input
                        style="flex: 2"
                        v-model="form.hdevApiKey"
                        placeholder="HDEV Api Key"
                      />
                    </div>
                  </div>
                </div>
                <Button class="editor__button" type="submit">Submit</Button>
              </form>
            </div>
            <div class="preview">
              <div class="preview__container">
                <div class="preview__component">
                  <Overlay v-if="overlayBol" />
                  <div v-else>{{ $t('editor.preview.title') }}</div>
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
  background: hsl(0, 0%, 9%);
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

        .editor__input {
          display: flex;
          gap: 8px;

          .editor__button {
            border-radius: 5px;
            padding: 0.7rem 1.1rem;
            font-size: 0.75rem;
          }
        }

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
        position: relative;

        &::before {
          content: '';
          height: 100%;
          width: 100%;
          position: absolute;
          background: rgb(0 0 0 / 0.2);
          backdrop-filter: blur(3px);
        }

        .preview__component {
          width: auto;
        }
      }
    }
  }
}
</style>
