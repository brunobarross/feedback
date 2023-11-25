<script setup>
import { computed } from "vue";
import TheButton from "./TheButton.vue";
import { PhPlus, PhUser } from "@phosphor-icons/vue";
import { useAuthStore } from "../stores/auth.store";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "../stores/GLOBAL.store";
const props = defineProps({
  sugestions: {
    type: Number,
    default: 0,
  },
});

const { makeLogin, signOut } = useAuthStore();
const {feedbacks} = storeToRefs(useGlobalStore())


const { user } = storeToRefs(useAuthStore());

const suggestions = computed(()=>{
  if(!feedbacks.value.length) return '0 Suggestions'
  return feedbacks.value.length > 1 ? `${feedbacks.value.length} Suggestions` : `${feedbacks.value.length} Suggestion`
})


</script>
<template>
  <header class="bg-slate-900 p-6 rounded">

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
          Olá, {{ user.displayName }}!
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
          text="Sair"
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
