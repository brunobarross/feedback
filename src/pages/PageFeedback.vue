<script setup>
import { ref, onMounted, watch, computed} from "vue";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { PhArrowLeft } from "@phosphor-icons/vue";
import TheButton from "../components/TheButton.vue";
import FeedbackCard from "../components/FeedbackCard.vue";
import TheCommentCard from "../components/TheCommentCard.vue";
import TheEmptyItem from "../components/TheEmptyItem.vue";
import { RouterLink } from "vue-router";



const { getUsers, getComments, createComment, removeComment, getFeedbacks } = useGlobalStore();
const { comments, feedbacks} = storeToRefs(useGlobalStore());

const {persistLogin} = useAuthStore();
const { user } = storeToRefs(useAuthStore());


const route = useRoute();
const router = useRouter();

const models = ref({
  description: "",
});


const handleClickPostComment = async () => {
  if(!models.value.description.length) return
  const comment = {
    content: models.value.description,
    user: user.value.uid,
    feedbackId: singleFeedback.value.id,
  };
  await createComment(comment);
  models.value.description = "";
  getFeedbacks();
  getComments(route.params.id);
};


const handleClickRemoveComment = async (comment) => {
  await removeComment(comment);
  getFeedbacks();
  getComments(route.params.id);
};




const singleFeedback = computed(() => {
  return feedbacks.value.find((feedback) => feedback.id === route.params.id);
});

onMounted(async() => {
  await persistLogin();
  await getFeedbacks();
  await getComments(route.params.id);
  getUsers();

});
</script>

<template>
  <div class="max-w-[1000px] mx-auto">
    <div class="flex justify-between">
      <RouterLink to="/">
      <div class="flex items-center gap-2 dark:text-slate-100 text-slate-600 font-bold">
        <PhArrowLeft />
        <p>Go Back</p>
      </div>
    </RouterLink>
  
   
      <TheButton
      v-if="user?.uid === singleFeedback?.owner"
      text="Edit Feedback" class="bg-purple-600 text-white font-semibold hover:bg-purple-800 h-12 ml-auto" @click="()=> $router.push({
        name: 'edit_feedback',
        params: { id: singleFeedback?.id },
      })">
        <template #icon>
          <PhPencil />
        </template>
      </TheButton>

    </div>
    
    <div class="mt-4">
      <FeedbackCard v-if="singleFeedback" :feedback="singleFeedback" />
    </div>
    <div class="bg-white mx-auto p-10 rounded mt-4">
      <h3 class="text-lg font-bold text-slate-700">Comments</h3>
      <div >
        <template v-if="comments.length">
          <TheCommentCard v-for="comment in comments" :comment="comment" :user="user" @remove-comment="handleClickRemoveComment" />
        </template>
        <TheEmptyItem v-else text="There are no comments to display..." class="mt-8" />
      
      </div>

    </div>
    <div class="bg-white mx-auto p-10 rounded mt-4" v-if="user?.uid">
      <h3 class="text-lg font-bold text-slate-700">Add Comment</h3>
      <div class="mt-4">
        
        <textarea
          v-model="models.description"
          class="bg-slate-200 w-full rounded py-2 px-4 mt-4 resize-none min-h-[160px]"
        ></textarea>
        <div class="flex mt-4">
          <TheButton
            text="Post Comment"
            class="bg-pink-600 text-white font-semibold hover:bg-pink-800 h-12 ml-auto"
            @click="handleClickPostComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>
