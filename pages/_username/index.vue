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
                "{{ artist.quote }}"
                </h3>  
                <div align="end" justify="end" class="text font-weight-thin"> 
                    -{{artist.artist_name}} <country-flag :country= 'artist.country' />  
                </div>         
                <!-- <div align="end" justify="end" class="text font-weight-thin">
                    <country-flag class="mt-4" :country= 'artist.country' />   
                </div> -->
        </v-col>
        <v-col :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}">
            <gallery-card :gallery="gallery" ></gallery-card>
        </v-col>
    </v-row>
    <v-container>
    <v-row no-gutters>
        <v-col md="6" offset-md="3">
            <h4 v-if="artist.quote" align="center" justify="center" class="mb-5 font-weight-light">
                {{ artist.introduction }}
            </h4>
        </v-col>
    </v-row>
    <v-row align="center" justify="center">
        <a class="text-decoration-none mx-4" href="artist.ig" target="_blank">
            <v-icon>mdi-instagram</v-icon>
        </a>
        <a class="text-decoration-none mx-4" href="artist.fb" target="_blank">
            <v-icon>mdi-facebook</v-icon>
        </a>
        <a class="text-decoration-none mx-4" href="artist.yt" target="_blank">
            <v-icon>mdi-youtube</v-icon>
        </a>
        <a class="text-decoration-none mx-4" href="www.gmail.com" target="_blank">
            <v-icon>mdi-email</v-icon>
        </a>
    </v-row>
         <v-row>
            <v-col cols="12" > 
                <div class="mb-5 font-weight-bold" v-if="milestone.length > 0">
                    <h3 class=" ml-2 mb-8 mt-4 ">Highlights</h3>
                    <div class="d-flex flex-wrap" >
                        <div v-for = "milestone in milestone" :key = "milestone.index" >
                            <MilestoneCard :milestone = "milestone"></MilestoneCard>
                        </div>
                    </div>
                </div>  
                <div v-if="userHasPortfolio">
                    <div v-if="usersPortfolio.artist_name == artist.username">
                    <v-btn class="elevation-0 text-decoration-none" :to= "`/create/work/`"> Add Work </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import GalleryCard from '@/components/GalleryCard.vue'
import MilestoneCard from "@/components/MilestoneCard.vue"
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
export default {
    data () {
      return {
        dialog: false,
      }
    },
     computed: {
        ...mapGetters(['usersPortfolio', 'userHasPortfolio'])
    },
    // layout: 'username',
    props: ["artist"],
    components:{
        GalleryCard,
        CountryFlag,
        MilestoneCard
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
        const response = await EventService.getMilestones(params.username)
        return {
             gallery: gallery_response.data,
             milestone: response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    
}
</script>