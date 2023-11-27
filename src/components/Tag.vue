<script setup>
const props = defineProps({
  tag: {
    type: Object,
    required: true
  },
});
const emits = defineEmits(["filter"]);

</script>
<template>
  <button
    class="bg-slate-100 text-slate-600 font-semibold text-xs py-1 px-2 lg:py-2 lg:px-4 rounded flex items-center justify-center text-center capitalize transition-all"
    @click="$emit('filter', tag.id)"
  >
    {{ tag.name }}
  </button>
</template>
