<template>
    <v-container class="ma-24">
        <div class="text-xs-center mb-6" align = "center">
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn> -->
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn>
            <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/journey/`"> Journey </v-btn>
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`"> Judging and Workshop </v-btn> -->
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/events/`"> Events </v-btn> -->
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
                            prepend-icon="mdi-instagram"
                                v-model= "bio.ig"
                                label="Instagram URL">
                            </v-text-field>
                            <v-text-field
                            prepend-icon="mdi-facebook"
                                v-model= "bio.fb"
                                label="Facebook URL">
                            </v-text-field>
                            <v-text-field
                            prepend-icon="mdi-email"
                                v-model= "bio.site"
                                label="Personal Website URL">
                            </v-text-field>
                            <!-- <div class = "form-group">
                                <v-text-field prepend-icon="mdi-image" @click= "onPick" label="Upload image"></v-text-field>
                                <input 
                                type="file" 
                                name = "g_upload_photo" 
                                style="display:none" 
                                ref="fileInput" 
                                accept="image/*"
                                required
                                @change="onFileChange">
                            </div> -->
                            <v-container grid-list-md :class="{'pa-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}">
                                <v-layout class="flex-wrap">
                                    <v-flex xs6 md6>
                                        <div class="pa-4 rounded-lg grey lighten-4">
                                            <v-img :src="imageData" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" @click="onPick">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange">
                                            <v-btn icon>
                                                <v-icon color="error" @click="removeImage" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                    <v-flex xs6 md6>
                                        <div class="pa-4 rounded-lg grey lighten-4">
                                            <v-img :src="imageData1" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" @click="onPick1">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput1" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange1">
                                            <v-btn icon>
                                                <v-icon color="error" @click="removeImage1" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                    <v-flex xs6 md6>
                                        <div class="pa-4 rounded-lg grey lighten-4">
                                            <v-img :src="imageData2" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" @click="onPick2">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput2" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange2">
                                            <v-btn icon>
                                                <v-icon color="error" @click="removeImage2" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                    <v-flex xs6 md6>
                                        <div class="pa-4 rounded-lg grey lighten-4">
                                            <v-img :src="imageData3" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" @click="onPick3">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput3" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange3">
                                            <v-btn icon>
                                                <v-icon color="error" @click="removeImage3" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container> 
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
            this.imageData = this.bio.gallery1
            this.imageData1 = this.bio.gallery2
            this.imageData2 = this.bio.gallery3
            this.imageData3 = this.bio.gallery4
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
                site: "",
                gallery1 : "",
                gallery2 : "",
                gallery3 : "",
                gallery4 : "",
            },
            rm:"",
            dialog: false,
            items: ['HipHop', 'House', 'Locking', 'Popping'],
            imageData: "",
            imageData1: "",
            imageData2: "",
            imageData3: "",
            snackbar: false,
            update_text: 'Website updated successfully.',
            text: 'Website created successfully.',
            overlay: false,
        }
    },
    methods: {
        ...mapActions(['check_user_bio']),
        onFileChange(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                this.bio.gallery1 = files[0];
            }
        },
        onFileChange1(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData1 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                this.bio.gallery2 = files[0];
            }
        },
        onFileChange2(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData2 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                this.bio.gallery3 = files[0];
            }
        },
        onFileChange3(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData3 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                this.bio.gallery4 = files[0];
            }
        },
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInput.click()
        },
        onPick1() //changing the click from button to input using refs
        {
            this.$refs.fileInput1.click()
        },
        onPick2() //changing the click from button to input using refs
        {
            this.$refs.fileInput2.click()
        },
        onPick3() //changing the click from button to input using refs
        {
            this.$refs.fileInput3.click()
        },
        removeImage(){
            this.imageData = ""
            this.bio.gallery1 =''
        },
        removeImage1(){
            this.imageData1 = ""
            this.bio.gallery2 =''
        },
        removeImage2(){
            this.imageData2 = ""
            this.bio.gallery3 =''
        },
        removeImage3(){
            this.imageData3 = ""
            this.bio.gallery4 =''
        },
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
                // this.$router.push("/create/gallery");
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
                if(data == 'style' || data == 'id' )
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
                if(data == 'introduction' || data == 'id' )
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
                if(data == 'quote' || data == 'id' )
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
                if(data == 'crew' || data == 'id' )
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
                if(data == 'ig' || data == 'id' )
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
                if(data == 'fb' || data == 'id' )
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
                if(data == 'site' || data == 'id' )
                {
                    console.log("site has changed");
                    formPersonal.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formPersonal, config)
            }
            if(this.usersBio.gallery1!=this.bio.gallery1) //checking if data has changed
            {
            let formPersonal = new FormData();
            for (let data in this.bio) {
                if(data == 'gallery1' || data == 'id' )
                {
                    console.log("pic1 has changed");
                    formPersonal.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formPersonal, config)
            }
            if(this.usersBio.gallery2!=this.bio.gallery2) //checking if data has changed
            {
            let formPersonal = new FormData();
            for (let data in this.bio) {
                if(data == 'gallery2' || data == 'id' )
                {
                    console.log("pic2 has changed");
                    formPersonal.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formPersonal, config)
            }
            if(this.usersBio.gallery3!=this.bio.gallery3) //checking if data has changed
            {
            let formPersonal = new FormData();
            for (let data in this.bio) {
                if(data == 'gallery3' || data == 'id' )
                {
                    console.log("pic3 has changed");
                    formPersonal.append(data, this.bio[data]);
                }}
            await this.$axios.$patch("/v1/artist/bios/"+this.usersBio.username + '/', formPersonal, config)
            }
            if(this.usersBio.gallery4!=this.bio.gallery4) //checking if data has changed
            {
            let formPersonal = new FormData();
            for (let data in this.bio) {
                if(data == 'gallery4' || data == 'id' )
                {
                    console.log("pic4 has changed");
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
                this.bio = ''
                this.imageData = ''
                this.imageData2 = ''
                this.imageData1 = ''
                this.imageData3 = ''
                this.snackbar = true;
                this.$router.push("/create/bio");
            } catch (e) {
                console.log(e);
            }
        }         
    }
}
</script>
