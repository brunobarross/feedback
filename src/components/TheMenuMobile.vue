<script setup>
import { ref, inject } from "vue";

import { useGlobalStore } from "../stores/GLOBAL.store";
import { storeToRefs } from "pinia";
import Tag from "./Tag.vue";
import TheButton from "./TheButton.vue";
import { useAuthStore } from "../stores/auth.store";


const { categories} = storeToRefs(useGlobalStore());
const { signOut } = useAuthStore();
const emits = defineEmits(["filter"]);

const props = defineProps({
  filterApplyed:{
    type: String,
    required: true
  },
  user:{
    type: Object,
    required: true
  }
})


</script>

<template>
    <div class="bg-blue-800 fixed top-20 right-0 min-h-screen w-[80vw] z-[1000] px-4 flex flex-col">
        <div class="flex justify-between items-center">
            <h3 v-if="user?.uid" class="text-white text-sm ">
          Hello, {{ user.displayName }}!
        </h3>
        <TheButton
          v-if="user?.uid"
          text="Logout"
          class="bg-red-600 text-white font-semibold hover:bg-red-800 text-xs "
          @click="signOut"
        >
          <template #icon>
            <PhUser color="#fff" weight="bold" />
          </template>
        </TheButton>
        </div>
        
        <div class="tags mt-6 p-6 
   rounded gap-4 flex flex-wrap dark:bg-white">

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




    </div>
</template>