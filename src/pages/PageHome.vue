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
import TheMenuMobile from "../components/TheMenuMobile.vue";

const { getFeedbacks, getCategories, handleFilteredFeedbacks } = useGlobalStore();
const { feedbacks,  feedbackFiltrado, filterApplyed, menuMobileIsOpen } = storeToRefs(useGlobalStore());

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
  <TheHeaderMobile :feedbacks="feedbackFiltrado" />
  <Transition name="fade"
  enter-active-class="transition duration-300 ease-out"
  leave-active-class="transition duration-300 ease-out"

  >
    <TheMenuMobile v-if="menuMobileIsOpen" @filter="handleFilteredFeedbacks" :filter-applyed="filterApplyed" :user="user"/>
  </Transition>
 
  <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
    <div class="lg:col-span-3 hidden lg:block">
      <LeftContent @filter="handleFilteredFeedbacks" :filter-applyed="filterApplyed"/>
    </div>
    <div class="lg:col-span-9 px-4">
      <TheHeader :feedbacks="feedbackFiltrado"/>
      <div class="mt-10 lg:mt-6" v-if="feedbackFiltrado.length">
        <FeedbackCard
          v-for="feedback in feedbackFiltrado"
          :key="feedback.id"
          :feedback="feedback"
        />
      </div>
      <div v-else class="mt-6 min-h-[180px] flex flex-col justify-center dark:bg-slate-800 bg-white rounded">
          <TheEmptyItem  text="There are no feedbacks to display..."  />
        </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(110vw);
}



</style>
