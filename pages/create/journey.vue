<template>
    <v-app>
        <v-container class="ma-24" >
        <div class="text-xs-center mb-6" align = "center">
            <v-btn small outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn small outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn> -->
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn> -->
            <v-btn small dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/journey/`"> Journey </v-btn>
                <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`"> Judging and Workshop </v-btn> -->
                <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/events/`"> Events </v-btn> -->
        </div>
            <v-divider class="mx-4" ></v-divider>
            <v-row>
                <v-col cols="12" md="6" class="pl-sm-6">
                    <v-row>
                    <v-col cols="8">
                        <h3 class="mt-4">Share your dance journey</h3>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="justify-end mt-4 mr-8">
                            <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="primary"><v-icon>mdi-information-outline</v-icon></v-btn>
                        </template>
                        <span>We all have some journey on our dance journey<br> 
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
                                    v-model = "journey.m_artist"
                                    label= "Artist ID"
                                    :maxlength="20">
                                </v-text-field> -->
                                <v-text-field
                                    v-model = "journey.joevent"
                                    label= "Title"
                                    :maxlength="50">
                                </v-text-field>
                                <v-file-input 
                                    type="file"
                                    v-model = "journey.jophoto" 
                                    label="Upload image" 
                                    accept="image/*"
                                    prepend-icon="mdi-image"
                                    @change="toShowImage"
                                ></v-file-input>
                                <v-textarea
                                    v-model = "journey.jocontent"
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
                                        v-model= "journey.jodate"
                                        label="Date"
                                        prepend-icon="mdi-calendar"        
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model= "journey.jodate" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                    <v-text-field
                                        v-model = "journey.jolink"
                                        label= "Link"
                                        :maxlength="50">
                                    </v-text-field>
                                    <h4 class="font-weight-light">Add to highlights</h4>
                                    <v-radio-group
                                        v-model="journey.ishighlight"
                                        row
                                        >
                                        <v-radio
                                            label="Yes"
                                            value="true"
                                        ></v-radio>
                                        <v-radio
                                            label="No"
                                            value="false"
                                        ></v-radio>
                                        </v-radio-group>
                                        <h4 class="font-weight-light">Do you want to keep it private?</h4>
                                    <v-radio-group
                                        v-model="journey.isprivate"
                                        row
                                        >
                                        <v-radio
                                            label="Yes"
                                            value="true"
                                        ></v-radio>
                                        <v-radio
                                            label="No"
                                            value="false"
                                        ></v-radio>
                                        </v-radio-group>
                                    <v-btn v-if="editing_obj == null" small class="text-decoration-none" rounded color="indigo" dark outlined
                                    @click="submit">Submit</v-btn>
                                    <v-btn v-else small class="mt-2 mr-2 text-decoration-none" outlined rounded color="indigo" dark
                                    @click="update">Update</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" md="4" class="pl-sm-6 mt-6 grey lighten-4 rounded-xl">
                        <v-col>
                        <v-row class="pb-6 justify-center text-center">
                            <h2> {{journey.joevent}}</h2>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <v-img :src="imageData" height="300px" width="500px"></v-img>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <h5 class="pb-6 text-center">{{journey.jocontent}} {{journey.jodate}}</h5>
                        </v-row>
                        <v-row v-if="journey.jolink" class="pb-6 justify-center text-center">
                            <v-btn icon color="indigo" >
                                <v-icon>mdi-link</v-icon>
                            </v-btn>
                        </v-row>
                        </v-col>
                </v-col>
            </v-row>
            <v-row v-if="userHasJourney">
                <v-col>
                    <div class="d-flex flex-wrap">
                        <div v-for = "journey in usersJourney" :key = "journey.index" class="pa-2 ma-2 rounded-lg grey lighten-4">
                            <journey-card :journey = "journey"></journey-card>
                            <v-btn icon small>
                                <v-icon color="indigo" small @click="edit(journey)">mdi-circle-edit-outline</v-icon>
                            </v-btn>
                            <v-dialog v-if="userHasJourney" v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn small icon>
                                        <v-icon color="error" small  @click="func(journey.id)" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-card class="pa-4">
                                   <p> Are you sure you want to delete this journey?</p>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="px-4 text-decoration-none" small rounded color="error" dark
                                        @click="remove(rm)">Delete</v-btn>
                                    <v-btn color="indigo" class="px-4 text-decoration-none" small rounded outlined  @click="dialog = false">
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
import JourneyCard from "@/components/JourneyCard.vue"
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    components: {
      JourneyCard
    },
    data(){
        return {
            date:"",
            dialog: false,
            rm:"",
            imageData: "",
            valid_snackbar: false,
            snackbar: false,
            journey: {
                username: this.$store.state.auth.user.username,
                jocontent: "",
                joevent: "",
                jodate: "",
                jophoto: null,
                jolink: "",
                ishighlight: false,
                isprivate: false,
            }
        }
    },
    computed: {
    ...mapGetters(['usersJourney', 'userHasJourney', 'editing_obj'])
    },
    mounted() {
    this.$store.dispatch("check_user_journey");
    this.$store.dispatch("remove_editing_obj")
    },
    methods: {
        func(id){
            this.dialog=true;
            this.rm=id;
        },
        edit(journey){
            this.journey = Object.assign({}, journey);
            this.imageData = this.journey.jophoto;
            this.$store.dispatch("check_editing_obj", journey);
        },
        async remove(id){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/journey/"+id , config);
                this.$store.dispatch("remove_journey");
                this.$store.dispatch("check_user_journey");
                this.dialog =false;
                this.snackbar = true;
                // this.gallery_img = Object.assign({}, this.$store.getters.usersGallery);
                this.$router.push("/create/journey");
            } 
            catch (e) {
                console.log(e);
            }
            //remove particular gallery image by id
        },
        refresh(){
            this.date ="";
            this.imageData = "";
            this.journey.username = this.$store.state.auth.user.username;
            this.journey.jocontent= "";
            this.journey.joevent= "";
            this.journey.jodate= "";
            this.journey.jophoto= null;
            this.journey.jolink= "";
            this.journey.ishighlight= false;
            this.journey.isprivate = false;
        },
        toShowImage(){
            if(this.journey.jophoto)
	        this.imageData = URL.createObjectURL(this.journey.jophoto);
        },
        async submit() {
            if(this.journey.jocontent != "" && this.journey.joevent != "" && this.journey.jophoto)
            {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            let formData = new FormData();
            for (let data in this.journey) {
                formData.append(data, this.journey[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/artist/journey/", formData, config);
                console.log("Artist journey created.");
                this.$store.dispatch("check_user_journey");
                this.refresh();
                this.snackbar = true;
                this.$router.push("/create/journey");
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
            if(this.editing_obj.jocontent!=this.journey.jocontent) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.journey) {
                    if(data == 'id' || data == 'jocontent' )
                    {
                        console.log("content has changed");
                        formName.append(data, this.journey[data]);
                    }}
                await this.$axios.$patch("/v1/artist/journey/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.joevent!=this.journey.joevent) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.journey) {
                    if(data == 'id' || data == 'joevent' )
                    {
                        console.log("event has changed");
                        formName.append(data, this.journey[data]);
                    }}
                await this.$axios.$patch("/v1/artist/journey/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.jodate!=this.journey.jodate) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.journey) {
                    if(data == 'id' || data == 'jodate' )
                    {
                        console.log("date has changed");
                        formName.append(data, this.journey[data]);
                    }}
                await this.$axios.$patch("/v1/artist/journey/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.jophoto!=this.journey.hiphoto) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.journey) {
                    if(data == 'id' || data == 'jophoto' )
                    {
                        console.log("photo has changed");
                        formName.append(data, this.journey[data]);
                    }}
                await this.$axios.$patch("/v1/artist/journey/"+this.editing_obj.id+"/", formName, config);
            }
            if(this.editing_obj.jolink!=this.journey.jolink) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.journey) {
                    if(data == 'id' || data == 'jolink' )
                    {
                        console.log("link has changed");
                        formName.append(data, this.journey[data]);
                    }}
                await this.$axios.$patch("/v1/artist/journey/"+this.editing_obj.id+"/", formName, config);
            }
            this.$store.dispatch("check_user_journey");
            this.refresh();
            this.snackbar = true;
            this.$store.dispatch("remove_editing_obj");
        },       
    }
}
</script>