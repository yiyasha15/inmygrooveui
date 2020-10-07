<template>
    <v-app>
        <div>
            <nuxt-child :sharing="sharing"/>
            <v-main>
              <v-container fill-height>
                  <div class="text-center font-weight-bold">{{artist.artist_name}}</div>
                <v-layout align-center justify-center>
                    <v-flex xs6>

                        <div class="text-xs-center" align="center">
                          <v-btn rounded outlined class="text-capitalize" :to= "`/${artist.username}/`">About</v-btn>
                          <v-btn rounded outlined class="text-capitalize" :to= "`/${artist.username}/work`"> Work </v-btn>
                          <v-btn rounded outlined class="text-capitalize" :to= "`/${artist.username}/each1teach1`">Each 1 Teach 1 </v-btn>
                        </div>
                        
                    </v-flex>
                </v-layout>
              </v-container>
            </v-main>
            
            <div>My Teachers</div>
            <hr>
            <div class="d-flex flex-wrap">
                <div v-for = "share in sharing" :key = "share.index">
                    <div v-for = "s_student in share.s_student" :key = "s_student.index">
                        <div v-if="s_student.username === artist.username">
                            <TeachersCard :share="share" :artist="artist" ></TeachersCard>
                        </div>
                    </div>                
                </div>
            </div>
            <hr>
            <div>My Students</div>
            <hr>
            <div class="d-flex flex-wrap">
                <div v-for = "share in sharing" :key = "share.index">
                    <div v-for = "s_teacher in share.s_teacher" :key = "s_teacher.index">
                        <div v-if="s_teacher.username === artist.username">
                            <StudentsCard :share="share" ></StudentsCard>
                        </div>
                    </div>                
                </div>
            </div>

            <v-btn text :to= "`/${artist.username}`"> back </v-btn>
    
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
        let sharing_response = await EventService.getEach1Teach1(params.username)
        return {
            sharing: sharing_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
}
</script>