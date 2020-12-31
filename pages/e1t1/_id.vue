<template>
  <v-app>
    <v-container>
        <h3>Each 1 Teach 1</h3>
        <v-container class="rounded-lg grey lighten-5" >
            <v-row>
                <v-col cols="12" md="8" align="center" justify="center">
                    <v-img :src = "e1t1.s_photo" width="50%" class="centerImage" maxHeight="520px"></v-img>
                </v-col>
                <v-col cols="12" md="4" class="pl-6">
                    <v-row>
                        <v-col class="ma-0">
                        <p>{{e1t1.s_date}}</p>
                        </v-col>
                        <div v-if="loggedInUser">
                        <v-col class="ma-0" v-if="loggedInUser.username == e1t1.s_student" >
                        <v-btn icon >
                            <v-icon color="indigo" @click="edit">mdi-circle-edit-outline</v-icon>
                        </v-btn>
                        <v-dialog v-if="loggedInUser" v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon >
                            <v-icon color="error" @click="dialog = true" v-bind="attrs" v-on="on">mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <v-card class="pa-4">
                            Are you sure you want to delete this experience?
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  class="text-decoration-none" rounded color="error" dark
                                @click="deleted">Delete</v-btn>
                            <v-btn color="indigo" class="text-decoration-none" rounded dark  @click="dialog = false">
                                Cancel
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                        </v-col>
                        </div>
                    </v-row>
                    <v-row class="rounded-lg grey lighten-2 d-inline-flex">
                        <v-col class="ma-0">
                            <nuxt-link :to="'/'+ e1t1.s_teacher">
                            <h3>{{e1t1.s_teacher}}</h3>
                            </nuxt-link>
                        </v-col>
                        <v-col class="ma-0">
                            <country-flag :country= 'e1t1.s_teacher_country' />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                        <nuxt-link :to="'/'+ e1t1.s_student">
                        <h5>{{e1t1.s_student}}:</h5>
                        </nuxt-link>
                        <p>{{e1t1.s_appreciation}}</p>
                        <v-btn icon color="pink" >
                        <v-icon>mdi-robot-love</v-icon>
                        </v-btn>
                        <v-btn icon color="orange" >
                        <v-icon>mdi-party-popper</v-icon>
                        </v-btn>
                        <div v-if="e1t1.likes_count!=0">
                        <p>{{e1t1.likes_count}}</p>
                        </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-if="e1t1.s_video_talk">
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <video width="400" height="240" controls>
                            <source :src="e1t1.s_video_talk" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <v-card-title class="pb-0">
                        Appreciation
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                        <v-btn color="orange" icon @click="snackbar = true">
                        <v-icon>mdi-creation</v-icon>
                        </v-btn>
                        <v-btn color="blue" icon @click="snackbar = true">
                        <v-icon>mdi-comment-outline</v-icon>
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col v-if="e1t1.s_video_dance">
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <video width="400" height="240" controls>
                            <source :src="e1t1.s_video_dance" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <v-card-title class="pb-0">
                        Appreciation
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                        <v-btn color="orange" icon @click="snackbar = true">
                        <v-icon>mdi-creation</v-icon>
                        </v-btn>
                        <v-btn color="blue" icon @click="snackbar = true">
                        <v-icon>mdi-comment-outline</v-icon>
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import vuex from 'vuex'
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
    data(){
        return {
            dialog: false,
            }
    },
    mounted() {
	this.$store.dispatch("check_artists");
    // this.$store.dispatch("check_sharing");
    this.$store.dispatch("shareid", this.e1t1);
	},
	computed: {
		...mapGetters(['artists', 'loggedInUser'])
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
        async deleted(){
            // const config = {
            //     headers: {"content-type": "multipart/form-data",
            //         "Authorization": "Bearer " + this.$auth.user.access
            //     }
            // };
            try {
                let response = await this.$axios.$delete("/v1/e1t1/"+this.e1t1.id)
                console.log("e1t1 deleted.");
                this.$router.push("/");
            } catch (e) {
                console.log(e);
            }
        },
        async edit(){
            this.$router.push("/create/each1teach1");
        }
    }
    
}
</script>
<style  scoped>

</style>
