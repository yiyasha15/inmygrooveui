<template>
  <v-app>
    <v-container class="ma-24">
        <!-- <h3 class="font-weight-light mt-6 mb-2">Each 1 Teach 1</h3> -->
        <v-container class="rounded-lg grey lighten-5 my-4">
            <v-btn icon class="elevation-0 white text-decoration-none" :to= "`/e1t1`">
            <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-row class="pa-4">
                <v-col cols="12" md="8" align="center" justify="center">
                    <v-img :src = "e1t1.s_photo" width="80%" class="centerImage" maxHeight="520px"></v-img>
                </v-col>
                <v-col cols="12" md="4" class="pl-6">
                    <v-row>
                        <v-col class="ma-0">
                        <p class="font-weight-light">{{e1t1.s_date}}</p>
                        </v-col>
                        <div v-if="loggedInUser">
                        <v-col class="ma-0" v-if="loggedInUser.username == e1t1.s_student" >
                        <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs"
                            v-on="on">
                            <v-icon color="indigo" @click="edit">mdi-circle-edit-outline</v-icon>
                        </v-btn>
                        </template>
                        <span>Edit</span>
                        </v-tooltip>
                        <v-dialog v-if="loggedInUser" v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon >
                            <v-icon color="error" @click="dialog = true" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete</span>
                        </v-tooltip>
                        </template>
                        <v-card class="pa-4">
                            Are you sure you want to delete this experience?
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  class="px-4 text-decoration-none" rounded color="error" dark
                                @click="deleted">Delete</v-btn>
                            <v-btn color="indigo" class="px-4text-decoration-none" rounded outlined  @click="dialog = false">
                                Cancel
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                        </v-col>
                        </div>
                    </v-row>
                    <v-row class="rounded-lg grey lighten-2 d-inline-flex mb-2">
                        <v-col class="ma-0">
                            <nuxt-link :to="'/'+ e1t1.s_teacher">
                            <h3 class="font-weight-light text-capitalize">{{e1t1.s_teacher}}</h3>
                            </nuxt-link>
                        </v-col>
                        <!-- <v-col class="mt-2">
                            <country-flag :country= 'e1t1.s_teacher_country' />
                        </v-col> -->
                    </v-row>
                    <v-row>
                        <v-col>
                        <nuxt-link :to="'/'+ e1t1.s_student">
                        <h5 class="font-weight-light text-capitalize">{{e1t1.s_student}}</h5>
                        </nuxt-link>
                        <h6 class="font-weight-light">{{e1t1.s_appreciation}}</h6>
                        <v-btn icon color="orange" @click="react_love">
                        <v-icon>mdi-rocket-launch-outline</v-icon><div v-if="love.length">{{love.length}}</div>
                        </v-btn>
                        <v-btn icon color="indigo" @click="react_dope">
                        <v-icon>mdi-hand-peace</v-icon><div v-if="dope.length">{{dope.length}}</div>
                        </v-btn>
                        <v-btn icon color="green" @click="react_info">
                        <v-icon>mdi-head-flash-outline</v-icon><div v-if="info.length">{{info.length}}</div>
                        
                        </v-btn>
                        <!-- <v-btn icon color="indigo" class="ml-2" >
                        <v-icon>mdi-comment-outline</v-icon> 
                        </v-btn> -->
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-4 pa-4">
                <v-col cols="12" md="6" v-if="e1t1.s_video_talk">
                    <v-card
                        class="mx-auto"
                        max-width="400">
                        <video width="400" height="240" controls>
                            <source :src="e1t1.s_video_talk" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <v-card-title>
                        Appreciation
                        </v-card-title>
                        <!-- <v-card-actions>
                            <v-spacer></v-spacer>
                        <v-btn color="orange" icon @click="snackbar = true">
                        <v-icon>mdi-creation</v-icon>
                        </v-btn>
                        <v-btn color="blue" icon @click="snackbar = true">
                        <v-icon>mdi-comment-outline</v-icon>
                        </v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" v-if="e1t1.s_video_dance">
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <video width="400" height="240" controls>
                            <source :src="e1t1.s_video_dance" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <v-card-title>
                        Freestyling with lessons learnt
                        </v-card-title>
                        <!-- <v-card-actions>
                            <v-spacer></v-spacer>
                        <v-btn color="orange" icon @click="snackbar = true">
                        <v-icon>mdi-creation</v-icon>
                        </v-btn>
                        <v-btn color="blue" icon @click="snackbar = true">
                        <v-icon>mdi-comment-outline</v-icon>
                        </v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="comments_list.length" class="mt-4 pa-4">
                <h5 class="font-weight-light">Comments {{comments_list.length}}
                </h5>
            </v-row>
            <v-row v-if="comments_list.length">
                <!-- <div v-for = "comments in comments" :key = "comments.index" > -->
                    <comments-card :comments = "comments_list"></comments-card>
                <!-- </div> -->
            </v-row>
            <v-row v-if="isAuthenticated" class="mt-8 ml-md-8 ml-2">
                <v-avatar size="36">
                <img
                    :src = "usersPortfolio.thumb" 
                    alt="img"
                >
                </v-avatar>
                <v-textarea class="mx-4"
                    v-model= "comments.c_comment"
                    outlined
                    max-width= "400"
                    label="Share your thoughts">
                </v-textarea>
                <v-btn class="text-decoration-none mr-2 ml-12 ml-sm-2" 
                    @click="post_comment"
                    rounded color="indigo" dark >Post
                </v-btn>
            </v-row>
            <v-snackbar v-model="valid_snackbar">
                Write something to post.
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="error"
                    icon
                    v-bind="attrs"
                    @click="valid_snackbar = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
            <v-snackbar v-model="login_snackbar">
                Please login first.
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="error"
                    icon
                    v-bind="attrs"
                    @click="login_snackbar = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
            <v-snackbar v-model="thankyou_snackbar">
                Thankyou for sharing!
                <template v-slot:action="{ attrs }">
                <v-btn
                    color="error"
                    icon
                    v-bind="attrs"
                    @click="thankyou_snackbar = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </v-container>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import vuex from 'vuex'
