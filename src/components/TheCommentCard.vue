<script setup>
import { ref, inject, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { useAuthStore } from "../stores/auth.store";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const { users } = storeToRefs(useGlobalStore());

const usuarioComentario = computed(() => {
  const usuarioEncontrado = users.value.find(
    (user) => user.id === props.comment.user
  );
  return usuarioEncontrado;
});
</script>

<template>
  <div class="flex flex-col border-b border-slate-100 pb-8" v-if="usuarioComentario">
    <div class="flex items-center">
      <div class="w-8 h-8 rounded-full">
        <img :src="usuarioComentario.photoURL" class="w-9 h-9 rounded-full" />
      </div>
      <div class="ml-6">
        <p class="text-sm font-bold text-slate-700">
          {{ usuarioComentario.name }}
        </p>
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm text-slate-700 mt-2">{{ props.comment.content }}</p>
    </div>
  </div>
</template>
