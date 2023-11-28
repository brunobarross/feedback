<script setup>
import { PhArrowCircleUp, PhCaretUp } from "@phosphor-icons/vue";
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
  <button class="bg-slate-100 flex gap-2 lg:gap-0 lg:flex-col items-center p-1 px-4 lg:px-4 lg:py-4 rounded-lg transition-all hover:bg-slate-300 cursor-pointer" 
  :class="{'!opacity-50 !cursor-not-allowed pointer-events-none': isDisabled}"
  :disabled="isDisabled"
  @click.stop="$emit('up-vote')"

  >
    <PhArrowCircleUp color="#475569" :size="24" class="hidden lg:block" />
    <PhCaretUp color="#475569" :size="16" class="block lg:hidden" />
    <p class="text-xs lg:text-base font-semibold mt-1">{{ qtd }}</p>
  </button>
</template>
