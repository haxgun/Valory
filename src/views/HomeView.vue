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
        <p class="pretitle">STREAM OVERLAY 2.0</p>
        <div class="logo">
          <IconValory :size="60" />
          <h1 class="title">VALORY</h1>
        </div>
        <p class="description">Catch your audience's attention with real-time VALORANT stats!</p>
        <div class="features">
          <div class="feature">
            <IconPalette />
            <p>Customize your overlay according to your stream.</p>
          </div>
          <div class="feature">
            <IconBillCheck />
            <p>
              It's absolutely FREE! There is support for many popular streaming programs like OBS
              and others.
            </p>
          </div>
          <div class="feature">
            <IconMagicStick />
            <p>Setup once and everything will always work!</p>
          </div>
        </div>
        <div class="buttons">
          <Button variant="outline">How it does work?</Button>
          <Button @click="$router.push('/editor')">Create your overlay</Button>
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
