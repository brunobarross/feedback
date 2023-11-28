<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useGlobalStore } from "../stores/GLOBAL.store";
import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { PhArrowLeft } from "@phosphor-icons/vue";
import TheButton from "../components/TheButton.vue";

const models = ref({
  title: "",
  category: null,
  description: "",
});
const {
  getCategories,
  createFeedback,
  editFeedback,
  getFeedbacks,
  removeFeedback,
} = useGlobalStore();
const { categories, feedbacks } = storeToRefs(useGlobalStore());

const { user } = storeToRefs(useAuthStore());

const route = useRoute();
const router = useRouter();

const handleClickAddFeedback = async () => {
  if (Object.values(models.value).some((value) => !value))
    return alert("Preencha todos os campos");

  const objFeedback = {
    title: models.value.title,
    description: models.value.description,
    category: models.value.category,
    upvotes: [
      {
        [user.value.uid]: true,
      },
    ],
    status: "suggestion",
    comments: [],
    owner: user.value.uid,
  };
  await createFeedback(objFeedback);
  router.push({ name: "home" });
};

const handleClickEditFeedback = async () => {
  if (Object.values(models.value).some((value) => !value))
    return alert("Preencha todos os campos");
  const objFeedback = {
    title: models.value.title,
    description: models.value.description,
    category: models.value.category,
  };
  await editFeedback(objFeedback, dataFeedback.value);
  await getFeedbacks();
  router.push({ name: "home" });
  // router.push({ name: "home" });
};

const handleClickRemoveFeedback = async () => {
  await removeFeedback(dataFeedback.value.id);
  await getFeedbacks();
  router.push({ name: "home" });
};

const dataFeedback = computed(() => {
  return feedbacks.value.find((feedback) => feedback.id === route.params.id);
});

watch(
  () => dataFeedback.value,
  (v) => {
    if (!v) return;
    console.log(v);
    models.value.title = v.title;
    models.value.category = v.category;
    models.value.description = v.description;
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  getCategories();
});
</script>

<template>
  <div class="max-w-[600px] mx-auto px-4 lg:px-0 my-8 lg:my-0">
    <RouterLink to="/">
      <div
        class="flex items-center gap-2 dark:text-slate-100 text-slate-600 font-bold text-xs lg:text-base"
      >
        <PhArrowLeft />
        <p>Go Back</p>
      </div>
    </RouterLink>
    <div class="bg-white mx-auto px-6 py-8 lg:px-8 lg:py-10 rounded mt-12 lg:mt-16">
      <h2 class="text-lg lg:text-2xl font-bold text-slate-700">Create New Feedback</h2>
      <div class="flex flex-col mt-6">
        <div>
          <p class="text-xs lg:text-sm font-bold text-slate-700">Feedback Title</p>
          <p class="text-xs lg:text-sm  text-slate-400">
            Add a short, descriptive headline
          </p>
          <input
            type="text"
            v-model="models.title"
            class="bg-slate-200 w-full rounded py-2 px-4 mt-4 text-xs lg:text-sm "
          />
        </div>
        <div class="mt-6">
          <p class="text-xs lg:text-sm  font-bold text-slate-700">Category</p>
          <p class="text-xs lg:text-sm  text-slate-400">
            Choose a category for your feedback
          </p>
          <select
            class="bg-slate-200 w-full rounded py-2 px-4 mt-4 text-xs lg:text-sm "
            v-model="models.category"
          >
            <option v-for="category in categories" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mt-6">
          <p class="text-xs lg:text-sm  font-bold text-slate-700">Feedback Detail</p>
          <p class="text-xs lg:text-sm  text-slate-400">
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            v-model="models.description"
            class="bg-slate-200 w-full rounded py-2 px-4 mt-4 resize-none min-h-[100px] lg:min-h-[160px] text-xs lg:text-sm "
          ></textarea>
        </div>
        <div
          class="flex justify-end mt-10 gap-4"
          v-if="!route.meta.edit && user?.uid"
        >
          <TheButton
            text="Cancel"
            class="bg-slate-600 text-white font-semibold hover:bg-slate-800 h-10 lg:h-12 text-xs lg:text-base"
            @click="$router.push({ name: 'home' })"
          />
          <TheButton
            text="Add Feedback"
            class="bg-purple-600 text-white font-semibold hover:bg-purple-800 h-10 lg:h-12  text-xs lg:text-base"
            @click="handleClickAddFeedback"
          />
        </div>
        <div
          class="flex justify-between mt-6 lg:mt-10 lg:gap-4"
          v-else-if="route.meta.edit && user?.uid"
        >
          <TheButton
            text="Delete"
            class="bg-red-600 text-white font-semibold hover:bg-red-800 h-10 lg:h-12  text-xs lg:text-base"
            @click="handleClickRemoveFeedback"
          />
          <div class="flex  items-center">
            <TheButton
              text="Cancel"
              class="bg-slate-600 text-white font-semibold hover:bg-slate-800 h-10 lg:h-12  text-xs lg:text-base"
              @click="$router.push({ name: 'home' })"
            />
            <TheButton
              text="Save Changes"
              class="bg-purple-600 text-white font-semibold hover:bg-purple-800 h-10 lg:h-12  text-xs lg:text-base ml-4"
              @click="handleClickEditFeedback"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
