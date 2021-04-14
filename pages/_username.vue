<template>
  <v-app>
    <v-container>
    <v-row>
        <v-col cols="12" sm="4" >
            <h1 class=" xs12 pl-4">{{artist.artist_name}}</h1>
        </v-col>
        <v-col cols="12" sm="8" class="px-2 d-flex align-end justify-end">
            <v-btn dark small rounded color="indigo" class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}`">About</v-btn>
            <v-btn dark small rounded color="indigo" class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}/journey`"> Journey</v-btn> 
            <v-btn dark small rounded color="indigo" class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}/each1teach1`">Each 1 Teach 1 </v-btn>
            <!-- <v-btn dark rounded color="indigo" class="elevation-0 text-decoration-none" :to= "`/${artist.username}/myhood`"> My hood</v-btn>  -->
        </v-col>
    </v-row>
    </v-container>
    <nuxt-child :artist='artist' :bio='bio' />

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
          let bio_response = await EventService.getBio(params.username)
        // let artist_response = await EventService.getArtist(params.username)
        return {
            artist: artist_response.data,
            bio: bio_response.data,
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    layout: 'username'
    
}
</script>

<style scoped>

</style>
