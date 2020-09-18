<template>
  <v-card class = "ma-1 pa-1" ><!--hover @mousedown.stop :elevation="5" :to="'/artists/' + artist.id" >--><!-- dark -->
    <v-container>
      
        <div>
          <img :src="mystudent.s_photo" class="centerImage">
          <br>
          <v-btn color="orange" x-small>
            {{ mystudent.s_teacher }}
          </v-btn>
        </div>

    </v-container>
  </v-card>
</template>

<script>
    export default {
      name: 'TeachersCard',
      props: {
        mystudent: Object,
      },
      
    }
</script>

