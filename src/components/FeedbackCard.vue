<script setup>
import { ref,computed } from "vue";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { PhChatCircle } from "@phosphor-icons/vue";
import TheUpVoteButton from "./TheUpVoteButton.vue";
import Tag from "./Tag.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth.store";


const props = defineProps({
  feedback: {
    type: Object,
    required: true,
  },
});

const { sendUpVote, getFeedbacks, handleFilteredFeedbacks} = useGlobalStore();
const { categories, filterApplyed, isMobile } = storeToRefs(useGlobalStore());

const { user } = storeToRefs(useAuthStore());

const handleClickUpvote = async () => {
  await sendUpVote(props.feedback.id, user);
  await getFeedbacks();
  handleFilteredFeedbacks(filterApplyed.value);
};

const categoriasDoFeedback = computed(() => {
  const categoryIds = props.feedback.category;
  const categoriasEncontradas = categories.value.filter((category) =>
    categoryIds.includes(category.id)
  );

  return categoriasEncontradas;
});

const quantidadeUpvotes = computed(() => {
  return Object.keys(props.feedback.upvotes).length;
});

const isDisabled = computed(() => {
  if (!user.value) return true;
});
</script>

<template>
  <div
    class="bg-white rounded p-4 lg:p-8 cursor-pointer mb-6"
    @click="
      $router.push({
        name: 'feedback',
        params: {
          id: feedback.id,
        },
      })
    "
  >

    <div class="flex justify-between items-center">
      <div class="flex items-start">
        <TheUpVoteButton
      
        class="hidden lg:flex"
          @up-vote="handleClickUpvote"
          :qtd="quantidadeUpvotes"
          :is-disabled="isDisabled"
        />
        <div class="lg:ml-10">
          <h3 class="text-sm lg:text-lg font-bold text-slate-700">{{ feedback.title }}</h3>
          <p class="text-xs lg:text-base text-slate-400 mt-1">
            {{ feedback.description }}
          </p>
          <Tag
            v-for="category in categoriasDoFeedback"
            class="mt-2 lg:mt-4"
            :tag="category"
          />
        </div>
      </div>
      <div class="hidden lg:flex items-center ">
        <PhChatCircle :size="24" />
        <p class="text-sm ml-2 font-bold">{{ feedback.comments.length }}</p>
      </div>
    </div>
    <div class="flex items-center justify-between mt-2">
      <div class="flex lg:hidden items-center ">
        <PhChatCircle :size="24" />
        <p class="text-sm ml-2 font-bold">{{ feedback.comments.length }}</p>
      </div>
    </div>
  </div>
</template>
