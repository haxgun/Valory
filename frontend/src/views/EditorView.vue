<script setup lang="ts">
import Overlay from '@/components/OverlayItem.vue'
import Button from '@/components/ui/ButtonUI.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import Input from '@/components/ui/InputUI.vue'
import UiModal from '@/components/ui/ModalWindow.vue'
import UiSwitch from '@/components/ui/SwitchUI.vue'
import riotIdsData from '@/data/riotIds.json'
import { onMounted, ref, watch } from 'vue'

interface Form {
  riotId: string
  hdevApiKey: string
}

const form = ref<Form>({
  riotId: '',
  hdevApiKey: '',
})

const isProfileModalVisible = ref(false)

const openProfileModal = () => {
  isProfileModalVisible.value = true
}

const isConfigurationModalVisible = ref(false)

const openConfigurationModal = () => {
  isConfigurationModalVisible.value = true
}

const riotIds = riotIdsData.ids

const generateRandomId = () => {
  const randomIndex = Math.floor(Math.random() * riotIds.length)
  form.value.riotId = riotIds[randomIndex]
}

const saveFormData = () => {
  localStorage.setItem('hdevApiKey', form.value.hdevApiKey)
  localStorage.setItem('riotId', form.value.riotId)
}

watch(form, saveFormData, { deep: true })

onMounted(() => {
  const savedHdevApiKey = localStorage.getItem('hdevApiKey')
  const savedRiotId = localStorage.getItem('riotId')
  if (savedHdevApiKey) form.value.hdevApiKey = savedHdevApiKey
  if (savedRiotId) form.value.riotId = savedRiotId
})

const bgColor = ref({ hue: 0, rgb: { r: 255, g: 255, b: 255 } })
const textColor = ref({ hue: 0, rgb: { r: 255, g: 255, b: 255 } })
const primaryColor = ref({ hue: 0, rgb: { r: 255, g: 255, b: 255 } })
const progressColor = ref({ hue: 0, rgb: { r: 255, g: 255, b: 255 } })
const winColor = ref({ hue: 0, rgb: { r: 255, g: 255, b: 255 } })
const loseColor = ref({ hue: 0, rgb: { r: 255, g: 255, b: 255 } })
</script>

