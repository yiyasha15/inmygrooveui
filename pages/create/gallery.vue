<template>
    <v-container class="ma-24" >
    <div class="text-xs-center ma-6" align = "center">
        <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
        <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
        <v-btn outlined rounded color="indigo" class="elevation-0 text-decoration-none" :to= "`/create/highlights/`"> Highlights </v-btn>
    </div>
    <v-divider class="mx-4" ></v-divider>
        <h5 class="pl-3">Share some images</h5>
        <v-row>
            <v-col cols="12" md="6" class="pl-sm-6">
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
                            <v-btn class="text-decoration-none" rounded color="indigo" dark
                                @click="submit">submit</v-btn>
                            <v-btn class="error rounded-pill"  @click="removeImage">remove</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <!-- {{usersGallery}}{{userHasGallery}} -->
            <v-col cols="12" md="6" class="pl-sm-6">
                <div>
                    <v-container grid-list-md :class="{'pa-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}">
                        <div>
                        <v-layout class="flex-wrap">
                            <v-flex xs6 md6 v-for="gallery in usersGallery" :key = "gallery.index">
                                <div v-if = gallery.g_upload_photo>
                                    <v-img :src="gallery.g_upload_photo" 
                                        width = "270px" height = "270px"/>
                                    <v-btn class="error" @click="remove(gallery.id)">Remove</v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                        </div>
                        <div>
                            <v-img :src="imageData" height="270px" width="270px"></v-img>
                        </div>
                    </v-container> 
                </div>
                </v-col>
        </v-row>
        <v-snackbar v-model="snackbar">
            You have uploaded {{usersGallery.length}} image(s).
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
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
    middleware : 'auth',
    data(){
        return {
           artist: {
               g_artist: this.$auth.user.username,
               g_upload_photo: ""
           },
        //    gallery_img: [],
           imageData: "",
           snackbar: false,
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
        async remove(id){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$auth.user.access}
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/gallery/"+id , config);
                this.$store.dispatch("remove_gallery");
                this.$store.dispatch("check_user_gallery");
                // this.gallery_img = Object.assign({}, this.$store.getters.usersGallery);
                this.$router.push("/create/gallery");
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
                    "Authorization": "Bearer " + this.$auth.user.access}
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
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$auth.user.access}
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
                    this.$router.push("/create/work");
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