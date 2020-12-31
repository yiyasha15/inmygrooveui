<template>
<v-hover>
  <template v-slot="{ hover }" >
  <v-card class = "ma-1 pa-1 grey lighten-5"
   :elevation="hover ? 6 : 1" :to="'/' + artist.username" 
   min-width="270" max-height="240"> <!-- dark -->
    <v-container align="center">
        <div>
          <div v-if = artist.artist_image>
              <v-img :src = "artist.artist_image" width="230px" height="160px"/>
          </div>
          <!-- v-img covers larger area than only img tag -->
          <!-- <v-card-title color = "black" x-small>{{event.title}}</v-card-title> -->
          <v-card-actions>
            <p class="text-decoration-none">
            {{ artist.username }}
            </p>
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

