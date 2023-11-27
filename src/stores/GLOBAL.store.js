import { collection, getDocs, getDoc, addDoc, doc, setDoc, where, deleteDoc } from "firebase/firestore";
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { db } from "../services/firebase";
import { useAuthStore } from "./auth.store";


export const useGlobalStore = defineStore('global', () => {
    const { user } = storeToRefs(useAuthStore());
    const feedbacks = ref([]);
    const categories = ref([]);
    const users = ref([]);
    const comments = ref([]);

    const filterApplyed = ref('')

    const feedbackFiltrado = ref([])

    const getCategories = async () => {
        const querySnapshot = await getDocs(collection(db, "categories"));
        categories.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(categories.value);
    };

    const getFeedbacks = async () => {
        const querySnapshot = await getDocs(collection(db, "feedbacks"));
        feedbacks.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };


    const getComments = async (id) => {
        try {
            const querySnapshot = await getDocs(collection(db, "comments"), where("feedbackId", "==", id));
            comments.value = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(comments.value);

        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const createFeedback = async (feedback) => {
        try {
            const docRef = await addDoc(collection(db, "feedbacks"), feedback);
            console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }

    };

    const editFeedback = async (obj, feedback) => {
        console.log(feedback);
        try {
            debugger
            const feedbackDoc = doc(db, "feedbacks", feedback.id);
            const docRef = await setDoc(feedbackDoc, {
               ...obj
            }, { merge: true });
            console.log("Document written with ID: ");
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const createComment = async (comment) => {
        try {
            const docRef = await addDoc(collection(db, "comments"), comment);
            console.log("Document written with ID: ", docRef.id);
            if (docRef.id) {
                await setDoc(doc(db, "feedbacks", comment.feedbackId), {
                    comments: [...comments.value, docRef.id]
                }, { merge: true });
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const sendUpVote = async (feedbackId) => {
        if (!user.value) return;
        try {
            const feedbackDoc = doc(db, "feedbacks", feedbackId);
            const feedbackAtual = feedbacks.value.find(feedback => feedback.id === feedbackId);
            console.log(feedbackAtual);
            await setDoc(feedbackDoc, {
                upvotes: feedbackAtual.upvotes.includes(user.value.uid) ? feedbackAtual.upvotes : [...feedbackAtual.upvotes, user.value.uid]
            }, { merge: true });
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const removeUpVote = async (feedbackId) => {
        if (!user.value) return;
        try {
            const feedbackDoc = doc(db, "feedbacks", feedbackId);
            await setDoc(feedbackDoc, {
                upvotes: singleFeedback.value.upvotes.filter(upvote => upvote !== user.value.uid)
            }, { merge: true });
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const getUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            users.value = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const removeComment = async (commentObj) => {
        try {
            const docRef = await deleteDoc(doc(db, "comments", commentObj.id))
            await setDoc(doc(db, "feedbacks", commentObj.feedbackId), {
                comments: comments.value.filter(comment => comment.id !== commentObj.id)
            }, { merge: true });
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }

    const removeFeedback = async (feedbackId) =>{
        try {
            const docRef = await deleteDoc(doc(db, "feedbacks", feedbackId))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    const handleFilteredFeedbacks = (tag) => {
        console.log(tag);
        filterApplyed.value = tag
        const filterFeedbacks = feedbacks.value.filter((feedback) => {
            return feedback.category.includes(tag);
        });

        if (tag === 'all' && !filterFeedbacks.length) feedbackFiltrado.value = feedbacks.value
        else if (tag !== 'all' && !filterFeedbacks.length) feedbackFiltrado.value = []
        else feedbackFiltrado.value = filterFeedbacks;

    }


    watch(
        () => categories.value,
        (v) => {
            v.unshift({
                name: 'All',
                id: 'all'
            })
        },
        {
            immediate: true,
        }
    )

    


    return { getFeedbacks, getCategories, categories, feedbacks, createFeedback, sendUpVote, getUsers, users, getComments, comments, createComment, removeComment, removeUpVote, handleFilteredFeedbacks, feedbackFiltrado, filterApplyed, editFeedback, removeFeedback }
})