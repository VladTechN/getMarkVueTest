<template>
  <section>
    <h3>
      {{ props.title }}
    </h3>
    <p>
      {{ props.content }}
    </p>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
section p {
  font-size: 20px;
  margin-top: 20px;
}
section h3 {
  font-weight: 600;
}
@media screen and (max-width: 768px) {
  section p {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
