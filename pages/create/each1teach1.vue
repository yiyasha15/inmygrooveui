<template>
    <v-app>
        <div class="text-xs-center ma-6" align = "center">
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/about/`">About</v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/gallery/`">Gallery</v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/work/`"> Work </v-btn>
            <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/each1teach1/`">Each 1 Teach 1 </v-btn>
        </div>
        <v-container>
        <v-row>
          <v-col cols="12">
            <div class ="pl-6 title xs12">Our Community</div>
          </v-col>
          <v-col cols="10" md="4" width="400px">
              <v-autocomplete
              v-model= "sharing.s_teacher"
                prepend-inner-icon="mdi-magnify"
                label="Your Teacher" 
                hint="Find your teachers" 
                hide-no-data 
                clearable required
                item-text="artist_name"
                :items="artists">
              </v-autocomplete>
              <v-text-field
              v-model= "sharing.s_student"
                label="Your name">
              </v-text-field>
              <v-textarea
                  v-model = "sharing.s_appreciation"
                  label= "Experience with your teacher"
                  >
              </v-textarea>
              <v-textarea
                  v-model = "sharing.s_where_u_met"
                  label= "How did you meet?">
              </v-textarea>
              <v-text-field
                  v-model = "sharing.s_location"
                  label= "Where did you meet?"
                  :maxlength="50">
              </v-text-field>
              <v-text-field
                  v-model = "sharing.s_country"
                  label= "Country"
                  :maxlength="50">
              </v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="true"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model= "sharing.s_date"
                    label="Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model= "sharing.s_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
                </v-menu>
                <div class = "form-group">
                    <v-btn class="flat elevation-0 my-4 ml-0  pa-2 grey lighten-5" @click= "onPick">Upload an image </v-btn>
                    <input 
                    type="file" 
                    name = "sharing.s_photo" 
                    style="display:none" 
                    ref="fileInput" 
                    accept="image/*"
                    required
                    @change="onFileChange">
                </div>
                <!-- <div class = "form-group">
                    <v-btn class="flat elevation-0 my-4 ml-0  pa-2 grey lighten-5" @click= "onPick">Upload photo comment </v-btn>
                    <input 
                    type="file" 
                    name = "sharing.s_photo_comment" 
                    style="display:none" 
                    ref="fileInput" 
                    accept="image/*"
                    required
                    @change="onFileChange2">
                </div> -->
                <v-btn class="blue rounded-pill" @click="submit">submit</v-btn>
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
       sharing: {
         s_teacher: "",
          s_photo: "",
          s_appreciation: "",
          s_where_u_met: "",
          s_date: "",
          s_country: "",
          s_location: "",
          s_photo_comment: "",
          s_student: ""
           },
           imageData: "",
      }
  },
  async asyncData({error}) {
          try {
            const response = await EventService.getArtists();
            console.log(response.data);
            return {
              artists: response.data
            }
          } catch (e) {
              error({statusCode:503, message: "unable to fetch artist data at this point"})
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
                    this.imageData = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                this.sharing.s_photo = files[0];
                console.log(this.sharing);
            }
        },
        // onFileChange2(e) {
        //     let files = e.target.files || e.dataTransfer.files;
        //     if (files) {
        //     const fileReader = new FileReader()
        //     fileReader.onload = (e) => {
        //             this.imageData = e.target.result;
        //         }
        //         fileReader.readAsDataURL(files[0]);
        //         console.log(files[0]);
        //         this.sharing.s_photo_comment = files[0];
        //         console.log(this.sharing);
        //     }
        // },
        async submit() {
            const config = {
                headers: {"content-type": "multipart/form-data"}
            };
            let formData = new FormData();
            for (let data in this.sharing) {
                if(data == 's_teacher' && this.sharing[data] == null)
                {
                    console.log("teacher not mentioned")
                    break;
                }
                else{
                    formData.append(data, this.sharing[data]);
                    console.log("form data is ",data);
                    console.log("form data is ",this.sharing[data]);
                }
            }
            console.log("form lastt", formData);
            try {
                let response = await this.$axios.$post("/v1/sharing/", formData, config);
                console.log("Artist website created.");
                this.$router.push("/create/each1teach1");
            } catch (e) {
                console.log("cant post rn",e);
            }
        }        
    },
}
</script>