<template>
  <header>
    <p>
      {{ headerTitle}}
    </p>
    <div>
      <RouterLink v-for="link in sectionLinks" :to="link.link" :key="link.id">
        {{ link.title }}
      </RouterLink>
      <Avatar />
      <SelectLanguage /> 
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SelectLanguage from '@/components/SelectLanguage.vue';
import Avatar from '@/components/Avatar.vue';
import { useTranslate } from '@/composables/useTranslate';
import { computed } from 'vue';

const { translations } = useTranslate()

const headerTitle = computed(() => translations.value.headerTitle)
const sectionLinks = computed(() =>
  Object.entries(translations.value.pages)?.map(([key, value]) => ({
    id: key,
    title: value.title,
    link: key === "page1" ? "/" : `/${key}`,
  }))
)
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 20px 15px;
  background-color: bisque;
  border-bottom: 1px solid black;
}
main {
  padding: 20px 25px;
}
header div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
p {
  font-size: 32px;
  margin: 0;
  font-weight: 500;
}
a {
  font-size: 16px;
  padding: 5px 20px;
  border: 1px solid black;
  color: black;
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
}
a:hover {
  background-color: rgb(228, 228, 228);
}

@media screen and (max-width: 768px) {
  p {
    font-size: 24px;
    text-align: center;
  }
  header {
    flex-direction: column;
    gap: 10px;
  }
  a {
    font-size: 14px;
    padding: 5px 15px;
  }
}
</style>
