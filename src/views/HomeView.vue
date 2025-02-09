<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <div class="sections-wrapper">
      <ContentTopic
        v-for="(section, index) in sections"
        :key="section.id"
        :title="section.title"
        :content="section.content"
        :sectionId="section.id"
        :index="index"
        :page="pageName"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import ContentTopic from "@/components/ContentTopic.vue"
import { useTranslate } from '../composables/useTranslate';

const { translations } = useTranslate()

const route = useRoute()

const pageName = computed(()=> String(route.name));
const title = computed(() => translations.value.pages[pageName.value].title)
const sections = computed(() => translations.value.pages[pageName.value].sections)
</script>

<style scoped>
.container{
  margin: 20px;
}
.sections-wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 20px;
}
h2 {
  font-weight: 700;
}
</style>
