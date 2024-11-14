<script setup>
import { useLocalStorage } from '@vueuse/core'
import { NConfigProvider, NDropdown, darkTheme } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
const localStorageLocale = useLocalStorage('valoryLocale', 'en')
</script>

<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <n-dropdown
        trigger="click"
        :options="
          availableLocales.map((l) => ({
            title: $t('languageName', {}, { locale: l }),
            key: l
          }))
        "
        size="medium"
        @select="
          (l) => {
            locale = l
            localStorageLocale = l
          }
        "
      >
        <n-button circle quaternary style="padding: 5px; font-size: 25px">
          <Icon :icon="`flag:${$t('flag')}-4x3`" width="18" height="18" />
        </n-button>
      </n-dropdown>
    </n-config-provider>
  </div>
</template>
