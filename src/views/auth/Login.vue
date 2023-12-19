<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Emial" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div v-if="error" class="error"> {{ error }} </div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>Loading...</button>
    </form> 
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default{
    setup() {
        const { error, isPending, login } = useLogin()
        const router = useRouter()

        const email = ref('')
        const password = ref('')

        async function handleSubmit(){
            const res = await login(email.value, password.value)

            if(!error.value){
                router.push({ name: 'Home' })
            }
        }

        return {email, password, error, isPending, handleSubmit}
    }
}
</script>

<style>

</style>