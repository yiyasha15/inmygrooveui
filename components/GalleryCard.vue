<template>
  <v-container grid-list-md :class="{'pa-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}">
    <div>
      <v-layout class="flex-wrap">
          <v-flex xs6 md6 v-for="gallery in gallery" :key = "gallery.index">
                  <div v-if = gallery.g_upload_photo>
                      <v-img :src="gallery.g_upload_photo" width = "270px" height = "270px"/>
                  </div>
          </v-flex>
      </v-layout>
    </div>
  </v-container> 
</template>

<script>
    export default {
      name: 'GalleryCard',
      props: {
        gallery: Object,
      },
    }
</script>

