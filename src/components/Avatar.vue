<template>
  <div v-if="user" @click="isShowAvatarHandler">
    <img
      v-if="isShowAvatar && user?.avatar"
      :src="user?.avatar"
      alt="avatar"
    />
    <p v-else>{{ initials }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { fetchUserById } from "@/services/user"
import type { User } from "@/types/user.types"

const user = ref<User | null>(null)
const isShowAvatar = ref(false)
const initials = ref("")

onMounted(async () => {
  try {
    user.value = await fetchUserById()
  } catch (error) {
    alert(error)
  }

  if (user.value) {
    initials.value =
      user.value?.first_name && user.value?.last_name
        ? `${user.value?.first_name?.[0]}${user.value?.last_name?.[0]}`
        : "Acc"
  }
})

const isShowAvatarHandler = () => {
  isShowAvatar.value = !isShowAvatar.value
}
</script>

<style scoped>
div {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: whitesmoke;
}
img {
  width: 50px;
  height: 50px;
}
</style>
