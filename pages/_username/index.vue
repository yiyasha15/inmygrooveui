<template>
    <div>
        <center>
            <v-img :src = "artist.cover" width="100%" class="centerImage" maxHeight="600px">
            </v-img>
        </center>
    <br>
    <v-row v-if="bio" align="center"  no-gutters>
        <v-col align="center" justify="center" :class="{'my-6': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}" cols="12" md="6" lg="6" xl="6">
                <h3  class="mb-5 font-weight-light font-italic">
                    <br> 
                "{{ bio.b_quote }}"
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
            <h4 v-if="bio.b_introduction" align="center" justify="center" class="mb-5 font-weight-light">
                {{ bio.b_introduction }}
                <!-- ,{{bio.b_style}},{{bio.b_crew}} -->
            </h4>
        </v-col>
    </v-row>
    <v-row class="mt-4" align="center" justify="center">
        <v-btn v-if="bio.b_ig" icon class="text-decoration-none mx-4" color="indigo"  @click="openig" >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn v-if="bio.b_fb" icon class="text-decoration-none mx-4" color="indigo"  @click="openfb" >
            <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn v-if="bio.b_yt" icon class="text-decoration-none mx-4" color="indigo"  @click="openyt" >
            <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn v-if="bio.b_personal" icon class="text-decoration-none mx-4" color="indigo"  @click="openpersonal" >
            <v-icon>mdi-email</v-icon>
        </v-btn>
    </v-row>
        <v-row>
        <v-col cols="12" > 
            <div class="mb-5" v-if="highlights.length > 0">
                <h3 class=" ml-2 mb-8 mt-4 font-weight-light">Highlights</h3>
                <div class="d-flex flex-wrap" >
                    <div v-for = "highlights in highlights" :key = "highlights.index" >
                        <highlights-card :highlights = "highlights"></highlights-card>
                    </div>
                </div>
            </div>  
            <!-- <div v-if="userHasPortfolio">
                <div v-if="usersPortfolio.artist_name == artist.username">
                <v-btn class="elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Add Highlights</v-btn>
                </div>
            </div> -->
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" > 
            <div class="mb-5" v-if="judging.length > 0">
                <h3 class=" ml-2 mb-8 mt-4 font-weight-light">Workshops and Judging</h3>
                <div class="d-flex flex-wrap" >
                    <div v-for = "judging in judging" :key = "judging.index" >
                        <judging-card :judging = "judging"></judging-card>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
    <!-- <v-row>
        <v-col cols="12" > 
            <div class="mb-5" v-if="moments.length > 0">
                <h3 class=" ml-2 mb-8 mt-4 font-weight-light">Moments</h3>
                <div class="d-flex flex-wrap" >
                    <div v-for = "moments in moments" :key = "moments.index" >
                        <moments-card :moments = "moments"></moments-card>
                    </div>
                </div>
            </div> 
        </v-col>
    </v-row> -->
    </v-container>
    </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import GalleryCard from '@/components/GalleryCard.vue'
import HighlightsCard from "@/components/HighlightsCard.vue"
import JudgingCard from "@/components/JudgingCard.vue"
// import MomentsCard from "@/components/MomentsCard.vue"
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
export default {
    scrollToTop: true,
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
        HighlightsCard,
        JudgingCard,
        JudgingCard,
        // MomentsCard
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
        let bio_response = await EventService.getBio(params.username)
        let highlights_response = await EventService.getHighlights(params.username)
        let judging_response = await EventService.getJudging(params.username)
        // let moments_response = await EventService.getMoments(params.username)
        return {
             gallery: gallery_response.data,
             bio: bio_response.data,
             highlights: highlights_response.data,
             judging: judging_response.data,
            //  moments: moments_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    methods:{
        openig(){
            var url = this.bio.b_ig;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openfb(){
            var url = this.bio.b_fb;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openpersonal(){
            var url = this.bio.b_personal;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openyt(){
            var url = this.bio.b_yt;
            var win = window.open(url, '_blank');
            win.focus();
        },
    }
    
}
</script>