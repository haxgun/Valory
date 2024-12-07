<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { NConfigProvider, NDropdown, NButton, darkTheme } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n<{ locale: string; availableLocales: string[] }>()
const localStorageLocale = useLocalStorage<string>('valoryLocale', 'en')

const handleSelectLocale = (selectedLocale: string) => {
  locale.value = selectedLocale
  localStorageLocale.value = selectedLocale
}
</script>

<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <n-dropdown
        trigger="click"
        :options="
          availableLocales.map((l) => ({
            title: $t('languageName', {}, { locale: l }),
            key: l,
          }))
        "
        size="medium"
        @select="handleSelectLocale"
      >
        <n-button circle quaternary style="padding: 5px; font-size: 25px">
          <Icon :icon="`flag:${$t('flag')}-4x3`" width="18" height="18" />
        </n-button>
      </n-dropdown>
    </n-config-provider>
  </div>
</template>
