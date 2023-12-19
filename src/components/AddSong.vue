<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm=true">Add Songs</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Song</h4>
            <input type="text" placeholder="Song title" required v-model="title"/>
            <input type="tetx" placeholder="Artist" required v-model="artist"/>
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import useDocument from '@/composables/useDoc'

export default{
    props:['playlist'],
    setup(props){
        const { upDoc } = useDocument('playlists', props.playlist.id)

        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)

        async function handleSubmit(){
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 10000000)
            }

            await upDoc({
                songs: [...props.playlist.songs, newSong]
            })

            title.value = ""
            artist.value = ""
        }
        
        return { title, artist, showForm, handleSubmit }
    }
}
</script>

<style scoped>
    .add-song {
        text-align: center;
        margin-top: 40px;
    }

    form {
        max-width: 100%;
        text-align: left;
    }
</style>