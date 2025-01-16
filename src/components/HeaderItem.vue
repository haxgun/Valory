<script setup lang="ts">

import IconValory from "@/components/icons/IconValory.vue";
</script>

<template>
  <header>
    <div class="highlight"></div>
    <div class="header">
      <div class="left">
        <ul class="nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/configurator">Configurator</RouterLink>
        </ul>
      </div>
      <div class="center">
        <IconValory :size="36"/>
      </div>
      <div class="right">
        <span>user</span>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;

  width: 60vw;
  margin: 0 auto;
  padding: 30px 0;
  z-index: 1;

  .highlight {
    position: fixed;
    top: -450px;
    left: 30%;
    width: 743px;
    height: 207px;
    flex-shrink: 0;

    border-radius: 743px;
    background: #F3465A;

    filter: blur(235.5px);
  }

  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .left {
      position: relative;
      left: 0;

      .nav {
        display: inline-flex;
        list-style: none;
        align-items: flex-start;
        gap: .5rem;
        margin: 0;
        padding: 0;

        a {
          color: #FFF;
          text-decoration: none;

          font-size: 16px;
          font-style: normal;
          font-weight: 525;
          line-height: normal;

          padding: .75rem .5rem;
        }
      }
    }

    .center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .right {
      position: relative;
      right: 0;
    }
  }
}
</style>