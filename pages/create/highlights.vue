<template>
    <v-app>
        <v-container class="ma-24" >
        <div class="text-xs-center mb-6" align = "center">
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
            <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn>
                <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`"> Judging and Workshop </v-btn>
                <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/events/`"> Events </v-btn>
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
                                    v-model = "highlights.h_content"
                                    label= "Title"
                                    :maxlength="30">
                                </v-text-field>
                                <div class = "form-group">
                                        <v-text-field prepend-icon="mdi-image" @click= "onPick" label="Upload image"></v-text-field>
                                        <input 
                                        type="file" 
                                        name = "highlights.h_photo" 
                                        style="display:none" 
                                        ref="fileInput" 
                                        accept="image/*"
                                        required
                                        @change="onFileChange">
                                    </div>
                                <v-textarea
                                    v-model = "highlights.h_context"
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
                                        v-model= "highlights.h_date"
                                        label="Date"
                                        prepend-icon="mdi-calendar"        
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model= "highlights.h_date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                    <v-text-field
                                        v-model = "highlights.h_link"
                                        label= "Link"
                                        :maxlength="50">
                                    </v-text-field>
                                    <v-btn class="text-decoration-none" rounded color="indigo" dark outlined
                                 @click="submit">submit</v-btn>
                                <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" md="4" class="pl-sm-6 mt-6 grey lighten-4 rounded-xl">
                        <v-col>
                        <v-row class="pb-6 justify-center text-center">
                            <h2> {{highlights.h_content}}</h2>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <v-img :src="imageData" height="300px" width="500px"></v-img>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <h5 class="pb-6 text-center">{{highlights.h_context}} {{highlights.h_date}}</h5>
                        </v-row>
                        <v-row v-if="highlights.h_link" class="pb-6 justify-center text-center">
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
                        <div v-for = "highlights in usersHighlights" :key = "highlights.index" class="pa-4 mr-4 rounded-lg grey lighten-4">
                            <HighlightsCard :highlights = "highlights"></HighlightsCard>
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
                            <!-- <v-btn class="error" @click="remove(highlights.id)">Remove</v-btn> -->
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
import EventService from '@/services/EventService.js'
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
                h_artist: this.$store.state.auth.user.username,
                h_content: "",
                h_context: "",
                h_date: "",
                h_photo: "",
                h_link: ""
            }
        }
    },
    computed: {
    ...mapGetters(['usersHighlights', 'userHasHighlights'])
    },
    mounted() {
    this.$store.dispatch("check_user_highlights");
    },
    methods: {
        func(id){
            this.dialog=true;
            this.rm=id;
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
            this.highlights.h_artist = this.$store.state.auth.user.username;
            this.highlights.h_content= "";
            this.highlights.h_context= "";
            this.highlights.h_date= "";
            this.highlights.h_photo= "";
            this.highlights.h_link= "";
        },
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInput.click()
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.highlights.h_photo = files[0];
            }
        },
        async submit() {
            if(this.highlights.h_content != "" && this.highlights.h_context != "" && this.highlights.h_photo)
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
        }        
    }
}
</script>