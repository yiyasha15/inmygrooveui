<template>
<v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      :to="'/e1t1/' + e1t1.id"
      :elevation="hover ? 12 : 0"
      outlined
      min-width="160" 
      max-height="160">
        <div v-if = "e1t1.s_photo">
                <v-img :src = "e1t1.s_photo" width="160px" height="100px"></v-img>
        </div>
        <div v-else>
            <v-img :src = "artist.artist_image" height="100"
        width="160"></v-img>
        </div>
        <v-card-title>
          <div class="caption">{{e1t1.teacher}}
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
          </div>
        </v-card-title>
        <!-- <v-card-text>
          <v-row>
            <v-spacer></v-spacer>
            <div v-if = "e1t1.likes_sharing.length">
                <p class="caption">{{e1t1.likes_sharing.length}} reactions</p>
            </div>
          </v-row>
        </v-card-text> -->
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

