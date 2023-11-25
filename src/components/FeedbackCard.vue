<script setup>
import { ref } from "vue";

const props = defineProps({
  feedback: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="bg-white"></div>
</template>
