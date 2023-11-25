<script setup>
import { PhArrowCircleUp } from "@phosphor-icons/vue";
const props = defineProps({
  qtd: {
    type: Number,
    default: 0,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["up-vote"]);
</script>

<template>
  <button class="bg-slate-100 flex flex-col items-center p-4 rounded-lg transition-all hover:bg-slate-300 cursor-pointer" 
  :class="{'opacity-50 cursor-not-allowed hover:bg-slate-100': isDisabled}"
  @click="$emit('up-vote')"

  >
    <PhArrowCircleUp color="#475569" :size="24" />
    <p class="font-semibold mt-1">{{ qtd }}</p>
  </button>
</template>
