<template>
<v-hover>
  <template v-slot="{ hover }" >
  <v-card class = "ma-1 pa-1 grey lighten-5"
   :elevation="hover ? 6 : 1" :to="'/' + artist.username" 
   min-width="240" max-height="220"> <!-- dark -->
    <v-container align="center">
        <div>
          <div v-if = artist.thumb>
              <v-img :src = "artist.thumb" width="210px" height="140px"/>
          </div>
          <!-- v-img covers larger area than only img tag -->
          <!-- <v-card-title color = "black" x-small>{{event.title}}</v-card-title> -->
          <v-card-actions>
            <div class="text-decoration-none" width="230px">
            {{ artist.artist_name }}
            </div>
            <v-spacer></v-spacer>
            <v-btn icon class="text-decoration-none" >
              <country-flag :country= 'artist.country' />
            </v-btn>
            </v-card-actions>
          <!-- <span>{{ event.attendees.length }} attending</span> -->
        </div>
      <!-- </nuxt-link> -->
    </v-container>
  </v-card>
  </template>
</v-hover>
</template>

<script>
import CountryFlag from 'vue-country-flag'
    export default {
      name: 'ArtistCard',
      props: {
        artist: Object
      },
      components: {
        CountryFlag
      },
      }
</script>

