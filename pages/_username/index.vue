<template>
    <div>
        <center>
            <v-parallax
                height="600"
                :src = "artist.cover"
            ></v-parallax>
        </center>
    <br>
    <v-row align="center">
        <v-col v-if="bio.quote" align="center" justify="center" :class="{'my-6': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}" 
        cols="12" md="6" lg="6" xl="6">
            <h3 class="mb-5 font-weight-light font-italic">
                <br> 
            "{{ bio.quote }}"
            </h3>       
            <div align="end" justify="end" class="text font-weight-thin">
                <country-flag class="mt-4" :country= 'artist.country' />   
            </div>
        </v-col>
        <v-col :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}">
            <v-container grid-list-md :class="{'pa-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}">
                <v-layout class="flex-wrap">
                    <v-flex v-if="bio.gallery1" xs6 md6>
                        <v-img :src="bio.gallery1" width = "270px" height = "270px"/>
                    </v-flex>
                    <v-flex v-if="bio.gallery2" xs6 md6>
                        <v-img :src="bio.gallery2" width = "270px" height = "270px"/>
                    </v-flex>
                    <v-flex v-if="bio.gallery3" xs6 md6>
                        <v-img :src="bio.gallery3" width = "270px" height = "270px"/>
                    </v-flex>
                    <v-flex v-if="bio.gallery4" xs6 md6>
                        <v-img :src="bio.gallery4" width = "270px" height = "270px"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-col>
    </v-row>
    <v-container>
    <v-row v-if="bio.introduction">
        <v-col md="6" offset-md="3">
            <h4 align="center" justify="center" class="mb-5 font-weight-light">
                {{ bio.introduction }}
            </h4>
        </v-col>
    </v-row>
    <v-row class="mt-4" align="center" justify="center">
        <v-btn v-if="bio.ig" icon class="text-decoration-none mx-4" color="indigo"  @click="openig" >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn v-if="bio.fb" icon class="text-decoration-none mx-4" color="indigo"  @click="openfb" >
            <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn v-if="bio.yt" icon class="text-decoration-none mx-4" color="indigo"  @click="openyt" >
            <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn v-if="bio.site" icon class="text-decoration-none mx-4" color="indigo"  @click="openpersonal" >
            <v-icon>mdi-email</v-icon>
        </v-btn>
    </v-row>
    <!-- <v-row>
        <v-col cols="12" > 
            <div class="mb-5" v-if="highlights.length > 0">
                <h3 class=" ml-2 mb-8 mt-4 font-weight-light">Highlights</h3>
                <div class="d-flex flex-wrap" >
                    <div v-for = "highlights in highlights" :key = "highlights.index" >
                        <highlights-card :highlights = "highlights"></highlights-card>
                    </div>
                </div>
            </div>
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
    <v-row>
        <v-col cols="12" > 
            <div class="mb-5" v-if="events.length > 0">
                <h3 class=" ml-2 mb-8 mt-4 font-weight-light">Events</h3>
                <div class="d-flex flex-wrap" >
                    <div v-for = "event in events" :key = "event.index" >
                        <events-card :events = "event"></events-card>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row> -->
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
    props: ["artist", "bio"],
    components:{
        GalleryCard,
        CountryFlag,
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
        // let gallery_response = await EventService.getGalleries(params.username)
        // let bio_response = await EventService.getBio(params.id)
        // let moments_response = await EventService.getMoments(params.username)
        return {
            //  bio: bio_response.data,
            //  moments: moments_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    methods:{
        openig(){
            var url = this.bio.ig;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openfb(){
            var url = this.bio.fb;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openpersonal(){
            var url = this.bio.personal;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openyt(){
            var url = this.bio.yt;
            var win = window.open(url, '_blank');
            win.focus();
        },
    }
    
}
</script>