<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title"/>
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>
        
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange"/>
        <div class="error"> {{ fileError }} </div>

        <div class="error"></div>
        <button v-if="!isPendind">Create</button>
        <button v-if="isPendind" disabled>Creating...</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import { serverTimestamp} from 'firebase/firestore';

export default{
    setup(){
        const { filePath, url, uploadImage } = useStorage()
        const { error, addToDoc } = useCollection('playlists')
        const { user } = getUser()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPendind = ref(false)

        async function handleSubmit(){
            //Submit only when file have value
            if(file.value)
            {
                isPendind.value = true
                await uploadImage(file.value)
                await addToDoc({
                    title: title.value,
                    description: description.value,
                    uid: user.value.uid,
                    username: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: serverTimestamp()
                })

                isPendind.value = false
                if(!error.value){
                    console.log("playlist added")
                    title.value = ""
                    description.value = ""
                    file.value = null
                }
            }
        }

        //allowed filed types
        const types = ['image/png', 'image/jpeg']

        function handleChange(event){
            const selected = event.target.files[0]
            
            if(selected && types.includes(selected.type))
            {
                file.value = selected
                fileError.value = null
            }
            else
            {
                file.value = null
                fileError.value = "Please select image file (png or jpg)"
            }
        }

        return { title, description, fileError, isPendind, handleSubmit, handleChange}
    }
}
</script>

<style scoped>
    input[type="file"] {
        border: 0;
        padding: 0;
    }

    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }

    button {
        margin-top: 20px;
    }

</style>