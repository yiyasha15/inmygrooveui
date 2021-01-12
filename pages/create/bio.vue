<template>
    <v-container class="ma-24">
        <div class="text-xs-center mb-6" align = "center">
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`"> Judging and Workshop </v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/events/`"> Events </v-btn>
        </div>
        <v-divider class="mx-4" ></v-divider>
            <v-row>
            <v-col cols="12" md="6" class="pl-sm-6">
                <v-row>
                <v-col cols="8">
                    <h5 class="font-weight-light mt-4">Build your Bio</h5>
                </v-col>
                <v-col cols="2">
                    <v-row class="justify-end mt-4 mr-8">
                        <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" color="primary"><v-icon>mdi-information-outline</v-icon></v-btn>
                    </template>
                    <span>Share about yourself. Who you are. What you like.<br> 
                        The dance styles/crew that you represent along with your social handles.<br>
                        You can preview it while uploading the information. <br>
                        Time to upload contents, let's go.</span>
                    </v-tooltip>
                    </v-row>
                </v-col>
                </v-row>
                <v-form v-on:submit.prevent="submit">
                    <v-row>
                        <v-col cols="12" md="9">
                            <v-textarea
                                v-model= "bio.b_introduction"
                                label="Describe Yourself">
                            </v-textarea>
                            <v-text-field
                                v-model= "bio.b_quote"
                                label="Any Favourite Quote?"
                                :maxlength="120">
                            </v-text-field>
                            <v-autocomplete v-model= "bio.b_style" 
                                :items="items" 
                                attach 
                                chips 
                                hide-selected
                                label="Dance Style" 
                                multiple>
                            </v-autocomplete>
                            <v-text-field
                                v-model= "bio.b_crew"
                                label="Crew"
                                :maxlength="120">
                            </v-text-field>
                            <v-text-field
                                v-model= "bio.b_ig"
                                label="Instagram URL"
                                :maxlength="120">
                            </v-text-field>
                            <v-text-field
                                v-model= "bio.b_fb"
                                label="Facebook URL"
                                :maxlength="120">
                            </v-text-field>
                            <v-text-field
                                v-model= "bio.b_personal"
                                label="Personal Website URL"
                                :maxlength="120">
                            </v-text-field>
                            <v-btn v-if="!userHasBio" outlined class="text-decoration-none" rounded color="indigo" dark
                                @click="submit">submit</v-btn>
                                <v-btn v-if="userHasBio" class="mt-2 mr-2 text-decoration-none" outlined rounded color="indigo" dark
                                @click="update">Update</v-btn>
                            <v-dialog v-if="userHasBio" v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark rounded color="error" class="mt-2 mr-2 text-decoration-none" 
                                v-bind="attrs" v-on="on">Delete my Bio</v-btn>
                            </template>
                            <v-card class="pa-4">
                                Are you sure you want to delete your Bio?
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="px-4 text-decoration-none" rounded color="error" dark
                                    @click="deleted">Delete</v-btn>
                                <v-btn color="indigo" class="px-4 text-decoration-none" rounded dark outlined  @click="dialog = false">
                                    Cancel
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="12" md="6" class="pl-sm-6 mt-6 grey lighten-4 rounded-xl">
                <!-- <h1 class="pb-6 text-center">Preview Your Website</h1> -->
                    <v-col>
                    <v-row class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center">{{bio.b_introduction}} </h5>
                    </v-row>
                    <v-row v-if="bio.b_quote" class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center font-italic">"{{bio.b_quote}}" </h5>
                    </v-row>
                    <v-row v-if="bio.b_crew" class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center">Repping: {{bio.b_crew}} 🙏 </h5>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <v-col v-if="bio.b_ig"><v-icon>mdi-instagram</v-icon></v-col>
                        <v-col v-if="bio.b_fb"><v-icon>mdi-facebook</v-icon></v-col>
                        <v-col v-if="bio.b_yt"><v-icon>mdi-youtube</v-icon></v-col>
                        <v-col v-if="bio.b_personal"><v-icon>mdi-email</v-icon></v-col>
                    </v-row>
                    </v-col>
            </v-col>
        </v-row>
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
</template>
<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    middleware : 'auth',
    computed: {
        ...mapGetters(['usersBio', 'userHasBio'])
    },
    mounted() {
    if(this.$store.state.hasBio)
        {
            this.bio = Object.assign({}, this.$store.getters.usersBio);
        }
    },
    created(){
        this.$store.dispatch("check_user_bio");
    },
    data(){
        return {
                // this is bio object
            bio: {
                b_artist: this.$auth.user.username,
                b_style: "",
                b_introduction: "",
                b_quote: "",
                b_crew: "",
                b_ig: "",
                b_fb: "",
                b_personal: ""
            },
            dialog: false,
            items: ['HipHop', 'House', 'Locking', 'Popping'],
            imageData: "",
            snackbar: false,
            update_text: 'Website updated successfully.',
            text: 'Website created successfully.'
        }
    },
    methods: {
        ...mapActions(['check_user_bio']),
        async submit() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.bio) {
                formData.append(data, this.bio[data]);
            }
            try {
                console.log(formData);
                let response = await this.$axios.$post("/v1/artist/bio/", formData, config)
                console.log("Artist website created.");
                //update store
                this.$store.dispatch("check_user_bio");
                this.snackbar = true;
                this.$router.push("/create/gallery");
            } catch (e) {
                console.log(e);
            }
        },    
        async update() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$auth.user.access
                }
            };
            if(this.usersBio.b_style!=this.bio.b_style) //checking if data has changed
            {
            let formStyle = new FormData();
            for (let data in this.bio) {
                if(data == 'b_style' || data == 'b_artist' )
                {
                    console.log("style has changed");
                    formStyle.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bio/"+this.usersBio.b_artist + '/', formStyle, config)
            }
            if(this.usersBio.b_introduction!=this.bio.b_introduction) //checking if data has changed
            {
            let formIntro = new FormData();
            for (let data in this.bio) {
                if(data == 'b_introduction' || data == 'b_artist' )
                {
                    console.log("style has changed");
                    formIntro.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bio/"+this.usersBio.b_artist + '/', formIntro, config)
            }
            if(this.usersBio.b_quote!=this.bio.b_quote) //checking if data has changed
            {
            let formQuote = new FormData();
            for (let data in this.bio) {
                if(data == 'b_quote' || data == 'b_artist' )
                {
                    console.log("quote has changed");
                    formQuote.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bio/"+this.usersBio.b_artist + '/', formQuote, config)
            }
            if(this.usersBio.b_crew!=this.bio.b_crew) //checking if data has changed
            {
            let formCrew = new FormData();
            for (let data in this.bio) {
                if(data == 'b_crew' || data == 'b_artist' )
                {
                    console.log("Crew has changed");
                    formCrew.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bio/"+this.usersBio.b_artist + '/', formCrew, config)
            }
            if(this.usersBio.b_ig!=this.bio.b_ig) //checking if data has changed
            {
            let formIg = new FormData();
            for (let data in this.bio) {
                if(data == 'b_ig' || data == 'b_artist' )
                {
                    console.log("ig has changed");
                    formIg.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bio/"+this.usersBio.b_artist + '/', formIg, config)
            }
            if(this.usersBio.b_fb!=this.bio.b_fb) //checking if data has changed
            {
            let formfb = new FormData();
            for (let data in this.bio) {
                if(data == 'b_fb' || data == 'b_artist' )
                {
                    console.log("fb has changed");
                    formfb.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bio/"+this.usersBio.b_artist + '/', formfb, config)
            }
            if(this.usersBio.b_personal!=this.bio.b_personal) //checking if data has changed
            {
            let formPersonal = new FormData();
            for (let data in this.bio) {
                if(data == 'b_personal' || data == 'b_artist' )
                {
                    console.log("personal has changed");
                    formPersonal.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bio/"+this.usersBio.b_artist + '/', formPersonal, config)
            }
        this.$store.dispatch("check_user_bio");
        this.snackbar = true;
        this.$router.push("/create/bio");
        },
        async deleted() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$auth.user.access
                }
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/bio/"+this.usersBio.b_artist, config)
                console.log("Artist Bio deleted.");
                //update store
                this.$store.dispatch("remove_bio")
                this.snackbar = true;
                this.$router.push("/");
            } catch (e) {
                console.log(e);
            }
        }         
    }
}
</script>
