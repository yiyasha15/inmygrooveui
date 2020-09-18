<template>
  <v-card >
    <v-container class="pa-2">
      <div v-if = gallery.g_upload_photo>
          <v-img :src="gallery.g_upload_photo" class="centerImage" width = "250px" height = "250px"/>
      </div>
    </v-container>        
  </v-card>
</template>

<script>
    export default {
      name: 'GalleryCard',
      props: {
        gallery: Object,
      },
      
    }
  /*class="d-flex flex-wrap"
  class = "ma-1 pa-1"
  <v-card class="d-inline-block mx-auto" > */
</script>

