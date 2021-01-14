<template>
    <v-container class="ma-24" >
    <div class="text-xs-center mb-6" align = "center">
        <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
        <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
        <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
        <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn>
                <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`"> Judging and Workshop </v-btn>
                <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/events/`"> Events </v-btn>
    </div>
    <v-divider class="mx-4" ></v-divider>
        <v-row>
            <v-col cols="12" md="6" class="pl-sm-6">
                <v-row>
                    <v-col cols="8">
                        <h5 class="font-weight-light mt-4">Share some images</h5>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="justify-end mt-4 mr-8">
                            <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="primary"><v-icon>mdi-information-outline</v-icon></v-btn>
                        </template>
                        <span>You can upload upto four images.<br>
                            You can preview it while uploading the images.<br>
                            Time to upload content, let's go.</span>
                        </v-tooltip>
                        </v-row>
                    </v-col>
                    </v-row>
                <v-form v-on:submit.prevent="submit">
                    <v-row>
                        <v-col cols="12" md="9">
                            <div class = "form-group">
                                <v-text-field prepend-icon="mdi-image" @click= "onPick" label="Upload image"></v-text-field>
                                <input 
                                type="file" 
                                name = "g_upload_photo" 
                                style="display:none" 
                                ref="fileInput" 
                                accept="image/*"
                                required
                                @change="onFileChange">
                            </div>
                            <v-btn class="text-decoration-none rounded-pill" outlined color="indigo" dark
                                @click="submit">submit</v-btn>
                            <v-btn class="error rounded-pill"  @click="removeImage">remove</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="12" md="6" class="pl-sm-6">
                <div>
                    <v-container grid-list-md :class="{'pa-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}">
                        <div>
                        <v-layout class="flex-wrap">
                            <v-flex xs6 md6 v-for="gallery in usersGallery" :key = "gallery.index">
                                <div v-if = gallery.g_upload_photo class="pa-4 rounded-lg grey lighten-4">
                                    <v-img :src="gallery.g_upload_photo" 
                                        width = "270px" height = "270px"/>
                                    <v-btn icon>
                                        <v-icon color="indigo" @click="upd(gallery.id)">mdi-circle-edit-outline</v-icon>
                                    </v-btn>
                                    <input 
                                    type="file" 
                                    name = "g_upload_photo" 
                                    style="display:none" 
                                    ref="fileInputUpdate" 
                                    accept="image/*"
                                    required
                                    @change="onFileChangeUpdate">
                                    <v-dialog v-if="userHasGallery" v-model="dialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon>
                                            <v-icon color="error" @click="func(gallery.id)" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card class="pa-4">
                                        Are you sure you want to delete this image?
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn v-if="userHasGallery" class="px-4 text-decoration-none" rounded color="error" dark
                                            @click="remove(rm)">Delete</v-btn>
                                        <v-btn color="indigo" class="px-4 text-decoration-none" rounded outlined @click="dialog = false">
                                            Cancel
                                        </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-overlay :z-index="2" :value="overlay" >
                        <v-container class="rounded-lg white" >
                            <v-col cols="12" align="end" justify="end">
                                <v-btn icon color="error" @click="overlay = false">
                                <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" align="center" justify="center">
                                <div>
                                <v-img :src="imageData" height="270px" width="270px"></v-img>
                            </div>
                            <v-btn v-if="userHasGallery" class="text-decoration-none mt-4" rounded color="indigo" dark
                                        @click="updates(rm)">Update</v-btn>
                            </v-col>
                        </v-container>
                        </v-overlay>
                        </div>
                        <v-img :src="imageData" height="270px" width="270px"></v-img>
                    </v-container> 
                </div>
                </v-col>
        </v-row>
        <v-snackbar v-model="snackbar">
            <div v-if="usersGallery.length<3">
            You have uploaded {{usersGallery.length}} image(s). {{4 - usersGallery.length}} more to go!
            </div>
            <div v-if="usersGallery.length==3">
            Alright! Last one and we'll move on to adding the highlights of your dance journey.
            </div>
            <div v-if="usersGallery.length==4">
            You can only upload upto {{usersGallery.length}} images.
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
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    middleware : 'check_auth',
    data(){
        return {
           artist: {
               g_artist: this.$store.state.auth.user.username,
               g_upload_photo: ""
           },
           imageData: "",
           snackbar: false,
           dialog: false,
           rm:"",
           overlay: false,
        }
    },
    computed: {
        ...mapGetters(['usersGallery', 'userHasGallery'])
    },
    mounted() {
    this.$store.dispatch("check_user_portfolio");
    this.$store.dispatch("check_user_gallery");
    },
    // created (){
    //     this.gallery_img = Object.assign({}, this.$store.getters.usersGallery);
    // },
    methods: {
        func(id){
            this.dialog=true;
            this.rm=id;
        },
        upd(id){
            this.$refs.fileInput.click()
            this.rm=id
            this.overlay =true
        },
        onFileChangeUpdate(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                this.artist.g_upload_photo = files[0];
                // put_img(files[0]);
            }
            },
        async remove(id){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/gallery/"+id , config);
                this.$store.dispatch("remove_gallery");
                this.$store.dispatch("check_user_gallery");
                // this.gallery_img = Object.assign({}, this.$store.getters.usersGallery);
                this.$router.push("/create/gallery");
                this.dialog = false
            } 
            catch (e) {
                console.log(e);
            }
            //remove particular gallery image by id
        },
        removeImage(){
            this.imageData = ""
        },
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInput.click()
        },
        async updates(id){
            console.log(id);
        },
        // async update(id){
        //     const config = {
        //     headers: {"content-type": "multipart/form-data",
        //         "Authorization": "Bearer " + tthis.$store.state.auth.user.access}
        //     };
        //     let formUpdate = new FormData();
        //         console.log(this.artist);
        //         for (let data in this.artist) {
        //             if(data == 'id' || data == 'g_upload_photo' )
        //             {
        //                 console.log(this.artist);
        //             formUpdate.append(data, this.artist[data]);
        //             }
        //         }
        //     try {
        //         let response = await this.$axios.$patch("/v1/artist/gallery/"+id , formUpdate, config);
        //         this.$store.dispatch("remove_gallery");
        //         this.$store.dispatch("check_user_gallery");
        //         // this.gallery_img = Object.assign({}, this.$store.getters.usersGallery);
        //         this.$router.push("/create/gallery");
        //     } 
        //     catch (e) {
        //         console.log(e);
        //     }
        // },
        onFileChange(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                this.artist.g_upload_photo = files[0];
                // put_img(files[0]);
            }
            // for (let i = 0; i < 4; i++) {
            //     console.log(selectedFiles[i]);
            //     this.images.push(selectedFiles[i]);
            // }

            // for (let i = 0; i < this.images.length; i++) {
                // let reader = new FileReader();
                // reader.onload = (e) => {
                // this.$refs.image[i].src = reader.result;
                // };
                // reader.readAsDataURL(this.images[i]);
            // }
            // this.artist.g_upload_photo = selectedFiles[0];
        },
        async submit() {
            if(!this.imageData == ""){
                switch (this.usersGallery.length) {
                case 0:
                case 1:
                case 2:
                {
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access}
                };
                let formData = new FormData();
                console.log(this.artist);
                for (let data in this.artist) {
                    console.log(data);
                    console.log(this.artist);
                formData.append(data, this.artist[data]);
                }
                try {
                console.log(formData);
                let response = await this.$axios.$post("/v1/artist/gallery/", formData, config);
                this.$store.dispatch("check_user_gallery");
                this.removeImage();
                this.$router.push("/create/gallery");
                } 
                catch (e) {
                    console.log(e);
                }
                }
                this.snackbar = true
                break;
                case 3:
                   {
                       console.log("final");
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access}
                    };
                let formData = new FormData();
                for (let data in this.artist) {
                    console.log(data);
                    console.log(this.artist);
                formData.append(data, this.artist[data]);
                }
                try {
                    let response = await this.$axios.$post("/v1/artist/gallery/", formData, config);
                    this.$store.dispatch("check_user_gallery");
                    this.removeImage();
                    this.$router.push("/create/highlights");
                } 
                catch (e) {
                    console.log(e);
                }
                }
                break;
                case 4:
                default:
                    {
                        this.snackbar = true
                    }
                break;
            }
            }
            else{
                alert("select image");
                console.log("select image");
            }
        }        
    }
}
//upload animation 
//https://bezkoder.com/vue-axios-file-upload/
//multiple file upload
//https://gist.github.com/raisiqueira/49cf0646fc50da4370c54e1047a67dcd: so cool
</script>