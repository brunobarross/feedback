<script setup>
import { computed } from "vue";
import TheButton from "./TheButton.vue";
import { PhPlus, PhUser } from "@phosphor-icons/vue";
import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
const props = defineProps({
  feedbacks:{
    type: Array,
    required: true
  }

});

const { makeLogin, signOut } = useAuthStore();

const { user } = storeToRefs(useAuthStore());


</script>

<template>
  <div
    class="bg-gradient-to-tr from-blue-700 py-4 px-6 flex lg:hidden flex-col justify-between"
  >
    <div>
      <h1 class="text-white text-base">Project Name</h1>
      <p class="text-white text-sm">Feedback Board</p>
    </div>
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
