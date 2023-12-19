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
        </div>

        <!-- song list -->
        <div class="song-list">
            <p>Song list here</p>
        </div>
    </div>
</template>

<script>
import getDocument from '@/composables/getDoc';

export default{
    props: ['id'],
    setup(props){
        const { error, document } = getDocument('playlists', props.id)

        return { error, document }
    }
}
</script>

<style>
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
</style>