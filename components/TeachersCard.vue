<template>
<v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-2"
      data-view
      :to="'/e1t1/' + e1t1.id"
      :elevation="hover ? 12 : 0"
      outlined
      min-width="220" 
      max-height="260">
        <div v-if = "e1t1.s_photo">
                <v-img :src = "e1t1.s_photo" width="220px" height="160px"></v-img>
            </div>
            <div v-else>
                <v-img :src = "artist.artist_image" width="220px" height="160px"></v-img>
            </div>
        <v-card-title>
          <p class="body-2">{{e1t1.teacher}}
            <!-- <v-btn v-if="e1t1.s_teacher_country" x-small class="text-decoration-none" > -->
              <country-flag :country= 'e1t1.s_teacher_country' size='small'/>
            <!-- </v-btn>  -->
            <v-icon small>
            mdi-heart-circle-outline
          </v-icon> 
          {{e1t1.username}}
          <!-- <v-btn v-if="e1t1.s_student_country" x-small class="text-decoration-none" > -->
              <country-flag :country= 'e1t1.s_student_country' size='small'/>
            <!-- </v-btn> -->
          </p>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-spacer></v-spacer>
            <div v-if = "e1t1.likes_sharing.length">
                <!-- <v-icon>mdi-creation</v-icon>  -->
                <p class="caption">{{e1t1.likes_sharing.length}} reactions</p>
            </div>
          </v-row>
        </v-card-text>
    </v-card>
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

