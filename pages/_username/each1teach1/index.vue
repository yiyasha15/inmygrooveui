<template>
    <v-app>
        <div>
            <nuxt-child :sharing="sharing"/>
            <v-container>
            <div>My Teachers</div>
            <hr>
            <div class="d-flex flex-wrap">
                <div v-for = "share in sharing" :key = "share.index">
                    <div v-if="share.s_student === artist.username">
                        <TeachersCard :e1t1="share" ></TeachersCard>
                    </div>
                </div>
            </div>
            <hr>
            <div>My Students</div>
            <hr>
            <div class="d-flex flex-wrap">
                <div v-for = "share in sharing" :key = "share.index">
                    <!-- <div v-for = "s_teacher in share.s_teacher" :key = "s_teacher.index"> -->
                        <div v-if="share.s_teacher === artist.username">
                            <StudentsCard :share="share" ></StudentsCard>
                        </div>
                    <!-- </div>                 -->
                </div>
            </div>
            <v-btn text :to= "`/${artist.username}`"> back </v-btn>
            </v-container>
        </div>
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
        console.log(sharing_response.data);
        return {
            sharing: sharing_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
}
</script>