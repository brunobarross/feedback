<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: true,
    default: "default",
  },
});
</script>
<template>
  <button class="bg-slate-200 text-slate-600 font-semibold text-xs py-2 px-4 rounded flex items-center justify-center text-center">
    {{ tag }}
  </button>
</template>
