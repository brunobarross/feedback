<script setup>
import { ref, inject } from "vue";
import Tag from "./Tag.vue";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { storeToRefs } from "pinia";



const {categories} = storeToRefs(useGlobalStore())
</script>

<template>
  <div class="bg-gradient-to-tl from-slate-700 p-6 flex flex-col justify-end items-start min-h-[200px] rounded">
    <h1 class="text-white text-xl">Front-end Mentor</h1>
    <p class="text-white">Feedback Board</p>
  </div>
  <div class="tags mt-6 bg-white rounded gap-4 flex flex-wrap p-6">
    <Tag v-for="tag in categories" :key="tag.id" :tag="tag.name" />

  </div>
</template>
