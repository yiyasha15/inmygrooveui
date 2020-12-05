<template>
  <v-card class = "ma-1 pa-1" hover @mousedown.stop :elevation="5" :to="'/' + artist.username + '/each1teach1/' + share.id">
  
    <v-container>

        <div>
          <p>{{artist.username}}</p>
          <v-img :src="share.s_photo" class="centerImage" height="100px" width="100px"/>
          <div class="text font-weight-light" v-for = "s_teacher in share.s_teacher" :key = "s_teacher.index">
              {{s_teacher.username}},{{s_teacher.country}}              
          </div>
        </div>

    </v-container>
  </v-card>
</template>

<script>
    export default {
      name: 'TeachersCard',
      props: {
        artist: Object,
        share: Object
      },
      
    }
</script>

