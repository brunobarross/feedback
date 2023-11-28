<script setup>
import { computed } from "vue";
import TheButton from "./TheButton.vue";
import { PhPlus, PhUser } from "@phosphor-icons/vue";
import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "../stores/GLOBAL.store";
const props = defineProps({
  feedbacks:{
    type: Array,
    required: true
  }

});

const { makeLogin, signOut } = useAuthStore();
const {menuMobileIsOpen} = storeToRefs(useGlobalStore());

const { user } = storeToRefs(useAuthStore());


</script>

<template>

  <div
    class="bg-blue-800 py-4 px-6 flex lg:hidden lg:flex-col justify-between items-center h-20"
  >
    <div>
      <h1 class="text-white text-base">Project Name</h1>
      <p class="text-white text-sm">Feedback Board</p>
    </div>
    <button @click="menuMobileIsOpen = !menuMobileIsOpen">
      <PhList size="24" color="#fff" weight="bold" />
    </button>

  </div>
  <div class="dark:bg-slate-800
  bg-slate-900 py-2 px-4 rounded  lg:hidden">
  <div class="flex justify-between">
      <div class="flex items-center">
          <label for="sort" class="text-slate-300 text-xs">Sort by:</label>
          <select
            name="sort"
            class="bg-transparent text-slate-300 font-semibold text-xs ml-2"
          >
            <option value="most_upvotes" class="text-neutral-900">
              Most Upvotes
            </option>
            <option value="most_upvotes" class="text-neutral-900">
              Most Comments
            </option>
          </select>
      </div>
      <div class="flex items-center">
        <TheButton
          v-if="user?.uid"
          text="Add Feedback"
          class="bg-purple-600 text-white font-semibold hover:bg-purple-800 text-xs "
          @click="() => $router.push({name:'new_feedback'})"
        >
          <template #icon>
            <PhPlus color="#fff" weight="bold" />
          </template>
        </TheButton>
        <TheButton
          v-else-if="!user?.uid"
          text="Login"
          class="bg-blue-600 text-white font-semibold hover:bg-blue-800 text-xs "
          @click="makeLogin"
        />
      </div>
    </div>
  </div>

  
</template>
