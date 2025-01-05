<script lang="ts" setup>
import IconValory from '@/components/icons/IconValory.vue'
</script>

<template>
  <main>
    <div class="main__body">
      <div class="main__container">
        <IconValory color="#fff" size="52" />
        <h1 class="title">Unsupported Device</h1>
        <div class="subtitle">
          <p>We're sorry, but this website is not supported on mobile devices at the moment.</p>
          <p>For the best experience, please access the site using a desktop browser.</p>
          <p>Thank you for your understanding!</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
body {
  background: #fa4454 !important;
}

.title {
  margin: 0;
  font-weight: bold;
  font-size: 34px;
  text-transform: uppercase;
  text-align: center;
}

.subtitle {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 75%;
  position: relative;
  top: -20px;
  margin-top: 1rem;

  p {
    text-align: center;
    margin: 0;
    font-weight: 600;
    font-size: 18px;
    color: #ffff;
  }
}
</style>
