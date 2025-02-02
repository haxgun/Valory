<script lang="ts" setup></script>

<template>
  <div class="blicks">
    <div class="blick1"></div>
    <div class="blick2"></div>
    <div class="blick3"></div>
  </div>
</template>

<style lang="scss" scoped>
.blicks {
  z-index: -1;

  .blick1 {
    position: fixed;
    width: 75%;
    height: 250px;
    top: 0px;
    left: 15%;
    border-radius: 120px 20px;
    opacity: 0.15;
    box-shadow: rgb(0, 143, 253) 20px 200px 240px;
    transform: rotate(-8deg) translateY(-175%) translateZ(0px);
    transition: box-shadow 0.3s ease 0s;
  }

  .blick2 {
    width: 50%;
    left: auto;
    right: 10%;
    border-radius: 20px 120px;
    opacity: 0.2;
    transform: rotate(8deg) translateY(-175%) translateZ(0px);
    box-shadow: rgb(37, 0, 202) 0px 160px 160px;
    position: fixed;
    height: 250px;
    top: 0px;
    transition: box-shadow 0.3s ease 0s;
  }

  .blick3 {
    inset: auto 5% 0px auto;
    opacity: 0.1;
    box-shadow: rgb(0, 143, 253) 0px -280px 220px;
    transform: rotate(-6deg) translateY(200%) translateZ(0px);
    position: fixed;
    width: 75%;
    height: 70%;
    top: 0px;
    left: 15%;
    border-radius: 120px 20px;
    transition: box-shadow 0.3s ease 0s;
  }
}
</style>
