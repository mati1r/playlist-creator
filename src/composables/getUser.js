import { auth } from '@/firebase/config';
import { onAuthStateChanged } from "firebase/auth";
import { ref } from 'vue';

const user = ref()

onAuthStateChanged(auth, (_user) => {
    user.value = _user
});

function getUser(){
    return { user }
}

export default getUser