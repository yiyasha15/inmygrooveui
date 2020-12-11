<template>
    <v-app>
        <v-container class="ma-24" >
        <div class="text-xs-center ma-6" align = "center">
            <v-btn outlined rounded color="#e6d5b8" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn outlined rounded color="#e6d5b8" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
            <v-btn dark rounded color="#e6d5b8" class="elevation-0 text-decoration-none" :to= "`/create/work/`"> Work </v-btn>
        </div>
            <v-divider class="mx-4" ></v-divider>
            <h5 class="pl-3">Share your work</h5>
            <v-row>
                <v-col cols="12" md="6" class="pl-sm-6">
                    <v-form v-on:submit.prevent="submit">
                        <v-row>
                            <v-col cols="12" md="9">
                                <!-- <v-text-field
                                    v-model = "milestone.m_artist"
                                    label= "Artist ID"
                                    :maxlength="20">
                                </v-text-field> -->
                                <v-text-field
                                    v-model = "milestone.w_content"
                                    label= "Title"
                                    :maxlength="30">
                                </v-text-field>
                                <div class = "form-group">
                                        <v-text-field @click= "onPick" label="Upload image"></v-text-field>
                                        <input 
                                        type="file" 
                                        name = "milestone.w_photo" 
                                        style="display:none" 
                                        ref="fileInput" 
                                        accept="image/*"
                                        required
                                        @change="onFileChange">
                                    </div>
                                <v-textarea
                                    v-model = "milestone.w_context"
                                    label= "Share your experience"
                                    :maxlength="80">
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
                                        v-model="milestone.w_datetime"
                                        label="Date"
                                        prepend-icon="mdi-calendar"        
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="milestone.w_datetime" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-menu>
                                    <v-btn class="text-decoration-none" rounded color="indigo" dark
                                 @click="submit">submit</v-btn>
                                <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" md="6" class="pl-sm-6">
                        <v-col>
                        <v-row class="pb-6 justify-center text-center">
                            <h2> {{milestone.w_content}}</h2>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <v-img :src="imageData" height="300px" width="500px"></v-img>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <h5 class="pb-6 text-center">{{milestone.w_context}}, {{milestone.w_datetime}}</h5>
                        </v-row>
                        </v-col>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
    middleware : 'auth',
    data(){
        return {
            date:"",
            imageData: "",
            milestone: {
                w_artist: this.$auth.user.username,
                w_content: "",
                w_context: "",
                w_datetime: "",
                w_photo: ""
            }
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
                this.milestone.w_photo = files[0];
                console.log(this.milestone);
            }
        },
        async submit() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$auth.user.access}
            };
            let formData = new FormData();
            for (let data in this.milestone) {
                if(data == 'w_photo' && this.milestone[data] == null)
                {
                    console.log("artist work is not there")
                    break;
                }
                else{
                    formData.append(data, this.milestone[data]);
                }
            }
            console.log("form lastt", formData);
            try {
                let response = await this.$axios.$post("/v1/artist/work/", formData, config);
                console.log("Artist website created.");
                this.$router.push("/create/each1teach1");
            } catch (e) {
                console.log(e);
            }
        }        
    }

}
</script>