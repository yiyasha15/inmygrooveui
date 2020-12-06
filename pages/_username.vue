<template>
  <v-app>
    <v-container>
    <v-row>
        <v-col cols="12" sm="4" >
            <div class="font-weight-light display-1 xs12 pl-4">{{artist.artist_name}}</div>
        </v-col>
        <v-col class="px-0 d-flex align-end justify-end pr-4">
            <div>
                <v-btn dark rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/${artist.username}`">About</v-btn>
                <v-btn dark rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/${artist.username}/work`"> Work </v-btn>
                <v-btn dark rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/${artist.username}/each1teach1`">Each 1 Teach 1 </v-btn>
            </div>
        </v-col>
    </v-row>
    </v-container>
    <nuxt-child :artist='artist' />
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
    head() {
        return {
            title: this.artist.artist_name,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.name
                }
            ]
        }
    },
    async asyncData({error, params}) {
      try {
        let artist_response = await EventService.getArtist(params.username)
        return {
            artist: artist_response.data,
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    
}
</script>

<style scoped>

</style>
