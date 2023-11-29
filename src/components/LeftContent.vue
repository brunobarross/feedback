<script setup>
import { ref, inject } from "vue";
import Tag from "./Tag.vue";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { storeToRefs } from "pinia";

const { categories, menuMobileIsOpen} = storeToRefs(useGlobalStore());
const emits = defineEmits(["filter"]);

const props = defineProps({
  filterApplyed:{
    type: String,
    required: true
  }
})




</script>

<template>
  <div
    class="bg-gradient-to-tr from-blue-700 p-6 flex flex-col justify-end items-start min-h-[160px] rounded"
  >

    <h1 class="text-white text-xl">Project Name</h1>
    <p class="text-white">Feedback Board</p>
  </div>
  <div class="tags mt-12 
   rounded gap-4 flex flex-wrap">

    <Tag
      v-for="tag in categories"
      :key="tag.id"
      :tag="tag"
      @filter="(tagId) => $emit('filter', tagId)"
      class="hover:bg-pink-600 
      hover:text-slate-100"
      :class="{
        '!bg-pink-600 !text-slate-100': props.filterApplyed === tag.id
      }"
    />
  </div>
</template>
