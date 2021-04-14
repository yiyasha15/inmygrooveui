<template>
    <v-app>
        <v-container class="ma-24" >
        <div class="text-xs-center mb-6" align = "center">
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn> -->
            <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/journey/`"> Journey </v-btn>
                <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`"> Judging and Workshop </v-btn> -->
                <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/events/`"> Events </v-btn> -->
        </div>
            <v-divider class="mx-4" ></v-divider>
            <v-row>
                <v-col cols="12" md="6" class="pl-sm-6">
                    <v-row>
                    <v-col cols="8">
                        <h5 class="font-weight-light mt-4">Share your memories, work and highlights.</h5>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="justify-end mt-4 mr-8">
                            <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="primary"><v-icon>mdi-information-outline</v-icon></v-btn>
                        </template>
                        <span>We all have some highlights on our dance journey<br> 
                        which brings out a smile on our faces when we think back.<br>
                            It can be meeting your greatest inspiration, to sharing <br>
                            some memories with your dance buddies,which has eventually<br> 
                            helped you along the way. <br>
                            Share some of your profound memories.<br>
                            You can preview it while uploading the information. <br>
                            Time to upload contents, let's go.</span>
                        </v-tooltip>
                        </v-row>
                    </v-col>
                    </v-row>
                    <v-form v-on:submit.prevent="submit">
                        <v-row>
                            <v-col cols="12" md="9">
                                <!-- <v-text-field
                                    v-model = "highlights.m_artist"
                                    label= "Artist ID"
                                    :maxlength="20">
                                </v-text-field> -->
                                <v-text-field
                                    v-model = "highlights.hicontext"
                                    label= "Title"
                                    :maxlength="30">
                                </v-text-field>
                                <v-file-input
                                    show-size
                                    type="file"
                                    v-model = "highlights.hiphoto" 
                                    label="Upload image" 
                                    accept="image/*"
                                    prepend-icon="mdi-image"
                                    @change="toShowImage"
                                ></v-file-input>
                                <v-textarea
                                    v-model = "highlights.hicontent"
                                    label= "Share your experience">
                                </v-textarea>
                                <v-menu
                                    ref="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model= "highlights.hidate"
                                        label="Date"
                                        prepend-icon="mdi-calendar"        
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model= "highlights.hidate" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                    <v-text-field
                                        v-model = "highlights.hilink"
                                        label= "Link"
                                        :maxlength="50">
                                    </v-text-field>
                                    <v-btn v-if="editing_obj == null" class="text-decoration-none" rounded color="indigo" dark outlined
                                    @click="submit">Submit</v-btn>
                                    <v-btn v-else class="mt-2 mr-2 text-decoration-none" outlined rounded color="indigo" dark
                                    @click="update">Update</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" md="4" class="pl-sm-6 mt-6 grey lighten-4 rounded-xl">
                        <v-col>
                        <v-row class="pb-6 justify-center text-center">
                            <h2> {{highlights.hicontext}}</h2>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <v-img :src="imageData" height="300px" width="500px"></v-img>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <h5 class="pb-6 text-center">{{highlights.hicontent}} {{highlights.hidate}}</h5>
                        </v-row>
                        <v-row v-if="highlights.hilink" class="pb-6 justify-center text-center">
                            <v-btn icon color="indigo" >
                                <v-icon>mdi-link</v-icon>
                            </v-btn>
                        </v-row>
                        </v-col>
                </v-col>
            </v-row>
            <v-row v-if="userHasHighlights">
                <v-col>
                    <div class="d-flex flex-wrap" >
                        <div v-for = "highlights in usersHighlights" :key = "highlights.index" class="pa-2 ma-2 rounded-lg grey lighten-4">
                            <HighlightsCard :highlights = "highlights"></HighlightsCard><br>
                            <v-btn icon>
                                <v-icon color="indigo" @click="edit(highlights)">mdi-circle-edit-outline</v-icon>
                            </v-btn>
                            <v-dialog v-if="userHasHighlights" v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon>
                                        <v-icon color="error" @click="func(highlights.id)" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-card class="pa-4">
                                    Are you sure you want to delete this highlight?
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="px-4 text-decoration-none" rounded color="error" dark
                                        @click="remove(rm)">Delete</v-btn>
                                    <v-btn color="indigo" class="px-4 text-decoration-none" rounded outlined  @click="dialog = false">
                                        Cancel
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-snackbar v-model="valid_snackbar">
                Please fill the required details.
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
            <v-snackbar v-model="snackbar">
                <div>
                    Changes saved.
                </div>
                <template v-slot:action="{ attrs }">
                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                        Okay.
                    </v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </v-app>
</template>
<script>
import HighlightsCard from "@/components/HighlightsCard.vue"
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    components: {
      HighlightsCard
    },
    data(){
        return {
            date:"",
            dialog: false,
            rm:"",
            imageData: "",
            valid_snackbar: false,
            snackbar: false,
            highlights: {
                username: this.$store.state.auth.user.username,
                hicontent: "",
                hicontext: "",
                hidate: "",
                hiphoto: null,
                hilink: ""
                
            }
        }
    },
    computed: {
    ...mapGetters(['usersHighlights', 'userHasHighlights', 'editing_obj'])
    },
    mounted() {
    this.$store.dispatch("check_user_highlights");
    this.$store.dispatch("remove_editing_obj")
    },
    methods: {
        func(id){
            this.dialog=true;
            this.rm=id;
        },
        edit(highlights){
            this.highlights = Object.assign({}, highlights);
            this.imageData = this.highlights.hiphoto;
            this.$store.dispatch("check_editing_obj", highlights);
        },
        async remove(id){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/highlights/"+id , config);
                this.$store.dispatch("remove_highlights");
                this.$store.dispatch("check_user_highlights");
                this.dialog =false;
                this.snackbar = true;
                // this.gallery_img = Object.assign({}, this.$store.getters.usersGallery);
                this.$router.push("/create/highlights");
            } 
            catch (e) {
                console.log(e);
            }
            //remove particular gallery image by id
        },
        refresh(){
            this.date ="";
            this.imageData = "";
            this.highlights.username = this.$store.state.auth.user.username;
            this.highlights.hicontent= "";
            this.highlights.hicontext= "";
            this.highlights.hidate= "";
            this.highlights.hiphoto= null;
            this.highlights.hilink= "";
        },
        toShowImage(){
            if(this.highlights.hiphoto)
	        this.imageData = URL.createObjectURL(this.highlights.hiphoto);
        },
        async submit() {
            if(this.highlights.hicontent != "" && this.highlights.hicontext != "" && this.highlights.hiphoto)
            {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            let formData = new FormData();
            for (let data in this.highlights) {
                formData.append(data, this.highlights[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/artist/highlights/", formData, config);
                console.log("Artist highlights created.");
                this.$store.dispatch("check_user_highlights");
                this.refresh();
                this.snackbar = true;
                this.$router.push("/create/highlights");
            } catch (e) {
                console.log(e);
            }
        }
        else{
            this.valid_snackbar =true;
        }
        } ,
        async update() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            if(this.editing_obj.hicontent!=this.highlights.hicontent) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.highlights) {
                    if(data == 'id' || data == 'hicontent' )
                    {
                        console.log("content has changed");
                        formName.append(data, this.highlights[data]);
                    }}
                await this.$axios.$patch("/v1/artist/highlights/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.hicontext!=this.highlights.hicontext) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.highlights) {
                    if(data == 'id' || data == 'hicontext' )
                    {
                        console.log("context has changed");
                        formName.append(data, this.highlights[data]);
                    }}
                await this.$axios.$patch("/v1/artist/highlights/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.hidate!=this.highlights.hidate) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.highlights) {
                    if(data == 'id' || data == 'hidate' )
                    {
                        console.log("date has changed");
                        formName.append(data, this.highlights[data]);
                    }}
                await this.$axios.$patch("/v1/artist/highlights/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.hiphoto!=this.highlights.hiphoto) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.highlights) {
                    if(data == 'id' || data == 'hiphoto' )
                    {
                        console.log("photo has changed");
                        formName.append(data, this.highlights[data]);
                    }}
                await this.$axios.$patch("/v1/artist/highlights/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.hilink!=this.highlights.hilink) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.highlights) {
                    if(data == 'id' || data == 'hilink' )
                    {
                        console.log("link has changed");
                        formName.append(data, this.highlights[data]);
                    }}
                await this.$axios.$patch("/v1/artist/highlights/"+this.editing_obj.id+"/", formName, config);
            }
            this.$store.dispatch("check_user_highlights");
            this.refresh();
            this.snackbar = true;
            this.$store.dispatch("remove_editing_obj");
        },       
    }
}
</script>