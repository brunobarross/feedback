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

const suggestions = computed(()=>{
  if(!props.feedbacks.length) return '0 Suggestions'
  return props.feedbacks.length > 1 ? `${props.feedbacks.length} Suggestions` : `${props.feedbacks.length} Suggestion`
})


</script>
<template>
  <header class="dark:bg-slate-800
  bg-slate-900 p-6 rounded hidden lg:block">

    <div class="flex justify-between">
      <div class="flex items-center">
        <div>
          <p class="text-white font-semibold text-lg">
            {{ suggestions }} 
          </p>
        </div>
        <div class="ml-6">
          <label for="sort" class="text-slate-300 text-sm">Sort by:</label>
          <select
            name="sort"
            class="bg-transparent text-slate-300 font-semibold text-sm ml-2"
          >
            <option value="most_upvotes" class="text-neutral-900">
              Most Upvotes
            </option>
            <option value="most_upvotes" class="text-neutral-900">
              Most Comments
            </option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <h3 v-if="user?.uid" class="text-white">
          Hello, {{ user.displayName }}!
        </h3>
        <TheButton
          v-if="user?.uid"
          text="Add Feedback"
          class="bg-purple-600 text-white font-semibold hover:bg-purple-800"
          @click="() => $router.push({name:'new_feedback'})"
        >
          <template #icon>
            <PhPlus color="#fff" weight="bold" />
          </template>
        </TheButton>
        <TheButton
          v-if="!user?.uid"
          text="Login"
          class="bg-blue-600 text-white font-semibold hover:bg-blue-800"
          @click="makeLogin"
        >
          <template #icon>
            <PhUser color="#fff" weight="bold" />
          </template>
        </TheButton>
        <TheButton
          v-else
          text="Logout"
          class="bg-red-600 text-white font-semibold hover:bg-red-800"
          @click="signOut"
        >
          <template #icon>
            <PhUser color="#fff" weight="bold" />
          </template>
        </TheButton>
      </div>
    </div>
  </header>
</template>
