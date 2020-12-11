<template>
    <v-app>
        <v-container>
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