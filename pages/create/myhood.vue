<template>
<v-container class="ma-24">
    <v-row>
        <v-col>
            <v-container>
                <v-btn icon class="elevation-0 white text-decoration-none" :to= "`/myhood`"><v-icon>mdi-arrow-left</v-icon></v-btn>
                <h2 align="center" justify="center">My hood</h2>
                <div class="text-xs-center ma-6" align = "center">
                    Here we can make a room and invite people to join the group, Myhood is 
                    for your dance circle to share the journey and about everything happening around.
                </div>
            </v-container>
        </v-col>
    </v-row>      
    <v-row>
        <v-col cols="12" md="6" class="pl-sm-6">
            <h5>
                Your room
            </h5>
            <v-form v-on:submit.prevent="submit">
            <v-row>
                <v-col cols="12" md="9">
                    <v-text-field
                    v-model = "myhood.room_name"
                    label= "Room name"
                    :maxlength="50">
                </v-text-field>
                <div class = "form-group">
                    <v-text-field clearable prepend-icon="mdi-image" @click= "onPick" label="Upload room image"></v-text-field>
                    <input 
                    type="file" 
                    name = "myhood.photo" 
                    style="display:none" 
                    ref="fileInput" 
                    accept="image/*"
                    required
                    @change="onFileChange">
                </div>
                <v-select
                    v-model="myhood.people"
                    multiple
                    hide-selected
                    :items="artists"
                    color="blue-grey lighten-2"
                    label="Invite friends"
                    item-text="artist_name"
                    item-value="username"
                    >
                    <template v-slot:selection="data">
                        <v-chip
                        close
                        @click:close="remove(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        >
                        <v-avatar left>
                            <v-img :src="data.item.thumb"></v-img>
                        </v-avatar>
                        {{ data.item.artist_name }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                        <v-list-item-avatar>
                            <img :src="data.item.thumb">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-html="data.item.artist_name"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.country"></v-list-item-subtitle>
                        </v-list-item-content>
                        </template>
                    </template>
                </v-select>
                <v-btn v-if="!myhood_obj" outlined class="text-decoration-none" rounded color="indigo" dark
                @click="submit">Submit</v-btn>
                <v-btn v-else class="text-decoration-none" outlined rounded color="indigo" dark
                @click="update">Update</v-btn>
                </v-col>
                </v-row>
            </v-form>   
        </v-col>
        <v-col cols="12" md="6" class="px-sm-6 mt-6 grey lighten-4 rounded-xl">
            <v-row class="pb-6 pa-4 justify-center text-center">
                <h2> {{myhood.room_name}}</h2>
            </v-row>
            <v-row class="pb-6 justify-center text-center">
                <v-img :src="imageData" height="500px" width="500px"></v-img>
            </v-row>
            <v-row class="pb-6 justify-center text-center">
                <h5 class="pb-6 text-center">{{myhood.people}}</h5>
            </v-row>
        </v-col>
    </v-row>
    <v-snackbar v-model="uploaded_snackbar">
        {{ uploaded_text }}
        <template v-slot:action="{ attrs }">
            <v-btn
            color="error"
            icon
            v-bind="attrs"
            @click="uploaded_snackbar = false"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="valid_snackbar">
        Please fill the required details.
        <template v-slot:action="{ attrs }">
            <v-btn
            color="error"
            icon
            v-bind="attrs"
            @click="valid_snackbar = false"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
      </template>
    </v-snackbar>
    </v-container>
</template>
<script>
// import CountryFlag from 'vue-country-flag'
// import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import vuex from 'vuex'
export default {
    middleware : 'check_auth',
    components: {
        // CountryFlag
    },
    // mounted() {
    // this.$store.dispatch("check_artists");
    // },
    // created (){
    //     if(this.$store.state.myhood_obj)
    //     {
    //         this.myhood = Object.assign({}, this.$store.getters.myhood_obj);
    //         this.imageData = this.myhood.photo;
    //     }
    // },
    computed: {
        ...mapGetters(['artists', 'myhood_obj',])
    },
    data(){
        return {
            myhood: {
                owner:"",
                room_name: "",
                photo: "",
                people: "",
            },
            imageData: "",
            menu: false,
            snackbar: false,
            uploaded_snackbar: false,
            valid_snackbar: false,
            uploaded_text: `Changes saved :)`,
        }
    },
    methods: {
        remove (item) {
        const index = this.myhood.people.indexOf(item.username)
        if (index >= 0) this.myhood.people.splice(index, 1)
        },
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
                this.myhood.photo = files[0];
                console.log(this.myhood);
            }
        },
        async submit() {
            if(this.myhood.room_name != "" && this.myhood.photo != "" && this.myhood.people != "" )
            {
                this.myhood.owner = this.$store.state.auth.user.username;
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access}
                };
                let formData = new FormData();
                for (let data in this.myhood) {
                    console.log("post", data);
                    console.log("post", this.myhood[data]);
                    formData.append(data, this.myhood[data]);
                }
                // try {
                //     let response = await this.$axios.$post("/v1/e1t1/myhood/", formData, config);
                //     this.$router.push("/myhood/");
                // } catch (e) {
                //     console.log("cant post!",e);
                // }
            }
            else{
                this.valid_snackbar = true
            }
        },
        async update() {
            this.myhood.owner = this.$store.state.auth.user.username;
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            if(this.myhood_obj.room_name!=this.myhood.room_name) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.myhood) {
                    if(data == 'owner' || data == 'room_name' )
                    {
                        console.log("name has changed");
                        formName.append(data, this.myhood_obj[data]);
                    }}
                await this.$axios.$patch("/v1/myhood/"+this.myhood_obj.id+"/", formName, config);
            }
            if(this.myhood_obj.photo!=this.myhood.photo)
            {
                let formAppreciation = new FormData();
                for (let data in this.sharing) {
                    if(data == 'owner' || data == 'photo')
                    {
                        console.log("photo has changed");
                        formAppreciation.append(data, this.myhood[data]);
                    }
                }
                await this.$axios.$patch("/v1/myhood/"+this.myhood_obj.id+"/", formAppreciation, config);
            }
            if(this.myhood_obj.people!=this.myhood.people) //checking if data has changed
            {
                let formCountry = new FormData();
                for (let data in this.myhood) {
                if(data == 'owner' || data == 'people')
                {
                    console.log("country has changed");
                    formCountry.append(data, this.myhood[data]);
                }
                }
                await this.$axios.$patch("/v1/myhood/"+this.myhood_obj.id+"/", formCountry, config);
            }
            this.$router.push("/e1t1/"+ this.myhood_obj.id);
            this.$store.dispatch("remove_myhood_obj")
        }, 
               
    },
    }
</script>