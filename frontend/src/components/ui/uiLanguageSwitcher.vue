<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import DropdownMenu from "@/components/ui/DropdownMenu.vue";

const { locale, availableLocales } = useI18n<{ locale: string; availableLocales: string[] }>()
const localStorageLocale = useLocalStorage<string>('valoryLocale', 'us')

const handleSelectLocale = (selectedLocale: string) => {
  locale.value = selectedLocale
  localStorageLocale.value = selectedLocale
}
</script>

<template>
  <div>
    <DropdownMenu
      :options="availableLocales.map((l) => ({
        title: $t('languageName', {}, { locale: l }),
        key: l,
        icon: `flag:${l}-4x3`
      }))"
      icons="True"
      size="medium"
      @select="handleSelectLocale"
    >
      <template #title>
        {{ $t('landing.languageSwitcher') }}
      </template>
      <template #button>
        <Icon :icon="`flag:${$t('flag')}-4x3`" width="18" height="18" />
      </template>
    </DropdownMenu>
  </div>
</template>
