<template>
    <v-app>
        <v-container>
         <v-row>
            <v-col cols="12" md="8" > 
                <div class="mb-5 font-weight-bold" v-if="highlights.length > 0">
                    <h5 class=" ml-2 ">Highlights </h5>
                    <div class="d-flex flex-wrap" >
                        <div v-for = "highlights in highlights" :key = "highlights.index" >
                            <highlights-card :highlights = "highlights"></highlights-card>
                        </div>
                    </div>
                </div>  
                <div v-else>
                    <v-btn class="elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Add Highlights</v-btn>
                </div>
            </v-col>
        </v-row>
        </v-container>
    </v-app>
</template>

<script>
import HighlightsCard from "@/components/HighlightsCard.vue"
import EventService from '@/services/EventService.js'
export default {
    props: ['artist'],
    components: {
      HighlightsCard
    },
    async asyncData({error, params}) {
    try {
      const response = await EventService.getHighlights(params.username)
      return {
        highlights: response.data
      }
    } catch (e) {
        error({statusCode:503, message: "unable to fetch method data at this point"})
    }
  },
}
</script>