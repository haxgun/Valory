<script setup>
import Footer from '@/components/Footer.vue'
import IconBillCheck from '@/components/icons/IconBillCheck.vue'
import IconMagicStick from '@/components/icons/IconMagicStick.vue'
import IconPalette from '@/components/icons/IconPalette.vue'
import IconValory from '@/components/icons/IconValory.vue'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <main>
    <div class="main__body">
      <div class="main__container">
        <p class="pretitle">{{ $t('landing.pretitle') }}</p>
        <div class="logo">
          <IconValory :size="60" />
          <h1 class="title">VALORY</h1>
        </div>
        <p class="description">{{ $t('landing.description') }}</p>
        <div class="features">
          <div class="feature">
            <IconPalette />
            <p>{{ $t('landing.features.first') }}</p>
          </div>
          <div class="feature">
            <IconBillCheck />
            <p>
              {{ $t('landing.features.second') }}
            </p>
          </div>
          <div class="feature">
            <IconMagicStick />
            <p>{{ $t('landing.features.third') }}</p>
          </div>
        </div>
        <div class="buttons">
          <Button variant="outline">{{ $t('landing.buttons.first') }}</Button>
          <Button @click="$router.push('/editor')">{{ $t('landing.buttons.second') }}</Button>
        </div>
      </div>
      <Footer />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main__container {
  width: 70%;
}

.description {
  width: 70%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 18px;
}

.features {
  display: grid;
  gap: 12px;
  width: 75%;

  .feature {
    display: flex;
    gap: 12px;
    align-items: center;
    line-height: 1.3;

    --icons-color: hsla(0, 0%, 100%, 1);
    stroke: var(--icons-color);
    fill: var(--icons-color);

    p {
      margin: 0;
      font-weight: 400;
      font-size: 1.1rem;
    }
  }
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>
