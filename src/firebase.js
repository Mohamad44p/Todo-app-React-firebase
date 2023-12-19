import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ1AgncMdSwC3zC2f2JN_6V8OwE3Pfw8M",
  authDomain: "todo-app-c375f.firebaseapp.com",
  projectId: "todo-app-c375f",
  storageBucket: "todo-app-c375f.appspot.com",
  messagingSenderId: "1027025307734",
  appId: "1:1027025307734:web:9e22b415d9c9ef9267d3f7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);