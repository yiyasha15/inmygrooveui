<template>
    <v-container>
        <v-row>
            <v-col cols="12" > 
                <!-- <div v-if="highlights"> -->
                    <h4 class="font-weight-light mb-4 pl-4 mt-4 d-inline">Highlights</h4>
                    <!-- <h3 class=" mb-8 mt-4 font-weight-light d-inline ">Highlights</h3>  -->
                    <v-btn x-small v-if="isAuthenticated && loggedInUser.username==artist.username" icon outlined color="indigo" class="ml-2" to="/create/journey/">
                        <v-icon >mdi-plus</v-icon>
                    </v-btn>
                    <div class="d-flex flex-wrap pa-0" >
                        <div v-for = "journey in journey" :key = "journey.index" class="pa-0">
                            <!-- <jouney-card-2 :journey = "journey" v-if="journey.ishighlight"></jouney-card-2> -->
                            <journey-card :journey = "journey" v-if="journey.ishighlight"></journey-card>
                        </div>
                        <!-- <div v-for = "highlights in highlights" :key = "highlights.index" >
                            <highlights-card :highlights = "highlights"></highlights-card>
                        </div> -->
                    </div>
                <!-- </div> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" > 
                <div v-if="journey">
                    <h4 class="font-weight-light mb-4 pl-4 mt-4 d-inline">Journey</h4>
                    <!-- <h3 class=" ml-2 mb-8 mt-4 font-weight-light">Journey</h3> -->
                    <div class="d-flex flex-wrap" >
                        <div v-for = "journey in journey" :key = "journey.index" >
                            <journey-card :journey = "journey" v-if="!journey.ishighlight"></journey-card>
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
import { mapGetters} from 'vuex'
import EventService from '@/services/EventService.js'
// import HighlightsCard from "@/components/HighlightsCard.vue"
import JourneyCard from "@/components/JourneyCard.vue"
// import JudgingCard from "@/components/JudgingCard.vue"
// import EventsCard from "@/components/EventsCard.vue"
// import MomentsCard from "@/components/MomentsCard.vue"
export default {
    components:{
        // HighlightsCard,
        // JudgingCard,
        JourneyCard,
        // EventsCard,
        // MomentsCard
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    },
    props: ["artist"],
    async asyncData({error, params, store}) {
      try {
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + store.state.auth.user.access}
            };
        // let highlights_response = await EventService.getHighlights(params.username)
        let journey_response = await EventService.getJourney(params.username, config)
        // let judging_response = await EventService.getJudging(params.username)
        // let events_response = await EventService.getEvents(params.username)
        // let moments_response = await EventService.getMoments(params.username)
        return {
            //  highlights: highlights_response.data,
             journey: journey_response.data,
            //  judging: judging_response.data,
            //  events: events_response.data,
            //  moments: moments_response.data
        }
      } catch (err) {
          console.log(err);
        error({statusCode:503,  message: err.message})
        }
    },
}
</script>