<template>
  <main>
    <div class="main__body">
      <div class="main__container">
        <div class="editor">
          <div class="editor__body">
            <div class="editor__container" key="form">
              <div class="editor__container__header">
                <h1 class="title">{{ $t('editor.header.title') }}</h1>
                <p class="description">{{ $t('editor.header.description') }}</p>
              </div>
              <div class="editor__container__body">
                <div class="editor__settings modal">
                  <div class="editor__settings__header">
                    <h1 class="title">{{ $t('editor.profile.title') }}</h1>
                    <p class="description">{{ $t('editor.profile.description') }}</p>
                  </div>
                  <div class="editor__input">
                    <Button class="editor__button" @click="openProfileModal">{{
                      $t('editor.profile.button')
                    }}</Button>
                  </div>
                  <ui-modal v-model="isProfileModalVisible">
                    <template #title>
                      {{ $t('editor.profile.title') }}
                    </template>
                    <div class="editor__container__body">
                      <div class="editor__settings">
                        <div class="editor__settings__header">
                          <h1 class="title">{{ $t('editor.profile.riotId.title') }}</h1>
                          <p class="description">{{ $t('editor.profile.riotId.description') }}</p>
                        </div>
                        <div class="editor__input">
                          <Input v-model="form.riotId" placeholder="Riot ID" style="flex: 2" />
                        </div>
                        <span class="under_description" @click="generateRandomId">{{
                          $t('editor.profile.riotId.random')
                        }}</span>
                      </div>
                    </div>
                    <div class="editor__container__body">
                      <div class="editor__settings">
                        <div class="editor__settings__header">
                          <h1 class="title">{{ $t('editor.profile.hdevKey.title') }}</h1>
                          <span class="description"
                            >{{ $t('editor.profile.hdevKey.description') }}
                            <span>{{ $t('editor.profile.hdevKey.instruction') }}</span>
                          </span>
                        </div>
                        <div class="editor__input">
                          <Input
                            v-model="form.hdevApiKey"
                            placeholder="HDEV-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                            style="flex: 2"
                          />
                        </div>
                        <span class="under_description">{{
                          $t('editor.profile.hdevKey.instruction-dis')
                        }}</span>
                      </div>
                    </div>
                  </ui-modal>
                </div>
                <div class="editor__settings modal">
                  <div class="editor__settings__header">
                    <h1 class="title">{{ $t('editor.configuration.title') }}</h1>
                    <p class="description">{{ $t('editor.configuration.description') }}</p>
                  </div>
                  <div class="editor__input">
                    <Button class="editor__button" @click="openConfigurationModal"
                      >{{ $t('editor.profile.button') }}
                    </Button>
                  </div>
                  <ui-modal v-model="isConfigurationModalVisible">
                    <template #title>
                      <span>{{ $t('editor.configuration.title') }}</span>
                    </template>
                    <div class="editor__container__body">
                      <div class="editor__settings">
                        <div class="editor__settings__header">
                          <h1 class="title">{{ $t('editor.configuration.display.title') }}</h1>
                          <p class="description">
                            {{ $t('editor.configuration.display.description') }}
                          </p>
                        </div>
                        <div class="editor__settings__options">
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.display.items.background') }}
                            </span>
                            <ui-switch />
                          </div>
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.display.items.progress') }}
                            </span>
                            <ui-switch />
                          </div>
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.display.items.statistics') }}
                            </span>
                            <ui-switch />
                          </div>
                        </div>
                      </div>
                      <div class="editor__settings">
                        <div class="editor__settings__header">
                          <h1 class="title">{{ $t('editor.configuration.color.title') }}</h1>
                          <p class="description">
                            {{ $t('editor.configuration.color.description') }}
                          </p>
                        </div>
                        <div class="editor__settings__options">
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.color.items.background') }}
                            </span>
                            <ColorPicker v-model="bgColor" />
                          </div>
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.color.items.main') }}
                            </span>
                            <ColorPicker v-model="textColor" />
                          </div>
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.color.items.primary') }}
                            </span>
                            <ColorPicker v-model="primaryColor" />
                          </div>
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.color.items.progress') }}
                            </span>
                            <ColorPicker v-model="progressColor" />
                          </div>
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.color.items.win') }}
                            </span>
                            <ColorPicker v-model="winColor" />
                          </div>
                          <div class="item">
                            <span>
                              {{ $t('editor.configuration.color.items.lose') }}
                            </span>
                            <ColorPicker v-model="loseColor" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ui-modal>
                </div>
              </div>
            </div>
            <div class="preview">
              <div class="preview__container">
                <div class="preview__component">
                  <Overlay v-if="form.hdevApiKey" />
                  <div class="text" v-if="!form.hdevApiKey">{{ $t('editor.preview.title') }}</div>
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

        &.modal,
        &.switch {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .reset {
            color: red;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .editor__settings__options {
          border-top: 1px dashed hsla(222deg 6% 30% / 0.25);

          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;

            &:first-child {
              margin-top: 15px;
            }
          }
        }

        .editor__input {
          display: flex;
          gap: 8px;
          align-items: center;

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

          display: flex;
          flex-direction: column;
        }

        .under_description {
          color: rgb(0, 143, 253);
          font-size: 0.875rem;
          line-height: 1.5;
          cursor: pointer;
          transition: box-shadow 0.2s linear;
          box-shadow: none;
          width: fit-content;

          &:hover {
            box-shadow: 0 1px 0 rgb(0, 143, 253);
          }
        }
      }
    }

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
  }
}
</style>
