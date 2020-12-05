<template>
    <v-app>
        <!-- <div>
            <nuxt-child :artist="artist"/>
        </div> -->
        <v-container>
        <!-- <v-row>
            <v-col cols="12" sm="4" >
                <div class="font-weight-light display-1 xs12 pl-4">{{artist.artist_name}}</div>
            </v-col>
            <v-col class="px-0 d-flex align-end justify-end pr-4">
                <div>
                    <v-btn outlined rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/${artist.username}`">About</v-btn>
                    <v-btn dark rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/${artist.username}/work`"> Work </v-btn>
                    <v-btn outlined rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/${artist.username}/each1teach1`">Each 1 Teach 1 </v-btn>
                </div>
            </v-col>
        </v-row> -->
         <v-row>
            <v-col cols="12" md="8" > 
                    <div class="mb-5 font-weight-bold" v-if="milestone.length > 0">
                        <h5 class=" ml-2 ">Milestones </h5>
                        <div class="d-flex flex-wrap" >
                            <div v-for = "milestone in milestone" :key = "milestone.index" >
                                <MilestoneCard :milestone = "milestone"></MilestoneCard>
                            </div>
                        </div>
                    </div>  
                    <div v-else>
                        <v-btn class="elevation-0 text-decoration-none" :to= "`/create/work/`"> Add Work </v-btn>
                    </div>
            </v-col>
        </v-row>
        </v-container>
    </v-app>
</template>

<script>
import MilestoneCard from "@/components/MilestoneCard.vue"
import EventService from '@/services/EventService.js'
export default {
    props: ['artist'],
    // layout:'username',
    components: {
      MilestoneCard
    },
    async asyncData({error, params}) {
    try {
      const response = await EventService.getMilestones(params.username)
      return {
        milestone: response.data
      }
    } catch (e) {
        error({statusCode:503, message: "unable to fetch method data at this point"})
    }
  },
}
</script>