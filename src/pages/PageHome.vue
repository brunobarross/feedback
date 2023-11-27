<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { useAuthStore } from "../stores/auth.store";
import LeftContent from "../components/LeftContent.vue";
import TheHeader from "../components/TheHeader.vue";
import TheHeaderMobile from '../components/TheHeaderMobile.vue';
import FeedbackCard from "../components/FeedbackCard.vue";
import TheEmptyItem from "../components/TheEmptyItem.vue";

const { getFeedbacks, getCategories, handleFilteredFeedbacks } = useGlobalStore();
const { feedbacks,  feedbackFiltrado, filterApplyed } = storeToRefs(useGlobalStore());

const { persistLogin } = useAuthStore();

const { user } = storeToRefs(useAuthStore());



watch(
 () => feedbacks.value,
 (v) => {
  feedbackFiltrado.value = v
 },
 {
  immediate: true
 }
 

)



onMounted(async () => {
  persistLogin();
  getCategories();
  getFeedbacks();
});
</script>

<template>
  <TheHeaderMobile/>
  <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
    <div class="lg:col-span-3 hidden lg:block">
      <LeftContent @filter="handleFilteredFeedbacks" :filter-applyed="filterApplyed"/>
    </div>
    <div class="lg:col-span-9 px-4">
      <TheHeader :feedbacks="feedbackFiltrado"/>
      <div class="mt-6" v-if="feedbackFiltrado.length">
        <FeedbackCard
          v-for="feedback in feedbackFiltrado"
          :key="feedback.id"
          :feedback="feedback"
        />
      </div>
      <div v-else class="mt-6 min-h-[200px] flex flex-col justify-center bg-white rounded">
          <TheEmptyItem  text="There are no feedbacks to display..."  />
        </div>
    </div>
  </div>
</template>
