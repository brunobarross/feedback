<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "Default",
  },
  
});
</script>

<template>
  <button class="flex items-center justify-center gap-1 py-2 px-4 rounded transition-all">
    <slot name="icon"></slot>
    {{ text }}
  </button>
</template>
