<template>
<v-hover>
  <template v-slot="{ hover }" >
    <v-card class = "ma-1 pa-1 grey lighten-5" :elevation="hover ? 6 : 1" 
    :to="'/e1t1/' + e1t1.id"
    min-width="180" min-height="260">
    
    <!-- <v-card class = "ma-1 pa-1 grey lighten-5" :elevation="hover ? 6 : 1" 
    :to="'/' + artist.username + '/each1teach1/' + e1t1.id"
    min-width="180" max-height="260">  -->
      <v-container align="center">
          <div>
            <div v-if = "e1t1.s_photo">
                <v-img :src = "e1t1.s_photo" width="120px" height="120px"/>
            </div>
            <div v-else>
                <v-img :src = "artist.artist_image" width="180px" height="180px"/>
            </div>
            <v-btn icon class="text-decoration-none" >
                <country-flag :country= 'e1t1.s_teacher_country' />
              </v-btn>
            <v-card-actions>
              <p class="text-decoration-none">
              {{e1t1.s_teacher}} -> {{e1t1.s_student}}
              </p>
              <v-spacer></v-spacer>
              </v-card-actions>
          </div>
      </v-container>
    </v-card>
  </template>
</v-hover>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import Each1teach1 from '~/pages/create/each1teach1.vue'
    export default {
      name: 'TeachersCard',
      props: {
        e1t1: Object
      },
      components:{
         CountryFlag
         }
    }
</script>

