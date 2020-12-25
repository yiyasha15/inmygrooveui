<template>
    <div>
        <center>
            <v-img :src = "usersPortfolio.artist_image" width="100%" class="centerImage" maxHeight="520px">
            </v-img>
        </center>
    <br>
    <h5 v-if="usersPortfolio.quote" align="center" justify="center" class="mb-5 font-weight-light font-italic">
        <br>
        "{{ usersPortfolio.quote }}"
    </h5> 
    <v-row align="center"  no-gutters>
        <v-col align="center" justify="center" :class="{'my-6': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}" cols="12" md="6" lg="6" xl="6">
                <h3  class="mb-5 font-weight-light font-italic">
                    <br>
                    {{ usersPortfolio.introduction }}
                </h3>  
                <div align="end" justify="end" class="text font-weight-thin"> 
                    -{{usersPortfolio.usersPortfolio_name}} <country-flag :country= 'usersPortfolio.country' />  
                </div>         
                <!-- <div align="end" justify="end" class="text font-weight-thin">
                    <country-flag class="mt-4" :country= 'usersPortfolio.country' />   
                </div> -->
        </v-col>
        <v-col :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-8': $vuetify.breakpoint.mdAndUp}">
            <gallery-card :gallery="usersGallery" ></gallery-card>
        </v-col>
    </v-row>
    <v-row align="center" justify="center">
        <a class="text-decoration-none mx-4" href="usersPortfolio.ig" target="_blank">
            <v-icon>mdi-instagram</v-icon>
        </a>
        <a class="text-decoration-none mx-4" href="usersPortfolio.fb" target="_blank">
            <v-icon>mdi-facebook</v-icon>
        </a>
        <a class="text-decoration-none mx-4" href="www.gmail.com" target="_blank">
            <v-icon>mdi-email</v-icon>
        </a>
    </v-row>
    <!-- <v-container>
         <v-row>
            <v-col cols="12" md="8" > 
                <div class="mb-5 font-weight-bold" v-if="milestone.length > 0">
                    <h3 class=" ml-2 mb-8 mt-4 ">Work</h3>
                    <div class="d-flex flex-wrap" >
                        <div v-for = "milestone in milestone" :key = "milestone.index" >
                            <MilestoneCard :milestone = "milestone"></MilestoneCard>
                        </div>
                    </div>
                </div>  
                <div v-if="userHasPortfolio">
                    <div v-if="usersPortfolio.artist_name == usersPortfolio.username">
                    <v-btn class="elevation-0 text-decoration-none" :to= "`/create/work/`"> Add Work </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container> -->
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
        ...mapGetters(['usersPortfolio', 'userHasPortfolio',
         'usersGallery', 'userHasGallery','usersWork', 'userHasWork',])
    },
    components:{
        GalleryCard,
        CountryFlag,
        MilestoneCard
    },
    
}
</script>