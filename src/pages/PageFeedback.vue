<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { PhArrowLeft } from "@phosphor-icons/vue";
import TheButton from "../components/TheButton.vue";
import FeedbackCard from "../components/FeedbackCard.vue";
import TheCommentCard from "../components/TheCommentCard.vue";
import { async } from "@firebase/util";

const { getSingleFeedback, getUsers, getComments, createComment } = useGlobalStore();
const { singleFeedback, comments } = storeToRefs(useGlobalStore());

const {persistLogin} = useAuthStore();
const { user } = storeToRefs(useAuthStore());
const { users } = storeToRefs(useGlobalStore());

const route = useRoute();
const router = useRouter();

const models = ref({
  description: "",
});


const handleClickPostComment = async () => {
  const comment = {
    content: models.value.description,
    user: user.value.uid,
    feedbackId: singleFeedback.value.id,
  };
  await createComment(comment);
  models.value.description = "";
  getSingleFeedback(route.params.id);
  getComments(route.params.id);
};

onMounted(async() => {
  await persistLogin();
  await getSingleFeedback(route.params.id);
  await getComments(route.params.id);
  getUsers();
});
</script>

<template>
  <div class="max-w-[1000px] mx-auto py-20">
    <RouterLink to="/">
      <div class="flex items-center gap-2 text-slate-600 font-bold">
        <PhArrowLeft />
        <p>Go Back</p>
      </div>
    </RouterLink>
    <div class="mt-16">
      <FeedbackCard v-if="singleFeedback" :feedback="singleFeedback" />
    </div>
    <div class="bg-white mx-auto p-10 rounded mt-16">
      <h3 class="text-lg font-bold text-slate-700">Comments</h3>
      <div class="mt-8">
        <TheCommentCard v-for="comment in comments" :comment="comment" />
      </div>

    </div>
    <div class="bg-white mx-auto p-10 rounded mt-16">
      <h3 class="text-lg font-bold text-slate-700">Add Comment</h3>
      <div class="mt-4">
        
        <textarea
          v-model="models.description"
          class="bg-slate-200 w-full rounded py-2 px-4 mt-4 resize-none min-h-[160px]"
        ></textarea>
        <div class="flex mt-4">
          <TheButton
            text="Post Comment"
            class="bg-purple-600 text-white font-semibold hover:bg-purple-800 h-12 ml-auto"
            @click="handleClickPostComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>
