<template>
    <div>
        <center>
        <v-img :src = "artist.artist_image" width="100%" class="centerImage" maxHeight="520px">
        </v-img>
    </center>
    <br>
    <v-row align="center"  no-gutters>
        <v-col align="center" justify="center" :class="{'my-6': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}" cols="12" md="6" lg="6" xl="6">
                <h3  class="mb-5 font-weight-light font-italic">
                    <br>
                    {{ artist.bio }}
                </h3>           
                <div class="text font-weight-thin justify-end"> -{{artist.artist_name}}, <country-flag :country= 'artist.country' />   
                </div>
        </v-col>
        <v-col :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}">
            <gallery-card :gallery="gallery" ></gallery-card>
        </v-col>
    </v-row>
    </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import GalleryCard from '@/components/GalleryCard.vue'
import CountryFlag from 'vue-country-flag'
export default {
    data () {
      return {
        dialog: false,
      }
    },
    // layout: 'username',
    props: ["artist"],
    components:{
        GalleryCard,
        CountryFlag
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
        let gallery_response = await EventService.getGalleries(params.username)
        return {
             gallery: gallery_response.data,
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    
}
</script>