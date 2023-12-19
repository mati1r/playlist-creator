<template>
    <div class="user-laylist">
        <h2>My Playlists</h2>
        <div v-if="documents">
            <ListView :playlists="documents"/>
        </div>
        <router-link class="btn" :to="{ name: 'CreatePlaylist' }">Create a new Playlist</router-link>
    </div>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default{
    components: {ListView},
    setup(){
        const { user } = getUser()
        const { documents } = getCollection(
            'playlists',
            ['uid', '==', user.value.uid]
        )

        return { documents }
    }
}
</script>

<style>

</style>