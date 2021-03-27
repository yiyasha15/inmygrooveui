<template>
    <v-container>
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
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" > 
                <div class="mb-5" v-if="journey.length > 0">
                    <h3 class=" ml-2 mb-8 mt-4 font-weight-light">Journey</h3>
                    <div class="d-flex flex-wrap" >
                        <div v-for = "journey in journey" :key = "journey.index" >
                            <journey-card :journey = "journey"></journey-card>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <!-- <v-row>
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
        </v-row> -->
        <!-- <v-row>
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
    </v-container>
</template>
<script>
import EventService from '@/services/EventService.js'
import HighlightsCard from "@/components/HighlightsCard.vue"
import JourneyCard from "@/components/JourneyCard.vue"
// import JudgingCard from "@/components/JudgingCard.vue"
// import EventsCard from "@/components/EventsCard.vue"
// import MomentsCard from "@/components/MomentsCard.vue"
export default {
    components:{
        HighlightsCard,
        // JudgingCard,
        JourneyCard,
        // EventsCard,
        // MomentsCard
    },
    props: ["artist"],
    async asyncData({error, params}) {
      try {
        let highlights_response = await EventService.getHighlights(params.username)
        let journey_response = await EventService.getJourney(params.username)
        // let judging_response = await EventService.getJudging(params.username)
        // let events_response = await EventService.getEvents(params.username)
        // let moments_response = await EventService.getMoments(params.username)
        return {
             highlights: highlights_response.data,
             journey: journey_response.data,
            //  judging: judging_response.data,
            //  events: events_response.data,
            //  moments: moments_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
}
</script>