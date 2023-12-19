<template>
    <div v-if="error" class="error"> {{ error }}</div>
    <div v-if="document" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="document.coverUrl">
            </div>
            <h2> {{ document.title }} </h2>
            <p class="username"> Created by {{ document.username }} </p>
            <p class="description"> {{ document.description }} </p>
            <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
        </div>

        <!-- song list -->
        <div class="song-list">
            <div v-if="!document.songs.length">
                No songs have been added to playlist
            </div>
            <div v-for="song in document.songs" :key="song.id" class="single-song">
                <div class="details">
                    <h3> {{ song.title }} </h3>
                    <p> {{ song.artist }} </p>
                </div>
                <button v-if="ownership" @click="handleSongDelete(song.id)">Delete</button>
            </div>
            <AddSong v-if="ownership" :playlist="document"/>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import getDocument from '@/composables/getDoc';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDoc';
import useStorage from '@/composables/useStorage';
import AddSong from '@/components/AddSong.vue';

export default{
    props: ['id'],
    components: { AddSong },
    setup(props){
        const { error, document } = getDocument('playlists', props.id)
        const { user } = getUser()
        const { delDoc, upDoc } = useDocument('playlists', props.id)
        const { deleteImage } = useStorage()
        const router = useRouter()

        const ownership = computed(() => {
            //document is not null && user is not null && user have ownership
            return document.value 
                    && user.value 
                    && user.value.uid == document.value.uid
        })

        async function handleDelete(){
            await deleteImage(document.value.filePath)
            await delDoc()
            router.push({ name: 'Home' })
        }

        async function handleSongDelete(id){
            
            const songs = document.value.songs.filter((song) => song.id != id);
            
            await upDoc({ songs })
            
        }

        return { error, document, ownership, handleDelete, handleSongDelete }
    }
}
</script>

<style scoped>
    .playlist-details{
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px;
    }

    .cover {
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
    }

    .cover img {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: 150%;
        max-height: 150%;
    }

    .playlist-info {
        text-align: center;
    }

    .playlist-info h2 {
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
    }

    .playlist-info p {
        margin-bottom: 20px;
    }

    .username {
        color: #999;
    }

    .description {
        text-align: left;
    }

    .single-song {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--secondary);
        margin-bottom: 20px;
    }
</style>