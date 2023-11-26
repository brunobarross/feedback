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
    class="bg-slate-100 text-slate-600 font-semibold text-xs py-2 px-4 rounded flex items-center justify-center text-center capitalize transition-all"
    @click="$emit('filter', tag.id)"
  >
    {{ tag.name }}
  </button>
</template>
