<template>
  <v-app>
    <v-container>
        <h3>Each 1 Teach 1</h3>
        <v-container class="rounded-lg grey lighten-5" >
            <v-row>
                <v-col cols="12" md="8" align="center" justify="center">
                    <v-img :src = "e1t1.s_photo" width="50%" class="centerImage" maxHeight="520px"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <v-row>
                        <v-col class="ma-0">
                            <p>{{e1t1.s_date}}</p>
                            <nuxt-link :to="'/'+ e1t1.s_teacher">
                            <h3>{{e1t1.s_teacher}}</h3>
                            </nuxt-link>
                        </v-col>
                        <v-col class="mt-8 pt-4">
                            <country-flag :country= 'e1t1.s_teacher_country' />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                        <nuxt-link :to="'/'+ e1t1.s_student">
                        <h5>{{e1t1.s_student}}:</h5>
                        </nuxt-link>
                        <p>{{e1t1.s_appreciation}}</p>
                        <v-btn icon @click="like">
                        <v-icon>mdi-heart</v-icon>
                        </v-btn>
                        <div class="placement">
                        <div class="heart"></div>
                        </div>
                        <div v-if="e1t1.likes_count!=0">
                        <p>{{e1t1.likes_count}}</p>
                        </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                {{e1t1.s_video_talk}}
            </v-row>
            <v-row>
                {{e1t1.s_video_dance}}
            </v-row>
        </v-container>
    </v-container>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
export default {
    head() {
        return {
            title: 'e1t1',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this e1t1 #' + this.e1t1.name
                }
            ]
        }
    },
    components:{
        CountryFlag
    },
    async asyncData({error, params}) {
      try {
         let each1teach1 = await EventService.getEach1Teach1(params.id)
         return {
             e1t1 : each1teach1.data
             }
        } catch (err) {
            console.log(err);
            error({statusCode:503,  message: err.message})
        }
    },
    methods:{
        like(){
            // var element = document.getElementsByClassName("heart");
            // element.classList.toggle("is-active");
            //like button
        }
    }
    // props: {
    // e1t1: Object
    // },
    
}
</script>
<style  scoped>

</style>
