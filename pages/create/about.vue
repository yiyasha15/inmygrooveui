<template>
    <v-app>
        <div class="text-xs-center ma-6" align = "center">
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/work/`"> Work </v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/each1teach1/`">Each 1 Teach 1 </v-btn>
        </div>
            <v-divider class="mx-8" ></v-divider>
        <v-container class="ma-24 ">
            <v-row>
                <v-col  class="white outlined pa-8 elevation-0  mx-4">
                    <!-- <h1 class="pb-6 text-center">Create Your Website</h1>
                    <v-divider />
                    <div >We already have prepared an intuitive template for your webite. <br>
                    You can preview it while uploading the information. <br>
                    Time to upload contents, let's go.
                    </div> -->
                    <v-form v-on:submit.prevent="submit">
                        <v-row>
                            <v-col cols="12" md="9">
                                <v-text-field
                                    v-model = "artist_data.artist_name"
                                    label="Name"
                                    :maxlength="20">
                                </v-text-field>
                                <v-text-field
                                    v-model = "artist_data.country"
                                    label="Country">
                                </v-text-field>
                                <!-- <v-text-field
                                    v-model = "artist_data.style"
                                    label="Style">
                                </v-text-field> -->
                                <v-select v-model="artist_data.style" 
                                    :items="items" 
                                    attach 
                                    chips 
                                    label="Style" 
                                    multiple>
                                </v-select>
                                <v-textarea
                                    v-model = "artist_data.bio"
                                    label="Introduction"
                                    :maxlength="120">
                                </v-textarea>
                                <!-- <v-text-field
                                    v-model = "artist_data.biography"
                                    label="Biography">
                                </v-text-field> -->
                                <div class = "form-group">
                                    <v-btn class="flat elevation-0 my-4 ml-0  pa-2 grey lighten-5" @click= "onPick">Upload a lanscape image </v-btn>
                                    <input 
                                    type="file" 
                                    name = "artist_image" 
                                    style="display:none" 
                                    ref="fileInput" 
                                    accept="image/*"
                                    required
                                    @change="onFileChange">
                                </div>
                                <v-btn class="blue rounded-pill" @click="submit">submit</v-btn>
                                <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col class="white lighten-5 outlined pa-8 ml-12 hidden-md-and-down elevation-0">
                    <!-- <h1 class="pb-6 text-center">Preview Your Website</h1> -->
                        <v-col>
                        <v-row class="pb-6 justify-center text-center">
                            <h2> {{artist_data.artist_name}}</h2>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <v-img :src="imageData" height="300px" width="500px"></v-img>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <h5 class="pb-6 text-center">"{{artist_data.bio}}"</h5>
                        </v-row>
                        </v-col>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    data(){
        return {
           artist_data: {
               artist_name: "",
               country: "",
               style: "",
               artist_image: "",
               bio: "",
           },
            items: ['HipHop', 'House', 'Locking', 'Popping'],
            value: ['HipHop', 'House', 'Locking', 'Popping'],
            imageData: "",
        }
    },
    methods: {
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
                this.artist_data.artist_image = files[0];
                console.log(this.artist_data);
            }
        },
        async submit() {
            const config = {
                headers: {"content-type": "multipart/form-data"}
            };
            let formData = new FormData();
            for (let data in this.artist_data) {
                if(data == 'artist_image' && this.artist_data[data] == null)
                {
                    console.log("artist_ image is not there")
                    break;
                }
                else{
                    formData.append(data, this.artist_data[data]);
                }
            }
            if(this.artist_data.artist_image){
            try {
                let response = await this.$axios.$post("/v1/portfolio/", formData, config);
                console.log("Artist website created.");
                this.$router.push("/create/gallery");
            } catch (e) {
                console.log(e);
            }
            }
            else{
                console.log("add image please");
                alert("Image required!");
            }
        }        
    }
}
//upload animation 
//https://bezkoder.com/vue-axios-file-upload/
//multiple file upload
//https://gist.github.com/raisiqueira/49cf0646fc50da4370c54e1047a67dcd: so cool
</script>
