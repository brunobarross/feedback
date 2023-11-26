<script setup>
import { ref, onMounted, provide } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { useAuthStore } from "../stores/auth.store";
import LeftContent from "../components/LeftContent.vue";
import TheHeader from "../components/TheHeader.vue";
import FeedbackCard from "../components/FeedbackCard.vue";

const { getFeedbacks, getCategories } = useGlobalStore();
const { feedbacks, categories } = storeToRefs(useGlobalStore());

const { persistLogin } = useAuthStore();

const { user } = storeToRefs(useAuthStore());

const filterApplyed = ref(null)

const handleFilteredFeedbacks = (tag) => {
  filterApplyed.value = tag
  const filterFeedbacks = feedbacks.value.filter((feedback) => {
    return feedback.category.includes(tag);
  });

  if (filterFeedbacks.length === 0 || tag === 'all') {
    getFeedbacks();
  } else {
    feedbacks.value = filterFeedbacks;

  }
};




onMounted(async () => {
  persistLogin();
  getCategories();
  getFeedbacks();
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
    <div class="lg:col-span-3 hidden lg:block">
      <LeftContent @filter="handleFilteredFeedbacks" :filter-applyed="filterApplyed"/>
    </div>
    <div class="lg:col-span-9">
      <TheHeader />
      <div class="mt-6">
        <FeedbackCard
          v-for="feedback in feedbacks"
          :key="feedback.id"
          :feedback="feedback"
        />
      </div>
    </div>
  </div>
</template>
