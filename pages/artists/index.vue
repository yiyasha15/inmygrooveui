<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8"  class="justify-center">
        <div class ="pl-6 title xs12">Our Community</div>
      </v-col>
      <v-col cols="12" md="4" class= "pr-6 justify-end mb-2 px-6" >
          <v-text-field
            class="ma-0 pa-0"
            label="Search artists"
            placeholder=""
            rounded
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          ></v-text-field>
      </v-col>
    </v-row>
      <v-layout row wrap justify-center >
        <div v-for="artist in filteredArtists" :key ="artist.index">
          <v-flex sm6 xs6> 
            <ArtistCard :artist="artist" ></ArtistCard> 
          </v-flex>
          </div>
    </v-layout>
  </v-container>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue'
import EventService from '@/services/EventService.js'

export default {
  scrollToTop: true,
  head() {  //head function (a property of vue-meta), returns an object
    return {
      title: 'Artistlist -InMyGroove',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'List of artists joined - InMyGroove'
        }
      ]
    }
  },
  async asyncData({error}) {
    try {
      const response = await EventService.getArtists()
      return {
        artists: response.data
      }
    } catch (e) {
        error({statusCode:503, message: "unable to fetch artist data at this point"})
    }
  },
  components: {
    ArtistCard
  },
  data() {
    return {
      search: ""
    }
  },
  computed: {
    filteredArtists: function(){
      return this.artists.filter((artist) => {
        return artist.artist_name.toLowerCase().match(this.search.toLowerCase());
      });
      
    }
  }
}
</script>
