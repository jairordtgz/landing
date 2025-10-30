import { initializeApp } from "https://www.gstatic.com/firebasejs/x.y.z/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/x.y.z/firebase-database.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig); 
const database = getDatabase(app); 

const saveVotes = (productId) => {
    const votesRef = ref(database,'votes'); 
    const newVoteRef = push(votesRef); 

    return set(newVoteRef, {
        productId: productId,
        timestamp: Date.now()
    })
    .then(() => {
        return {
            status: true,
            message: "Vote saved succesfully"
        }
    })
    .catch((error) => {
        console.error("Error saving vote: ",error); 
        return {
            status: false,
            message: "Error saving vote"
        }
    }); 
        
    

}

export {saveVotes}