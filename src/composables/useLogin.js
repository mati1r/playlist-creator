import { ref } from "vue"
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true

    const res = await signInWithEmailAndPassword(auth, email, password)
    .catch(() => {
        error.value = "Incorrect login credentials"
    });

    isPending.value = false

    return res
}

const useLogIn = () => {

    return { error, isPending, login }
}

export default useLogIn