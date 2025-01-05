<script setup lang="ts">
import DropdownMenu from '@/components/ui/DropdownMenu/DropdownMenu.vue'
import DropdownMenuItem from '@/components/ui/DropdownMenu/DropdownMenuItem.vue'
import { AVAILABLE_LOCALES } from '@/i18n'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n<{ locale: string; availableLocales: string[] }>()
const currentLocale = useLocalStorage<string>('valory-locale', 'en')
</script>

<template>
  <div>
    <DropdownMenu size="medium">
      <DropdownMenuItem
        v-for="lang of AVAILABLE_LOCALES"
        :key="lang.code"
        @select="
          () => {
            locale = lang.code
            currentLocale = lang.code
          }
        "
        :checked="currentLocale === lang.code"
      >
        <Icon :icon="`flag:${lang.flag}-4x3`" width="18" height="18" />
        {{ lang.name }}
      </DropdownMenuItem>
      <template #title>
        {{ $t('landing.languageSwitcher') }}
      </template>
      <template #button>
        <Icon :icon="`flag:${$t('flag')}-4x3`" width="18" height="18" />
      </template>
    </DropdownMenu>
  </div>
</template>
