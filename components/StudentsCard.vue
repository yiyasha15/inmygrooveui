<template>
  <v-card class = "ma-1 pa-1" ><!--hover @mousedown.stop :elevation="5" :to="'/artists/' + artist.id" >--><!-- dark -->
    <v-container>
      
        <div>
          <img :src="myteacher.s_photo" class="centerImage">
          <br>
          <v-btn color="orange" x-small>
            {{ myteacher.s_student }}
          </v-btn>
        </div>

    </v-container>
  </v-card>
</template>

<script>
    export default {
      name: 'StudentsCard',
      props: {
        myteacher: Object,
      },
      
    }
</script>

