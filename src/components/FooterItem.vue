<script lang="ts" setup>
import IconGithub from '@/components/icons/IconGithub.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconTelegram from '@/components/icons/IconTelegram.vue'
import IconTwitch from '@/components/icons/IconTwitch.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
</script>

<template>
  <footer>
    <span class="copyright"
      >{{ $t('landing.footer') }} <IconHeart :size="24" style="fill: red" /> © 2023 VALORY</span
    >
    <ul class="socials">
      <li class="social">
        <a href="https://www.twitch.tv/magicxcmd" target="__blank">
          <IconTwitch :size="18" />
        </a>
      </li>
      <li class="social">
        <a href="https://github.com/haxgun/valory" target="__blank">
          <IconGithub :size="18" />
        </a>
      </li>
      <li class="social">
        <a href="https://t.me/magicxcmd" target="__blank">
          <IconTelegram :size="18" />
        </a>
      </li>
      <li class="social">
        <a class="heart" href="https://www.donationalerts.com/r/haxgun" target="__blank">
          <IconHeart :size="18" />
        </a>
      </li>
      <li class="social language">
        <LanguageSwitcher />
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

    .social.language {
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

      &:hover {
        background: rgb(255 255 255 / 10%);
      }
    }

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
