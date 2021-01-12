<template>
    <v-app>
        <v-container class="ma-24" >
        <div class="text-xs-center mb-6" align = "center">
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn>
            <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`"> Judging and Workshop </v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/events/`"> Events </v-btn>
        </div>
            <v-divider class="mx-4" ></v-divider>
            <v-row>
                <v-col cols="12" md="6" class="pl-sm-6">
                    <v-row>
                    <v-col cols="8">
                        <h5 class="font-weight-light mt-4">Share your judging and workshop experiences.</h5>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="justify-end mt-4 mr-8">
                            <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="primary"><v-icon>mdi-information-outline</v-icon></v-btn>
                        </template>
                        <span>In your dance journey so far, share the experience <br>
                        of the workshops you've given and events that you have judged.<br>
                            You can preview it while uploading the information. <br>
                            Time to upload contents, let's go.</span>
                        </v-tooltip>
                        </v-row>
                    </v-col>
                    </v-row>
                    <v-form v-on:submit.prevent="submit">
                        <v-row>
                            <v-col cols="12" md="9">
                                <v-text-field
                                    v-model = "judging.jw_event"
                                    label= "Event Name"
                                    :maxlength="40">
                                </v-text-field>
                                <div class = "form-group">
                                        <v-text-field prepend-icon="mdi-image" @click= "onPick" label="Upload image"></v-text-field>
                                        <input 
                                        type="file" 
                                        name = "judging.jw_photo" 
                                        style="display:none" 
                                        ref="fileInput" 
                                        accept="image/*"
                                        required
                                        @change="onFileChange">
                                    </div>
                                <v-textarea
                                    v-model = "judging.jw_content"
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
                                        v-model= "judging.jw_date"
                                        label="Date"
                                        prepend-icon="mdi-calendar"        
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model= "judging.jw_date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                    <v-text-field
                                    v-model = "judging.jw_link"
                                    label= "Link"
                                    :maxlength="30">
                                </v-text-field>
                                    <v-btn class="text-decoration-none" rounded color="indigo" dark outlined
                                 @click="submit">Submit</v-btn>
                                <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" md="4" class="pl-sm-6 mt-6 grey lighten-4 rounded-xl">
                        <v-col>
                        <v-row class="pb-6 justify-center text-center">
                            <h2> {{judging.jw_event}}</h2>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <v-img :src="imageData" height="300px" width="500px"></v-img>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <h5 class="pb-6 text-center">{{judging.jw_content}} {{judging.jw_date}}</h5>
                        </v-row>
                        <v-row v-if="judging.jw_link" class="pb-6 justify-center text-center">
                            <v-btn icon color="indigo" >
                                <v-icon>mdi-link</v-icon>
                            </v-btn>
                        </v-row>
                        </v-col>
                </v-col>
            </v-row>
            <v-row v-if="userHasJudging">
                <v-col>
                    <div class="d-flex flex-wrap" >
                        <div v-for = "judging in usersJudging" :key = "judging.index" class="pa-4 mr-4 rounded-lg grey lighten-4">
                            <JudgingCard :judging = "judging"></JudgingCard>
                            <v-dialog v-if="userHasJudging" v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon>
                                        <v-icon color="error" @click="func(judging.id)" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-card class="pa-4">
                                    Are you sure you want to delete this experience?
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  class="px-4 text-decoration-none" rounded color="error" dark
                                        @click="remove(rm)">Delete</v-btn>
                                    <v-btn color="indigo" class="px-4 text-decoration-none" outlined rounded dark  @click="dialog = false">
                                        Cancel
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
import JudgingCard from "@/components/JudgingCard.vue"
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
export default {
    middleware : 'auth',
    components: {
      JudgingCard
    },
    data(){
        return {
            date:"",
            dialog: false,
            rm:"",
            imageData: "",
            judging: {
                jw_artist: this.$auth.user.username,
                jw_content: "",
                jw_event: "",
                jw_date: "",
                jw_photo: "",
                jw_link: ""
            }
        }
    },
    computed: {
    ...mapGetters(['usersJudging', 'userHasJudging'])
    },
    mounted() {
    this.$store.dispatch("check_user_judging");
    },
    methods: {
        func(id){
            this.dialog=true;
            this.rm=id;
        },
        async remove(id){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$auth.user.access}
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/jw/"+id , config);
                this.$store.dispatch("remove_judging");
                this.$store.dispatch("check_user_judging");
                // this.gallery_img = Object.assign({}, this.$store.getters.usersGallery);
                this.$router.push("/create/judging");
            } 
            catch (e) {
                console.log(e);
            }
        },
        refresh(){
            this.date ="";
            this.imageData = "";
            this.judging.jw_artist = this.$auth.user.username;
            this.judging.jw_content= "";
            this.judging.jw_event= "";
            this.judging.jw_date= "";
            this.judging.jw_photo= "";
            this.judging.jw_link= ""
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
                console.log(files[0]);
                this.judging.jw_photo = files[0];
                console.log(this.judging);
            }
        },
        async submit() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$auth.user.access}
            };
            let formData = new FormData();
            for (let data in this.judging) {
                if(data == 'jw_photo' && this.judging[data] == null)
                {
                    console.log("add a photo")
                    break;
                }
                else{
                    console.log("data: ", data);
                    console.log(this.judging[data]);
                    formData.append(data, this.judging[data]);
                }
            }
            try {
                let response = await this.$axios.$post("/v1/artist/jw/", formData, config);
                console.log("Artist judging created.");
                this.$store.dispatch("check_user_judging");
                this.refresh();
                this.$router.push("/create/judging");
            } catch (e) {
                console.log(e);
            }
        }        
    }

}
</script>