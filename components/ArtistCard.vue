<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
    class="ma-2"
      data-view
      :to="'/' + artist.username" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="220" 
        max-height="200"
    >
      <v-img
        v-if = artist.thumb :src = "artist.thumb" 
        :lazy-src= "artist.thumb" 
        class="grey lighten-2 white--text"
        aspect-ratio="1.5"
      />
      <v-card-actions>
            <div class="text-decoration-none body-2 font-weight-bold" width="70px">
            {{ artist.artist_name }}
            </div>
            <v-spacer></v-spacer>
            <v-btn icon class="text-decoration-none" >
              <country-flag  :country= 'artist.country' />
            </v-btn>
          </v-card-actions>
    </v-card>
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

