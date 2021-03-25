<template>
  <v-app>
    <v-container class="ma-24">
        <!-- <h3 class="font-weight-light mt-6 mb-2">Each 1 Teach 1</h3> -->
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
                        <p class="font-weight-light">{{e1t1.s_date}}</p>
                        </v-col>
                        <div v-if="loggedInUser">
                        <v-col class="ma-0" v-if="loggedInUser.username == e1t1.username" >
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
                            <v-tooltip top v-bind="attrs" v-on="on">
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
                            <nuxt-link :to="'/'+ e1t1.teacher">
                            <h3 class="font-weight-light text-capitalize">{{e1t1.teacher}}</h3>
                            </nuxt-link>
                        </v-col>
                        <!-- <v-col class="mt-2">
                            <country-flag :country= 'e1t1.teacher_country' />
                        </v-col> -->
                    </v-row>
                    <v-row>
                        <v-col>
                        <nuxt-link :to="'/'+ e1t1.username">
                        <h5 class="font-weight-light text-capitalize">{{e1t1.username}}</h5>
                        </nuxt-link>
                        <h6 class="font-weight-light">{{e1t1.s_appreciation}}</h6>
                        <v-btn icon @click="react_love">
                        <v-icon>mdi-rocket-launch-outline</v-icon><div v-if="love.length">{{love.length}}</div>
                        </v-btn>
                        <v-btn icon @click="react_dope">
                        <v-icon>mdi-hand-peace</v-icon><div v-if="dope.length">{{dope.length}}</div>
                        </v-btn>
                        <v-btn icon @click="react_info">
                        <v-icon>mdi-head-flash-outline</v-icon><div v-if="info.length">{{info.length}}</div>
                        </v-btn>
                        </v-col>
                    </v-row>
                        <v-dialog v-model="personalDialog" width="800px" v-if="isAuthenticated && userHasPortfolio && isYourRoom">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="my-4" small outlined
                                v-if="loggedInUser.username == e1t1.username"
                                    v-bind="attrs"
                                    v-on="on">
                                Talk to my teacher
                                </v-btn>
                                <v-btn v-else class="my-4" small outlined
                                    v-bind="attrs"
                                    v-on="on">
                                Talk to my student
                                </v-btn>
                            </template>
                            <v-container class="rounded-lg grey lighten-5 my-4" >
                                <!-- <v-col cols="12" align="end" justify="end">
                                <v-btn icon color="error" @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                                </v-btn>
                                </v-col> -->
                            <!-- <v-divider></v-divider> -->
                                    <v-row class="mx-4 mt-4 pa-4">
                                        <h5 v-if="loggedInUser.username == e1t1.username"
                                         class="font-weight-light text-uppercase">{{e1t1.teacher}}</h5>
                                         <h5 v-else
                                         class="font-weight-light text-uppercase">{{e1t1.username}}</h5>
                                         <v-spacer></v-spacer>
                                         <v-btn icon color="error" @click="personalDialog = false">
                                <v-icon>mdi-close</v-icon>
                                </v-btn>
                                    </v-row>
                                    <v-row 
                                    class="ma-4 pa-4">
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
            <v-row class="mt-4 pa-4">
                <v-col cols="12" md="6" v-if="e1t1.s_video_talk">
                    <v-card
                        class="mx-auto"
                        max-width="400">
                        <video max-width="400" height="240" controls>
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
        </v-container>
        <v-container class="rounded-lg grey lighten-5 pa-4">
            <!-- <v-virtual-scroll
            v-if="isAuthenticated && userHasPortfolio && isYourRoom && !isShowing "
            :items="personalMessages"
            :item-height="this.dynamic_height"
            height="300">
            <template v-slot:default="{ item }">
                <v-list-item>
                    <div v-for="artist in artists" :key ="artist.index">
                        <nuxt-link :to="'/'+ item.username">
                            <v-list-item-avatar v-if=" item.username == artist.username">
                                    <img :src = "artist.thumb" alt="img">
                            </v-list-item-avatar>
                        </nuxt-link>
                    </div>
                <v-list-item-content>
                    <nuxt-link :to="'/'+ item.username">
                        <div class="subtitle grey--text">{{item.username}}</div>
                    </nuxt-link>
                    <p>{{ item.messagetext }}</p>
                </v-list-item-content>

                <v-list-item-action>
                </v-list-item-action>
                </v-list-item>
            </template>
            </v-virtual-scroll> -->
            <v-row v-if="comments_list.length" class="mx-4 pa-4">
                <h5 class="font-weight-light">Comments {{comments_list.length}}
                </h5>
            </v-row>
            <v-row class="mx-4 pa-4">
                <v-avatar v-if="isAuthenticated && userHasPortfolio" size="36">
                <img
                    :src = "usersPortfolio.thumb" 
                    alt="img"
                >
                </v-avatar>
                <v-avatar color="indigo" v-else size="36">
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
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
                    @click="dialog=true"
                    outlined
                    rows="1"
                    row-height="15"
                    max-width= "200"
                    label="Share your thoughts">
                </v-textarea>
                <v-btn v-if="isAuthenticated && userHasPortfolio"
                 small class="text-decoration-none mr-2 ml-12 ml-sm-2" 
                    @click="post_comment"
                    rounded color="indigo" dark >Post
                </v-btn>
            </v-row>
            <!-- <v-row v-else class="mt-8 ml-md-8 ml-2">
                <v-btn
                    color="primary"
                    class="ml-4 px-4" outlined rounded
                    @click="dialog=true"
                        >
                    Add Comment
                </v-btn>
            </v-row> -->
            <v-row class="px-4" v-if="comments_list.length">
                <!-- <div v-for = "comments in comments" :key = "comments.index" > -->
                    <comments-card :comments = "comments_list"></comments-card>
                <!-- </div> -->
            </v-row>
        </v-container>
    </v-container>
    <v-dialog
      v-model="dialog"
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
            Let's go!
          </v-btn>
          <v-btn
            color="error"
            class="ml-4 px-4" text rounded
            @click="dialog = false"
          >
            Nope!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <!-- <DynamicScroller
        :items="items"
        :min-item-size="54"
        class="scroller"
    >
        <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
            :item="item"
            :active="active"
            :key="item.shareid"
            :size-dependencies="[
            item.messagetext,
            ]"
            :data-index="index"
        >
            <div class="text">{{ item.messagetext }}</div>
        </DynamicScrollerItem>
        </template>
    </DynamicScroller> -->
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
import VueVirtualScroller from 'vue-virtual-scroller'
import { DynamicScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
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
        DynamicScroller,
        VueVirtualScroller
    },
    data(){
        return {
            dialog: false,
            personalDialog: false,
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
        create_portfolio(){
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
