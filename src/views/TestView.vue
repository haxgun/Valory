<script setup>
import Switch from "@/components/ui/Switch.vue";
import {ref} from "vue";
import Button from "@/components/ui/Button.vue";

const switchProfessional = ref(false)
</script>

<template>
  <h1>{{ switchProfessional }}</h1>
  <Switch
  name="switch"
  value="I'm a professional"
  v-model:checked="switchProfessional"/>
  <Button variant="outline" @click="$router.push('/editor')" :disabled="true">TEST</Button>
</template>

<style scoped>

</style>