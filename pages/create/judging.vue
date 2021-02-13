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
                    <div class="d-inline-flex"  >
                        <div v-for = "judging in usersJudging" :key = "judging.index" class="pa-4 mr-4 rounded-lg grey lighten-4">
                            <JudgingCard :judging = "judging"></JudgingCard>
                            <v-btn icon>
                                <v-icon color="indigo" @click="edit(judging)">mdi-circle-edit-outline</v-icon>
                            </v-btn>
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
import JudgingCard from "@/components/JudgingCard.vue"
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    components: {
      JudgingCard
    },
    data(){
        return {
            date:"",
            dialog: false,
            rm:"",
            imageData: "",
            valid_snackbar: false,
            snackbar: false,
            judging: {
                jw_artist: this.$store.state.auth.user.username,
                jw_content: "",
                jw_event: "",
                jw_date: "",
                jw_photo: "",
                jw_link: ""
            }
        }
    },
    computed: {
    ...mapGetters(['usersJudging', 'userHasJudging' , 'editing_obj'])
    },
    mounted() {
    this.$store.dispatch("check_user_judging");
    this.$store.dispatch("remove_editing_obj")
    },
    methods: {
        func(id){
            this.dialog=true;
            this.rm=id;
        },
        edit(judging){
            this.judging = Object.assign({}, judging);
            this.imageData = this.judging.jw_photo;
            this.$store.dispatch("check_editing_obj", judging);
        },
        async remove(id){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/jw/"+id , config);
                this.$store.dispatch("remove_judging");
                this.$store.dispatch("check_user_judging");
                this.dialog =false;
                this.snackbar = true;
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
            this.judging.jw_artist = this.$store.state.auth.user.username;
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
                this.judging.jw_photo = files[0];
            }
        },
        async submit() {
            if(this.judging.jw_content != "" && this.judging.jw_event != "" && this.judging.jw_photo)
            {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            let formData = new FormData();
            for (let data in this.judging) {
                formData.append(data, this.judging[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/artist/jw/", formData, config);
                console.log("Artist judging created.");
                this.$store.dispatch("check_user_judging");
                this.refresh();
                this.snackbar = true;
                this.$router.push("/create/judging");
            } catch (e) {
                console.log(e);
            }
        } 
        else{
            this.valid_snackbar = true;
        }
        },
        async update() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            if(this.editing_obj.jw_content!=this.judging.jw_content) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.judging) {
                    if(data == 'id' || data == 'jw_content' )
                    {
                        console.log("content has changed");
                        formName.append(data, this.judging[data]);
                    }}
                await this.$axios.$patch("/v1/artist/jw/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.jw_event!=this.judging.jw_event) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.judging) {
                    if(data == 'id' || data == 'jw_event' )
                    {
                        console.log("event has changed");
                        formName.append(data, this.judging[data]);
                    }}
                await this.$axios.$patch("/v1/artist/jw/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.jw_date!=this.judging.jw_date) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.judging) {
                    if(data == 'id' || data == 'jw_date' )
                    {
                        console.log("date has changed");
                        formName.append(data, this.judging[data]);
                    }}
                await this.$axios.$patch("/v1/artist/jw/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.jw_photo!=this.judging.jw_photo) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.judging) {
                    if(data == 'id' || data == 'jw_photo' )
                    {
                        console.log("photo has changed");
                        formName.append(data, this.judging[data]);
                    }}
                await this.$axios.$patch("/v1/artist/jw/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.jw_link!=this.judging.jw_link) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.judging) {
                    if(data == 'id' || data == 'jw_link' )
                    {
                        console.log("link has changed");
                        formName.append(data, this.judging[data]);
                    }}
                await this.$axios.$patch("/v1/artist/jw/"+this.editing_obj.id+"/", formName, config);
            }
            this.$store.dispatch("check_user_judging");
            this.refresh();
            this.snackbar = true;
            this.$store.dispatch("remove_editing_obj");
        },        
    }

}
</script>