import CommentsCard from '~/components/CommentsCard.vue'
export default {
    head() {
        return {
            title: 'e1t1',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this e1t1 #'
                }
            ]
        }
    },
    components:{
        CountryFlag,
        CommentsCard
    },
    data(){
        return {
            dialog: false,
            valid_snackbar: false,
            login_snackbar: false,
            thankyou_snackbar: false,
            comments : {
                c_shareid : "",
                c_commenter: "",
                c_comment: ""
            },
            likes:{
                l_shareid: "",
                l_liker: "",
                l_type: ""
            }
            }
    },
    mounted() {
        this.$store.dispatch("check_artists");
        this.$store.dispatch("check_likes", this.e1t1.id)
        this.$store.dispatch("check_comments", this.e1t1.id)
	},
	computed: {
        ...mapGetters(['artists', 'isAuthenticated','loggedInUser', 'usersPortfolio', 'comments_list', 'love', 'dope', 'info']),
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
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            this.$store.dispatch("remove_share_obj")
            try {
                let response = await this.$axios.$delete("/v1/e1t1/sharing/"+this.e1t1.id, config)
                console.log("e1t1 deleted.");
                this.$router.push("/e1t1/");
            } catch (e) {
                console.log(e);
            }
        },
        async edit(){
            this.$store.dispatch("check_share_obj", this.e1t1);
            this.$router.push("/create/each1teach1");
        },
        async react_love(){
            if(this.isAuthenticated){
            this.likes.l_liker = this.$store.state.auth.user.username;
            this.likes.l_shareid = this.e1t1.id
            this.likes.l_type = 'LO'
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.likes) {
                formData.append(data, this.likes[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/e1t1/likes/", formData, config)
                this.$store.dispatch("check_likes", this.e1t1.id)
            } catch (e) {
                console.log(e);
            }}
            else{
                this.login_snackbar = true
            }
        },
        async react_dope(){
            if(this.isAuthenticated){
            this.likes.l_liker = this.$store.state.auth.user.username;
            this.likes.l_shareid = this.e1t1.id
            this.likes.l_type = 'DO'
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.likes) {
                formData.append(data, this.likes[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/e1t1/likes/", formData, config)
                this.$store.dispatch("check_likes", this.e1t1.id)
            } catch (e) {
                console.log(e);
            }}
            else{
                this.login_snackbar = true
            }
        },
        async react_info(){
            if(this.isAuthenticated){
            this.likes.l_liker = this.$store.state.auth.user.username;
            this.likes.l_shareid = this.e1t1.id
            this.likes.l_type = 'IF'
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.likes) {
                formData.append(data, this.likes[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/e1t1/likes/", formData, config)
                this.$store.dispatch("check_likes", this.e1t1.id)
            } catch (e) {
                console.log(e);
            }}
            else{
                this.login_snackbar = true
            }

        },
        async post_comment() {
            if(this.isAuthenticated){
            if(this.comments.c_comment != "" )
            {
            this.comments.c_commenter = this.$store.state.auth.user.username;
            this.comments.c_shareid = this.e1t1.id
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.comments) {
                formData.append(data, this.comments[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/e1t1/comments/", formData, config)
                this.$store.dispatch("check_comments", this.e1t1.id)
                this.comments.c_comment = ''
                this.thankyou_snackbar = true
            } catch (e) {
                console.log(e);
            }
            }
            else{
                this.valid_snackbar = true
            }}
            else{
                this.login_snackbar = true
            }
        }
    }
    
}
</script>
<style  scoped>

</style>
