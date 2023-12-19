import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.css'
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from "firebase/auth";


let app

//Await for user data from firebase
onAuthStateChanged(auth, ()=>{
    if(!app){
        app = createApp(App)
            .use(router)
            .mount('#app')
    }
})
