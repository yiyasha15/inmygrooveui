<template>
  <!--<v-card class = "ma-1 pa-1" hover @mousedown.stop :elevation="5" :to="`/${artist.username}` + `/${each1teach1.id}`" >-->
  <!--<v-card class = "ma-1 pa-1" hover @mousedown.stop :elevation="5" :to="'/' + artist.username + '/each1teach1/' + each1teach1.index">-->
  <v-card class = "ma-1 pa-1" hover @mousedown.stop :elevation="5" >
  
    <v-container>
      
        <div>
          <v-img :src="share.s_photo" class="centerImage" height="100px" width="100px"/>
          <div class="text font-weight-light" v-for = "s_student in share.s_student" :key = "s_student.index">
              {{s_student.username}},{{s_student.country}}              
          </div>
        </div>

    </v-container>
  </v-card>
</template>

<script>
    export default {
      name: 'StudentsCard',
      props: {
        //artist: Object,
        share: Object
      },
      
    }
</script>

