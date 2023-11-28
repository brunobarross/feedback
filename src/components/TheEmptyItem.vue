<script setup>
import {PhPulse} from '@phosphor-icons/vue'
defineProps({
  /**
   * Texto mostrado no item
   */
  text: {
    type: String,
    default: '',
  },
})
</script>
<template>
    <div
      class="text-paragraph-2 text-center m-auto !h-full flex-1 flex flex-col justify-center"
    >
    <PhPulse size="40" class="block mx-auto opacity-30 dark:text-white" />

      <p class="text-sm lg:text-base opacity-40 mt-2 dark:text-white">{{ text }}</p>
    </div>
  </template>
  

  
  <style lang="scss" scoped></style>
  