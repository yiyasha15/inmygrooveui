<template>
<v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-2"
      data-view
      :to="'/e1t1/' + share.id" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="220" 
      max-height="200">
          <div v-for = "artist in artists" :key = "artist.index">
              <div v-if="share.username === artist.username">
                  <v-img :src = "artist.thumb" aspect-ratio="1.5"/>
              </div>
          </div>
          <v-card-title>
          <p class="text-decoration-none body-2">
          {{share.username}}
          </p>
          <v-spacer></v-spacer>
          <v-btn icon class="text-decoration-none pb-4" >
            <country-flag :country= 'share.s_student_country' />
          </v-btn>
        </v-card-title>
    </v-card>
  </v-hover>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
    export default {
      name: 'StudentsCard',
      props: {
        //artist: Object,
        share: Object
      },
      components:{
         CountryFlag
      },
      computed: {
        ...mapGetters(['artists', 'userHasPortfolio'])
      },
      
      
    }
</script>

