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


onMounted(async () => {
  persistLogin();
  getCategories();
  getFeedbacks();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-3">
      <LeftContent />
    </div>
    <div class="col-span-9">
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
