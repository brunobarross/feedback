import { collection, getDocs, getDoc, addDoc, doc, setDoc, where } from "firebase/firestore";
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { db } from "../services/firebase";
import { useAuthStore } from "./auth.store";


export const useGlobalStore = defineStore('global', () => {
    const { user } = storeToRefs(useAuthStore());
    const feedbacks = ref([]);
    const singleFeedback = ref(null);
    const categories = ref([]);
    const users = ref([]);
    const comments = ref([]);
    
    const getCategories = async () => {
        categories.value = []
        const querySnapshot = await getDocs(collection(db, "categories"));
        querySnapshot.forEach((doc) => {
            categories.value.push({
                id: doc.id,
                ...doc.data(),
            });
            console.log(doc.id, " => ", doc.data());
        });
    };

    const getFeedbacks = async () => {
        feedbacks.value = []
        const querySnapshot = await getDocs(collection(db, "feedbacks"));
        querySnapshot.forEach((doc) => {
            feedbacks.value.push({
                id: doc.id,
                ...doc.data(),
            });
            console.log(doc.id, " => ", doc.data());
        });
    };

    const getSingleFeedback = async (id) => {
        try {
            const querySnapshot = await getDocs(collection(db, "feedbacks"));
            const docSnap = await getDoc(doc(db, "feedbacks", id));
            if (docSnap.exists()) {
                singleFeedback.value = {
                    id: docSnap.id,
                    ...docSnap.data(),
                };

            } else {
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const getComments = async (id) => {
        try {
            const querySnapshot = await getDocs(collection(db, "comments"), where("feedbackId", "==", id));
            querySnapshot.forEach((doc) => {
                comments.value.push({
                    id: doc.id,
                    ...doc.data(),
                });
                console.log(doc.id, " => ", doc.data());
            });

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

    const sendUpVote = async (feedbackId) => {
        if (!user.value) return;
        try {

            const feedbackDoc = doc(db, "feedbacks", feedbackId);
            await setDoc(feedbackDoc, {
                upvotes: {
                    [user.value.uid]: true
                }
            }, { merge: true });
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const getUsers = async () => {
        try {
            users.value = []
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                users.value.push({
                    id: doc.id,
                    ...doc.data(),
                });
                console.log(doc.id, " => ", doc.data());
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return { getFeedbacks, getCategories, categories, feedbacks, createFeedback, sendUpVote, getSingleFeedback, singleFeedback, getUsers, users, getComments, comments }
})