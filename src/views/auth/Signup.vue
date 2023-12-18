<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" placeholder="Display name" v-model="displayName"/>
        <input type="email" placeholder="Emial" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div v-if="error" class="error"> {{ error }} </div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading...</button>
    </form> 
</template>

<script>
import { ref } from 'vue';
import useSignUp from '@/composables/useSignup';

export default{
    setup(){
        const {error, isPending, signup} = useSignUp()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        async function handleSubmit(){
            const res = await signup(email.value, password.value, displayName.value)
            
            if(!error.value){
                console.log("User signed up")
            }
        }

        return { displayName, email, password, error, isPending, handleSubmit }
    }
}
</script>

<style>

</style>