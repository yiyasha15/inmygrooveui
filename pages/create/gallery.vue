<template>
    <v-container class="ma-24" >
    <div class="text-xs-center ma-6" align = "center">
        <v-btn rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
        <v-btn rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
        <v-btn rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/create/work/`"> Work </v-btn>
    </div>
    <v-divider class="mx-4" ></v-divider>
        <h5 class="pl-3">Share some images</h5>
        <v-row>
            <v-col cols="12" md="6" class="pl-sm-6">
                <v-form v-on:submit.prevent="submit">
                    <v-row>
                        <v-col cols="12" md="9">
                            <v-text-field
                                v-model = "artist.g_artist"
                                label= "Artist ID"
                                :maxlength="20">
                            </v-text-field>
                            <div class = "form-group">
                                <v-text-field @click= "onPick" label="Upload image"></v-text-field>
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
            <v-col cols="12" md="6" class="pl-sm-6">
                <v-img :src="imageData" height="300px" width="500px"></v-img>
                <!-- <v-flex>
                    <v-container v-bind="{ [`grid-list-${sm}`]: true }" fluid>
                        <v-layout row wrap justify-end align-end>
                        <v-flex v-for="(image, key) in images" :key="key">
                            <img width="200px" height="200px" class="preview pa-2" :ref="'image'" />
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex> -->
                </v-col>
        </v-row>
    </v-container>
</template>
<script>
import EventService from '@/services/EventService.js'
export default {
    data(){
        return {
           artist: {
               g_artist: "",
               g_upload_photo: ""
           },
           imageData: "",
            // images: [],
        }
    },
    methods: {
        // removeImage(){
        //     this.images = []
        //     },
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
            const config = {
                headers: {"content-type": "multipart/form-data"}
            };
            let formData = new FormData();
            for (let data in this.artist) {
                if(data == 'g_upload_photo' && this.artist[data] == null)
                {
                    console.log("artist_image is not there")
                    
                    break;
                }
                else{
                    formData.append(data, this.artist[data]);
                }
            }
            try {
                // if(a==0){
                //     let response = await this.$axios.$post("/v1/gallery/", formData, config);
                //     this.$router.push("/create/gallery");
                // }
                // else{
                    let response = await this.$axios.$post("/v1/gallery/", formData, config);
                    this.$router.push("/create/work");
                    // }
            } catch (e) {
                console.log(e);
            }
        }        
    }
}
//upload animation 
//https://bezkoder.com/vue-axios-file-upload/
//multiple file upload
//https://gist.github.com/raisiqueira/49cf0646fc50da4370c54e1047a67dcd: so cool
</script>