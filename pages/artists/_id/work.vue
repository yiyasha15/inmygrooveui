<template>
    <v-app>
        <div>
            <nuxt-child :artist="artist"/>
        </div>
        <v-container>
        <v-row>
            <v-col cols="12" sm="4" >
                <div class="font-weight-light display-1 xs12 pl-4">{{artist.artist_name}}</div>
            </v-col>
            <!-- <v-spacer></v-spacer> -->
            <v-col class="px-0 d-flex align-end justify-end pr-4">
                <!-- <v-layout align-center justify-center >
                    <v-flex> -->
                        <div>
                          <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/`">About</v-btn>
                          <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/work`"> Work </v-btn>
                          <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/each1teach1`">Each 1 Teach 1 </v-btn>
                        </div>
                        <!--Conditional Template Rendering-->
                        <!--https://forum.vuejs.org/t/check-if-variable-is-set-v-if/12738-->
                    <!-- </v-flex>
                </v-layout> -->
            </v-col>
        </v-row>
        </v-container>
        <v-container>
         <v-row>
            <!--<v-col cols="6" md="4" align="left" justify="center"></v-col>-->
            <v-col cols="12" md="8" >                    
                    <div class="mb-5 font-weight-bold" v-if="artist.milestone.length > 0">
                        Milestones 
                    </div>  
                    <div v-else>
                        <v-btn class="elevation-0 text-decoration-none" :to= "`/create/work/`"> Add Work </v-btn>
                    </div>
                    <div class="d-flex flex-wrap" >
                        <div v-for = "milestone in artist.milestone" :key = "milestone.index" >
                            <MilestoneCard :milestone = "milestone"></MilestoneCard>
                        </div>
                    </div>
            </v-col>
        </v-row>
        </v-container>
    </v-app>
</template>
<script>
import MilestoneCard from "@/components/MilestoneCard.vue"

export default {
    props: ['artist'],
    components: {
      MilestoneCard
    }
}
</script>