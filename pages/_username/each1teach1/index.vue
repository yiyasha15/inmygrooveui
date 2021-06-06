<template>
    <v-app>
        <v-container>
        <!-- <v-btn icon class="elevation-0 white text-decoration-none" to= "`/${artist.username}`">
        <v-icon>mdi-arrow-left</v-icon>
        </v-btn> -->
        <nuxt-child :sharing="sharing"/>
        <h4 class="font-weight-light mt-4 pl-4 d-inline">My Teachers</h4>
        <v-btn x-small v-if="isAuthenticated && loggedInUser.username==artist.username" icon outlined color="indigo" class="ml-2" to="/create/each1teach1/">
        <v-icon>mdi-plus</v-icon>
        </v-btn>
        <!-- <hr> -->
        <div class="d-flex flex-wrap my-4 ">
            <div v-for = "share in sharing" :key = "share.index">
                <div v-if="share.username === artist.username">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </div>
            </div>
        </div>
        <hr>
        <h4 class="font-weight-light mt-8 pl-4 ">My Students</h4>
        <!-- <hr> -->
        <div class="d-flex flex-wrap my-4 ">
            <div v-for = "share in sharing" :key = "share.index">
                <StudentsCard v-if="share.teacher === artist.username" :share="share" ></StudentsCard>
            </div>
        </div>
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'
import { mapGetters} from 'vuex'

export default {
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    },
    head() {
        return {
            title: this.artist.artist_name,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.artist_name
                }
            ]
        }
    },
    async asyncData({error, params}) {
      try {
        let sharing_response = await EventService.getEach1Teach1_user(params.username)
        return {
            sharing: sharing_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
}
</script>