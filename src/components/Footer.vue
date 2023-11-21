<script setup>
import IconGithub from '@/components/icons/IconGithub.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconTelegram from '@/components/icons/IconTelegram.vue'
import IconTwitch from '@/components/icons/IconTwitch.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
let localStorageLang = localStorage.getItem('valoryLocale')
const switchLang = () => {
  locale.value === 'en' ? (locale.value = 'ru') : (locale.value = 'en')
  localStorage.setItem('valoryLocale', locale.value)
  localStorageLang = localStorage.getItem('valoryLocale')
}
</script>

<template>
  <footer>
    <span class="copyright"
      >{{ $t('landing.footer') }} <IconHeart style="fill: red" :size="24" /> © 2023 VALORY</span
    >
    <ul class="socials">
      <li class="social">
        <a target="__blank" href="https://www.twitch.tv/magicxcmd">
          <IconTwitch :size="18" />
        </a>
      </li>
      <li class="social">
        <a target="__blank" href="https://github.com/haxgun/valory">
          <IconGithub :size="18" />
        </a>
      </li>
      <li class="social">
        <a target="__blank" href="https://t.me/magicxcmd">
          <IconTelegram :size="18" />
        </a>
      </li>
      <li class="social">
        <a target="__blank" class="heart" href="https://www.donationalerts.com/r/haxgun">
          <IconHeart :size="18" />
        </a>
      </li>
      <li class="social">
        <a v-if="localStorageLang === 'en'" target="__blank" @click="switchLang">
          <Icon icon="flag:ru-4x3" width="18" height="18" />
        </a>
        <a v-else target="__blank" @click="switchLang">
          <Icon icon="flag:us-4x3" width="18" height="18" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: 26px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .copyright {
    display: flex;
    gap: 5px;
    font-weight: 600;
    align-items: center;
  }

  .socials {
    list-style: none;
    display: flex;
    gap: 16px;
    padding: 0;
    justify-content: center;
    align-items: center;
    margin: 16px 0 0 0;

    .social a {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 14px;
      background: rgb(255 255 255 / 3%);
      box-shadow:
        rgba(0, 0, 0, 0.02) 0px 2px 4px,
        rgba(0, 0, 0, 0.03) 0px -1px 2px inset;
      transition: all 0.2s;
      --icons-color: hsla(0, 0%, 100%, 1);
      stroke: var(--icons-color);
      fill: var(--icons-color);

      &.heart {
        --icons-color: red;
      }

      &:hover {
        background: rgb(255 255 255 / 10%);
      }
    }
  }
}
</style>
