<template>
  <select v-model="selectedLang" @change="changeLanguage">
      <option v-for="lang in languages" :key="lang">
          {{ lang }}
      </option>
  </select>
</template>

<script setup lang="ts">
import { LANGUAGES as languages } from '../constants/index';
import { ref, onMounted } from 'vue';
import { useTranslate } from '../composables/useTranslate';

const translation = useTranslate();
const selectedLang = ref<string>(translation.lang.value);

const changeLanguage = () => {
  translation.setLanguage(selectedLang.value);
}

onMounted(() => {
  const savedLang = translation.lang.value;
  selectedLang.value = savedLang;
});
</script>

<style scoped>
select {
  font-size: 12px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}
</style>