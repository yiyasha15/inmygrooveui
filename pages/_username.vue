<template>
  <v-app>
    <div>
        <nuxt-child :artist="artist"/>
    </div>
    <v-container>
    <v-row>
        <v-col cols="12" sm="4" >
            <div class="font-weight-light display-1 xs12 pl-4">{{artist.artist_name}}</div>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <v-col class="px-0 d-flex align-end justify-end pr-4">
            <!-- <v-layout align-center justify-center >
                <v-flex> -->
                    <div>
                        <v-btn class="elevation-0 white text-decoration-none" :to= "`/${artist.username}/`">About</v-btn>
                        <v-btn class="elevation-0 white text-decoration-none" :to= "`/${artist.username}/work`"> Work </v-btn>
                        <v-btn class="elevation-0 white text-decoration-none" :to= "`/${artist.username}/each1teach1`">Each 1 Teach 1 </v-btn>
                    </div>
                    <!--Conditional Template Rendering-->
                    <!--https://forum.vuejs.org/t/check-if-variable-is-set-v-if/12738-->
                <!-- </v-flex>
            </v-layout> -->
        </v-col>
    </v-row>
    </v-container>
    <center>
        <v-img :src = "artist.artist_image" width="100%" class="centerImage" maxHeight="520px">
            <!-- <v-layout align-end fill-width white--text >
                <div class="title font-weight-medium text-center">{{ artist.artist_name }}</div>
            </v-layout> -->
        </v-img>
    </center>
    <br>
    <v-row align="center"  no-gutters>
        <v-col align="center" justify="center" :class="{'my-6': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}" cols="12" md="6" lg="6" xl="6">
                <h3  class="mb-5 font-weight-light font-italic">
                    <br>
                    {{ artist.bio }}
                </h3>              
                <div class="text font-weight-thin justify-end"> -{{artist.artist_name}}, {{ artist.country }} </div>
                
        </v-col>
        <v-col :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}">
            <v-container  grid-list-md :class="{'pa-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}">
                <!-- xs = 600px full screen (12) -->
                <!-- md = 600px or more. half of the screen (6) -->
                <v-layout class="d-flex flex-wrap">
                    <v-flex xs6 md6 v-for="gallery in gallery" :key = "gallery.index">
                        <v-dialog v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                            <div v-if = gallery.g_upload_photo v-bind="attrs" v-on="on">
                                <v-img :src="gallery.g_upload_photo" class="centerImage" width = "250px" height = "250px"/>
                            </div>
                            </template>
                            <v-card>
                                <v-img :src="gallery.g_upload_photo" class="centerImage"/>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-col>
    </v-row>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import GalleryCard from '@/components/GalleryCard.vue'

export default {
    data () {
      return {
        dialog: false,
      }
    },
    //layout: 'idlayout',
    //props: ["id"],
    components:{
        GalleryCard,
    },
    head() {
        return {
            title: this.artist.artist_name,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.name
                }
            ]
        }
    },
    async asyncData({error, params}) {
      try {
        let artist_response = await EventService.getArtist(params.username)
        let gallery_response = await EventService.getGalleries(params.username)
        return {
            artist: artist_response.data,  //event ...... NOT events here , dont miss this one..
            gallery: gallery_response.data,
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    
}
</script>

<style scoped>

</style>
