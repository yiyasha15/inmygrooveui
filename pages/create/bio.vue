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
                                v-model= "bio.introduction"
                                label="Describe Yourself">
                            </v-textarea>
                            <v-text-field
                                v-model= "bio.quote"
                                label="Any Favourite Quote?"
                                :maxlength="120">
                            </v-text-field>
                            <v-autocomplete v-model= "bio.style" 
                                :items="items" 
                                attach 
                                chips 
                                hide-selected
                                label="Dance Style" 
                                multiple>
                            </v-autocomplete>
                            <v-text-field
                                v-model= "bio.crew"
                                label="Crew"
                                :maxlength="120">
                            </v-text-field>
                            <v-text-field
                                v-model= "bio.ig"
                                label="Instagram URL">
                            </v-text-field>
                            <v-text-field
                                v-model= "bio.fb"
                                label="Facebook URL">
                            </v-text-field>
                            <v-text-field
                                v-model= "bio.site"
                                label="Personal Website URL">
                            </v-text-field>
                            <v-btn v-if="!userHasBio" outlined class="text-decoration-none" rounded color="indigo" dark
                                @click="submit">submits</v-btn>
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
                        <h5 class="pb-6 text-center">{{bio.introduction}} </h5>
                    </v-row>
                    <v-row v-if="bio.quote" class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center font-italic">"{{bio.quote}}" </h5>
                    </v-row>
                    <v-row v-if="bio.crew" class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center">Repping: {{bio.crew}} 🙏 </h5>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <v-col v-if="bio.ig"><v-icon>mdi-instagram</v-icon></v-col>
                        <v-col v-if="bio.fb"><v-icon>mdi-facebook</v-icon></v-col>
                        <v-col v-if="bio.yt"><v-icon>mdi-youtube</v-icon></v-col>
                        <v-col v-if="bio.site"><v-icon>mdi-email</v-icon></v-col>
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
    middleware : 'check_auth',
    computed: {
        ...mapGetters(['usersBio', 'userHasBio'])
    },
    mounted() {
        this.$store.dispatch("check_user_bio");
    },
    created(){
        if(this.$store.state.hasBio)
        {
            this.bio = Object.assign({}, this.$store.getters.usersBio);
        }
    },
    data(){
        return {
                // this is bio object
            bio: {
                username: this.$store.state.auth.user.username,
                style: "",
                introduction: "",
                quote: "",
                crew: "",
                ig: "",
                fb: "",
                site: ""
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
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.bio) {
                formData.append(data, this.bio[data]);
            }
            try {
                console.log(formData);
                let response = await this.$axios.$post("/v1/artist/bios/", formData, config)
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
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            if(this.usersBio.style!=this.bio.style) //checking if data has changed
            {
            let formStyle = new FormData();
            for (let data in this.bio) {
                if(data == 'style' || data == 'username' )
                {
                    console.log("style has changed");
                    formStyle.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formStyle, config)
            }
            if(this.usersBio.introduction!=this.bio.introduction) //checking if data has changed
            {
            let formIntro = new FormData();
            for (let data in this.bio) {
                if(data == 'introduction' || data == 'username' )
                {
                    console.log("style has changed");
                    formIntro.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formIntro, config)
            }
            if(this.usersBio.quote!=this.bio.quote) //checking if data has changed
            {
            let formQuote = new FormData();
            for (let data in this.bio) {
                if(data == 'quote' || data == 'username' )
                {
                    console.log("quote has changed");
                    formQuote.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formQuote, config)
            }
            if(this.usersBio.crew!=this.bio.crew) //checking if data has changed
            {
            let formCrew = new FormData();
            for (let data in this.bio) {
                if(data == 'crew' || data == 'username' )
                {
                    console.log("Crew has changed");
                    formCrew.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formCrew, config)
            }
            if(this.usersBio.ig!=this.bio.ig) //checking if data has changed
            {
            let formIg = new FormData();
            for (let data in this.bio) {
                if(data == 'ig' || data == 'username' )
                {
                    console.log("ig has changed");
                    formIg.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formIg, config)
            }
            if(this.usersBio.fb!=this.bio.fb) //checking if data has changed
            {
            let formfb = new FormData();
            for (let data in this.bio) {
                if(data == 'fb' || data == 'username' )
                {
                    console.log("fb has changed");
                    formfb.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formfb, config)
            }
            if(this.usersBio.site!=this.bio.site) //checking if data has changed
            {
            let formPersonal = new FormData();
            for (let data in this.bio) {
                if(data == 'site' || data == 'username' )
                {
                    console.log("personal has changed");
                    formPersonal.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formPersonal, config)
            }
        this.$store.dispatch("check_user_bio");
        this.snackbar = true;
        this.$router.push("/create/bio");
        },
        async deleted() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/bios/"+this.usersBio.username, config)
                console.log("Artist Bio deleted.");
                //update store
                this.$store.dispatch("remove_bio")
                this.snackbar = true;
                this.$router.push("/create/bio");
            } catch (e) {
                console.log(e);
            }
        }         
    }
}
</script>
