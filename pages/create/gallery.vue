<template>
    <v-app>
        <div class="text-xs-center ma-6" align = "center">
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/work/`"> Work </v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/each1teach1/`">Each 1 Teach 1 </v-btn>
        </div>
        <v-container class="ma-24" >
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
                                    <v-btn class="flat elevation-0 my-4 ml-0  pa-2 grey lighten-5" @click= "onPick">Upload four images </v-btn>
                                    <input 
                                    type="file" 
                                    name = "g_upload_photo" 
                                    style="display:none" 
                                    ref="fileInput" 
                                    accept="image/*"
                                    required
                                    multiple
                                    @change="onFileChange">
                                </div>
                                <v-btn class="blue rounded-pill" @click="submit">submit</v-btn>
                                <v-btn class="error rounded-pill"  @click="removeImage">remove</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" md="6">
                    <v-flex>
                        <v-container v-bind="{ [`grid-list-${sm}`]: true }" fluid>
                            <v-layout row wrap justify-end align-end>
                            <v-flex v-for="(image, key) in images" :key="key">
                                <img width="200px" height="200px" class="preview pa-2" :ref="'image'" />
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                    </v-col>
            </v-row>
        </v-container>
    </v-app>
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
            images: [],
        }
    },
    methods: {
        removeImage(){
            this.images = []
            },
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInput.click()
        },
        onFileChange(e) {
            let vm = this;
            var selectedFiles = e.target.files;
            for (let i = 0; i < 4; i++) {
                console.log(selectedFiles[i]);
                this.images.push(selectedFiles[i]);
            }

            for (let i = 0; i < this.images.length; i++) {
                let reader = new FileReader();
                reader.onload = (e) => {
                this.$refs.image[i].src = reader.result;
                };
                reader.readAsDataURL(this.images[i]);
            }
            this.artist.g_upload_photo = selectedFiles[0];
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
                    console.log("data ca be saved ");
                    console.log(data);
                    formData.append(data, this.artist[data]);
                }
            }
            try {
                let response = await this.$axios.$post("/v1/gallery/", formData, config);
                this.$router.push("/create/work");
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