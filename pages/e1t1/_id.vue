<template>
  <v-app>
    <v-container>
        <v-container class="rounded-lg grey lighten-5 my-4">
            <v-btn icon class="elevation-0 white text-decoration-none" @click="goback()">
            <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-row class="pa-4">
                <v-col cols="12" md="8" align="center" justify="center">
                    <v-img :src = "e1t1.s_photo" width="80%" class="centerImage" maxHeight="520px"></v-img>
                </v-col>
                <v-col cols="12" md="4" class="pl-6">
                    <v-row>
                        <v-col class="ma-0">
                        <h5 class="caption">{{e1t1.s_date}}</h5>
                        </v-col>
                        <div v-if="loggedInUser">
                        <v-col class="ma-0" v-if="loggedInUser.username == e1t1.username" >
                        <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon v-bind="attrs"
                            v-on="on">
                            <v-icon small color="indigo" @click="edit">mdi-circle-edit-outline</v-icon>
                        </v-btn>
                        </template>
                        <span>Edit</span>
                        </v-tooltip>
                        <v-dialog v-if="loggedInUser" v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-tooltip top v-bind="attrs" v-on="on">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn small icon >
                                <v-icon small color="error" @click="dialog = true" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete</span>
                            </v-tooltip>
                        </template>
                        <v-card class="pa-4">
                            <p>Are you sure you want to delete this experience?</p>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small class="px-4 text-decoration-none" rounded color="error" dark
                                @click="deleted">Delete</v-btn>
                            <v-btn small color="indigo" class="px-4text-decoration-none" rounded outlined  @click="dialog = false">
                                Cancel
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                        </v-col>
                        </div>
                    </v-row>
                    <v-row class="rounded-lg lighten-2 d-inline-flex mb-2">
                        <v-col class="ma-0">
                            <nuxt-link :to="'/'+ e1t1.teacher">
                            <h2 class="font-weight-light text-decoration-none">{{e1t1.teacher}}</h2> 
                            </nuxt-link>
                        </v-col>
                        <v-col class="mt-2">
                            <country-flag :country= 'e1t1.s_teacher_country' />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                        <nuxt-link :to="'/'+ e1t1.username">
                        <h3 class="font-weight-light text-capitalize">{{e1t1.username}}</h3>
                        </nuxt-link>
                        <h4 class="font-weight-light">{{e1t1.s_appreciation}}</h4>
                        <div class="my-2">
                        <v-btn small icon @click="react_love" class="mx-1">
                        <v-icon small>mdi-rocket-launch-outline</v-icon><div v-if="love.length">{{love.length}}</div>
                        </v-btn>
                        <v-btn small icon @click="react_dope" class="mx-1">
                        <v-icon small>mdi-hand-peace</v-icon><div v-if="dope.length">{{dope.length}}</div>
                        </v-btn>
                        <v-btn small icon @click="react_info" class="mx-1">
                        <v-icon small>mdi-head-flash-outline</v-icon><div v-if="info.length">{{info.length}}</div>
                        </v-btn>
                        </div>
                        </v-col>
                    </v-row>
                        <v-dialog v-model="personalDialog" width="800px" v-if="isAuthenticated && userHasPortfolio && isYourRoom">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="my-2" small outlined 
                                v-if="loggedInUser.username == e1t1.username"
                                    v-bind="attrs"
                                    v-on="on">
                                <h5 class="caption">Talk to my teacher </h5><v-icon class="pl-2" x-small>mdi-lock</v-icon>
                                </v-btn>
                                <v-btn v-else class="my-4" small outlined
                                    v-bind="attrs"
                                    v-on="on">
                                <p class="caption">Talk to my student</p> <v-icon class="pl-2" x-small>mdi-lock</v-icon>
                                </v-btn>
                            </template>
                            <v-container class="rounded-lg grey lighten-5 my-4" >
                                <!-- <v-col cols="12" align="end" justify="end">
                                <v-btn icon color="error" @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                                </v-btn>
                                </v-col> -->
                            <!-- <v-divider></v-divider> -->
                                    <v-row class="ma-4">
                                        <h3 v-if="loggedInUser.username == e1t1.username"
                                         class="font-weight-light text-uppercase">{{e1t1.teacher}}</h3>
                                         <h3 v-else
                                         class="font-weight-light text-uppercase">{{e1t1.username}}</h3>
                                         <v-spacer></v-spacer>
                                         <v-btn icon color="error" @click="personalDialog = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <v-row 
                                    class="ma-2">
                                        <v-avatar size="36">
                                        <img
                                            :src = "usersPortfolio.thumb" 
                                            alt="img"
                                        >
                                        </v-avatar>
                                        <v-textarea
                                        class="mx-4"
                                            v-model= "personal.messagetext"
                                            outlined
                                            auto-grow
                                            rows="1"
                                            row-height="15"
                                            max-width= "200"
                                            label="Teacher student discussion">
                                        </v-textarea>
                                        <v-btn small class="text-decoration-none mr-2 ml-12 ml-sm-2" 
                                            @click="post_personal_text"
                                            rounded color="indigo" dark>Send
                                        </v-btn>
                                        <personal-messages-card :messages="personalMessages"></personal-messages-card>
                                        <!-- <v-divider></v-divider> -->
                                    </v-row>
                            </v-container>
                        </v-dialog>
                        <!-- <v-btn icon color="indigo" class="ml-2" >
                        <v-icon>mdi-comment-outline</v-icon> 
                        </v-btn> -->
                </v-col>
            </v-row>
            <!-- <v-row class="mt-4 pa-4">
                <v-col cols="12" md="6" class="mt-2" v-if="e1t1.s_video_talk">
                       <v-row justify="center" align="center">
                            <video width="240" height="240" @click="video1Dialog= true" >
                                <source :src="e1t1.s_video_talk" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </v-row>
                        <v-dialog
                            v-model="video1Dialog"
                            width="600px"
                            @click:outside="closeDialog1"
                        >
                            <v-container class="rounded-lg white">
                            <v-col cols="12" align="end" justify="end">
                            <v-btn icon color="error" @click="video1Dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            </v-col>
                            <v-col cols="12" align="center" justify="center" >
                            <video id="video1" max-width="300px" height="300px" controls autoplay>
                                <source :src="e1t1.s_video_talk" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            </v-col>
                        </v-container>
                        </v-dialog>
                </v-col>
                <v-col cols="12" md="6" class="mt-2" v-if="e1t1.s_video_dance">
                     <v-row justify="center" align="center">
                            <video width="240" height="240" @click="video2Dialog= true" >
                            <source :src="e1t1.s_video_dance" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        </v-row>
                        <v-dialog
                            v-model="video2Dialog"
                            width="600px"
                            @click:outside="closeDialog2"
                        >
                            <v-container class="rounded-lg white">
                            <v-col cols="12" align="end" justify="end">
                            <v-btn icon color="error" @click="video2Dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            </v-col>
                            <v-col cols="12" align="center" justify="center" >
                            <video id="video2"  max-width="300px" height="300px" controls autoplay>
                                <source :src="e1t1.s_video_dance" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            </v-col>
                        </v-container>
                        </v-dialog>
                </v-col>
            </v-row> -->
        </v-container>
        <v-container class="rounded-lg grey lighten-5 pa-4">
            <v-row class="ma-md-4 ma-2" v-if="comments_list.length">
                <h3 class="font-weight-light">
                    Comments {{comments_list.length}}
                </h3>
            </v-row>
            <v-row
            no-gutters
            style="flex-wrap: nowrap;"
            >
            <v-col
                align="end"
                cols="1"
                class="flex-grow-0 flex-shrink-0 mt-2"
            >
                <v-avatar size="36" v-if="isAuthenticated && userHasPortfolio" >
                <img
                    :src = "usersPortfolio.thumb" 
                    alt="img"
                >
                </v-avatar>
                <v-avatar size="36" color="indigo" v-else >
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
            </v-col>
            <v-col
                cols="5"
                style="min-width: 100px; max-width: 100%;"
                class="flex-grow-1 flex-shrink-0"
            >
                <v-textarea v-if="isAuthenticated && userHasPortfolio" class="mx-4"
                    v-model= "comments.c_comment"
                    outlined
                    auto-grow
                    rows="1"
                    row-height="15"
                    max-width= "200"
                    label="Share your thoughts">
                </v-textarea>
                <v-textarea v-else class="mx-4"
                    @click="logindialog=true"
                    outlined
                    rows="1"
                    row-height="15"
                    max-width= "200"
                    label="Share your thoughts">
                </v-textarea>
            </v-col>
            <v-col
                cols="3"
                style="min-width: 100px;"
                class="flex-grow-0 flex-shrink-1"
            >
                <v-btn v-if="isAuthenticated && userHasPortfolio"
                 small class="text-decoration-none mt-2" 
                    @click="post_comment"
                    rounded color="indigo" dark >Post
                </v-btn>
            </v-col>
            </v-row>
            
            <v-row class="px-4" v-if="comments_list.length">
                <!-- <div v-for = "comments in comments" :key = "comments.index" > -->
                    <comments-card :comments = "comments_list"></comments-card>
                <!-- </div> -->
            </v-row>
        </v-container>
    </v-container>
    <v-dialog
      v-model="logindialog"
      width="500"
    >
      <v-card class="pa-4">
        <v-card-title>
          Log in and make your portfolio to continue.
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="ml-4 px-4" text rounded
            @click="create_portfolio"
          >
            Okay!
          </v-btn>
          <v-btn
            color="error"
            class="ml-4 px-4" text rounded
            @click="logindialog = false"
          >
            Nope!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        Shared!
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
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import CommentsCard from '~/components/CommentsCard.vue'
import PersonalMessagesCard from '~/components/PersonalMessagesCard.vue'
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
        CommentsCard,
        PersonalMessagesCard,
    },
    data(){
        return {
            video1Dialog: false,
            video2Dialog: false,
            dialog: false,
            logindialog: false,
            personalDialog: false,
            valid_snackbar: false,
            login_snackbar: false,
            thankyou_snackbar: false,
            comments : {
                c_shareid : "",
                c_commenter: "",
                c_comment: "",
                c_time: ""
            },
            likes:{
                l_shareid: "",
                l_liker: "",
                l_type: ""
            },
            personal:{
                shareid: null,
                username: null,
                messagetext: ""
            },
            isShowing:false,
            isYourRoom: false,
            items: [],
            dynamic_height: 50,
            // colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5'],
            names: ['Oliver', 'Jake', 'Noah', 'James', 'Jake', 'Noah', 'James'],
      
            }
    },
    mounted() {
        this.$store.dispatch("check_artists");
        this.$store.dispatch("check_likes", this.e1t1.id)
        this.$store.dispatch("check_comments", this.e1t1.id)
        if(this.loggedInUser)
        if(this.$store.state.auth.user.username == this.e1t1.teacher || this.$store.state.auth.user.username ==this.e1t1.username){
            this.isYourRoom = true
            this.$store.dispatch("check_personal_room", this.e1t1.id);
            this.items = this.personalMessages;
            // this.dynamic_height = this.$refs.infoBox.clientHeight;
        }
	},
	computed: {
    //     items () {
    //     const namesLength = this.names.length
    //     const colorsLength = this.colors.length

    //     return Array.from({ length: 10 }, (k, v) => {
    //       const name = this.names[this.genRandomIndex(namesLength)]

    //       return {
    //         color: this.colors[this.genRandomIndex(colorsLength)],
    //         fullName: `${name}`,
    //       }
    //     })
    //   },
        ...mapGetters(['artists', 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', 'comments_list', 'love', 'dope', 'info',
        'personalMessages','userHasPersonalMessages']),
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
        formatTime() {
      const options = {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute:'2-digit'
      };
      let now = new Date().toLocaleString('en-US', options);
      return now;
    },
        closeDialog1() //pressing outside dialog pauses video
        {
            var vid = document.getElementById("video1"); 
            vid.pause();
        },
        closeDialog2() //pressing outside dialog pauses video
        {
            var vid = document.getElementById("video2"); 
            vid.pause();
        },
        create_portfolio()
        {
            this.$router.push("/create/about");
        },
        goback(){
            window.history.back();
        },
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
            console.log("hii",this.formatTime());
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
        },
        async post_personal_text(){
            this.personal.username = this.$store.state.auth.user.username
            this.personal.shareid = this.e1t1.id

            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.personal) {
                formData.append(data, this.personal[data]);
            }
            try {
                await this.$axios.$post("/v1/e1t1/qna/", formData, config)
                this.personal.messagetext = ''
                this.personal.shareid = null
                this.personal.username = null
                this.thankyou_snackbar = true
                this.$store.dispatch("check_personal_room", this.e1t1.id);
            } catch (e) {
                console.log(e);
            }

        }
    }
    
}
</script>
<style  scoped>

</style>
