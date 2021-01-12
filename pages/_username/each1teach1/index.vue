<template>
    <v-app>
        <v-container>
        <!-- <v-btn icon class="elevation-0 white text-decoration-none" to= "`/${artist.username}`">
        <v-icon>mdi-arrow-left</v-icon>
        </v-btn> -->
        <nuxt-child :sharing="sharing"/>
        <h5 class="font-weight-light mt-4 pl-4 ">My Teachers</h5>
        <!-- <hr> -->
        <div class="d-flex flex-wrap my-4 pl-4 ">
            <div v-for = "share in sharing" :key = "share.index">
                <div v-if="share.s_student === artist.username">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </div>
            </div>
        </div>
        <hr>
        <h5 class="font-weight-light mt-8 pl-4 ">My Students</h5>
        <!-- <hr> -->
        <div class="d-flex flex-wrap my-4 pl-4 ">
            <div v-for = "share in sharing" :key = "share.index">
                <div v-if="share.s_teacher === artist.username">
                    <StudentsCard :share="share" ></StudentsCard>
                </div>
            </div>
        </div>
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'


export default {
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard
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