<script setup lang="ts">
import Overlay from '@/components/OverlayItem.vue'
import Button from '@/components/ui/ButtonUI.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import Input from '@/components/ui/InputUI.vue'
import UiModal from '@/components/ui/ModalWindow.vue'
import Switch from '@/components/ui/Switch.vue'
import riotIdsData from '@/data/riotIds.json'
import { onMounted, ref, watch } from 'vue'
import HeaderEditor from "@/components/ui/Editor/HeaderEditor.vue";
import PreviewEditor from "@/components/ui/Editor/PreviewEditor.vue";
import SectionSettingsEditor from "@/components/ui/Editor/SectionSettingsEditor.vue";
import ModalSettingsEditor from "@/components/ui/Editor/Modal/ModalSettingsEditor.vue";

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

const bgColor = ref('#ffffff')
const textColor = ref('#ffffff')
const primaryColor = ref('#ffffff')
const progressColor = ref('#ffffff')
const winColor = ref('#ffffff')
const loseColor = ref('#ffffff')
</script>

<template>
  <div class="editor">
    <div class="editor__body">
      <div class="editor__container" key="form">
        <HeaderEditor />
        <div class="editor__container__body">
          <SectionSettingsEditor :is-modal="true">
            <template #title>
              {{ $t('editor.profile.title') }}
            </template>
            <template #description>
              {{ $t('editor.profile.description') }}
            </template>
            <template #input>
              <Button class="editor__button" @click="openProfileModal"
                >{{ $t('editor.profile.button') }}
              </Button>
            </template>
          </SectionSettingsEditor>
          <SectionSettingsEditor v-if="form.hdevApiKey && form.riotId" :is-modal="true">
            <template #title>
              {{ $t('editor.configuration.title') }}
            </template>
            <template #description>
              {{ $t('editor.configuration.description') }}
            </template>
            <template #input>
              <Button class="editor__button" @click="openConfigurationModal"
                >{{ $t('editor.profile.button') }}
              </Button>
            </template>
          </SectionSettingsEditor>
          <SectionSettingsEditor v-if="form.hdevApiKey && form.riotId">
            <template #title>
              {{ $t('editor.url.title') }}
            </template>
            <template #description>
              {{ $t('editor.url.description') }}
            </template>
            <template #input>
              <Input placeholder="Overlay URL" style="flex: 2" />
            </template>
            <template #footer>
              <p>{{ $t('editor.url.dimensions') }}</p>
            </template>
          </SectionSettingsEditor>
          <ui-modal v-model="isProfileModalVisible">
            <template #title>
              {{ $t('editor.profile.title') }}
            </template>
            <ModalSettingsEditor>
              <template #header>
                <h1 class="title">{{ $t('editor.profile.riotId.title') }}</h1>
                <p class="description">{{ $t('editor.profile.riotId.description') }}</p>
              </template>
              <template #input>
                <Input v-model="form.riotId" placeholder="Riot ID" style="flex: 2" />
              </template>
              <template #footer>
                <span class="under_description" @click="generateRandomId">
                  {{ $t('editor.profile.riotId.random') }}
                </span>
              </template>
            </ModalSettingsEditor>
            <ModalSettingsEditor>
              <template #header>
                <h1 class="title">{{ $t('editor.profile.hdevKey.title') }}</h1>
                <span class="description">
                  {{ $t('editor.profile.hdevKey.description') }}
                  <span>{{ $t('editor.profile.hdevKey.instruction') }}</span>
                </span>
              </template>
              <template #input>
                <Input
                  v-model="form.hdevApiKey"
                  placeholder="HDEV-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  style="flex: 2"
                />
              </template>
              <template #footer>
                <span class="under_description">
                  {{ $t('editor.profile.hdevKey.instruction-dis') }}
                </span>
              </template>
            </ModalSettingsEditor>
          </ui-modal>
          <ui-modal v-model="isConfigurationModalVisible">
            <template #title>
              <span>{{ $t('editor.configuration.title') }}</span>
            </template>
            <ModalSettingsEditor>
              <template #header>
                <h1 class="title">{{ $t('editor.configuration.display.title') }}</h1>
                <p class="description">
                  {{ $t('editor.configuration.display.description') }}
                </p>
              </template>
              <template #options>
                <div class="item">
                  <span>
                    {{ $t('editor.configuration.display.items.background') }}
                  </span>
                  <Switch />
                </div>
                <div class="item">
                  <span>
                    {{ $t('editor.configuration.display.items.progress') }}
                  </span>
                  <Switch />
                </div>
                <div class="item">
                  <span>
                    {{ $t('editor.configuration.display.items.statistics') }}
                  </span>
                  <Switch />
                </div>
              </template>
            </ModalSettingsEditor>
            <ModalSettingsEditor>
              <template #header>
                <h1 class="title">{{ $t('editor.configuration.color.title') }}</h1>
                <p class="description">
                  {{ $t('editor.configuration.color.description') }}
                </p>
              </template>
              <template #options>
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
              </template>
            </ModalSettingsEditor>
          </ui-modal>
        </div>
      </div>
      <PreviewEditor
        :hdevApiKey="form.hdevApiKey"
        :riotId="form.riotId"
      >
        <Overlay v-if="form.hdevApiKey && form.riotId" />
      </PreviewEditor>
    </div>
  </div>
</template>

<style lang="scss" scoped>

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
      min-height: 485px;
      flex: 1;

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

        .editor__settings__footer {
          p {
            color: hsl(222deg 3.53% 27.53%);
            font-size: 0.875rem;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;

  &:first-child {
    margin-top: 15px;
  }
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
</style>
