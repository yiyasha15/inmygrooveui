<template>
  <!--<v-card class = "ma-1 pa-1" hover @mousedown.stop :elevation="5" :to="`/${artist.username}` + `/${each1teach1.id}`" >-->
  <!--<v-card class = "ma-1 pa-1" hover @mousedown.stop :elevation="5" :to="'/' + artist.username + '/each1teach1/' + each1teach1.index">-->
  <!-- <v-card class = "ma-1 pa-1" hover @mousedown.stop :elevation="5" :to="'/'+share.s_student" > -->
  <v-hover>
  <template v-slot="{ hover }" >
  <v-card class = "ma-1 pa-1 grey lighten-5" :elevation="hover ? 6 : 1" :to="'/e1t1/' + share.id"  min-width="180" max-height="260"> <!-- dark -->
    <v-container align="center">
        <div>
          <!-- <div v-if = "share.s_photo">
              <v-img :src = "share.s_photo" width="180px" height="180px"/>
          </div>
          <div v-else> -->
            <div v-for = "artist in artists" :key = "artist.index">
                <div v-if="share.username === artist.username">
                   <v-img :src = "artist.thumb" width="180px" height="180px"/>
                </div>
            </div>
          <!-- </div> -->
          <!-- v-img covers larger area than only img tag -->
          <!-- <v-card-title color = "black" x-small>{{event.title}}</v-card-title> -->
          <v-card-actions>
            <p class="text-decoration-none">
            {{share.username}}
            </p>
            <v-spacer></v-spacer>
            <v-btn icon class="text-decoration-none" >
              <!-- <country-flag :country= 'share.s_teacher_country' /> -->
              <country-flag :country= 'share.s_student_country' />
            </v-btn>
            </v-card-actions>
        </div>
    </v-container>
  </v-card>
  </template>
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

