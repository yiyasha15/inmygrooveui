<template>
<v-container class="ma-24">
    <v-row>
        <v-col>
            <v-container>
                <v-btn icon class="elevation-0 white text-decoration-none" :to= "`/`"><v-icon>mdi-arrow-left</v-icon></v-btn>
                <h2 align="center" justify="center">Each One Teach One</h2>
                <div class="text-xs-center ma-6" align = "center">
                    Here we can acknowledge all those HipHop artists who passed their knowledge,
                    skill and experience to make us better at our own craft. You can tag and appreciate 
                    your teachers and peers and let them know how much their words and teachings meant to 
                    you in your own journey. Similarly you will have a complete database of all your 
                    students and peers who learned something from you when they tag you.
                </div>
            </v-container>
        </v-col>
    </v-row>      
    <v-row>
        <v-col cols="12" md="6" class="pl-sm-6">
            <h3 class="my-4">
                Share your experience
            </h3>
            <v-form v-on:submit.prevent="submit">
                <v-row>
                    <v-col cols="12" md="9">
                        <v-combobox
                            v-model="sharing.teacher"
                            :items="artists"
                            color="blue-grey lighten-2"
                            label="Teacher name"
                            item-text="artist_name"
                            item-value="username"
                            >
                            <template v-slot:selection="data">
                                <v-chip
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                >
                                <v-avatar v-if="data.item.thumb" left>
                                    <v-img :src="data.item.thumb"></v-img>
                                </v-avatar>
                                <template v-if="data.item.artist_name" >
                                {{ data.item.artist_name }}
                                </template>
                                <template v-else >
                                {{ data.item }}
                                </template>
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
                        </v-combobox>
                        <v-textarea
                            v-model = "sharing.s_appreciation"
                            label= "Your learning">
                        </v-textarea>
                        <v-text-field
                            v-model = "sharing.s_location"
                            label= "Where did you meet?"
                            :maxlength="50">
                        </v-text-field>
                        <v-select 
                            label="Your teacher's country" 
                            v-model= "sharing.s_teacher_country"
                            :items="countries"
                            item-text="name"
                            item-value="code">
                        </v-select>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model= "sharing.s_date"
                                label="Date"
                                prepend-icon="mdi-calendar" 
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
                            <v-text-field clearable prepend-icon="mdi-image" @click= "onPick" label="Upload image"></v-text-field>
                            <input 
                            type="file" 
                            name = "sharing.s_photo" 
                            style="display:none" 
                            ref="fileInput" 
                            accept="image/*"
                            required
                            @change="onFileChange">
                        </div>
                        <div class = "form-group">
                            <v-text-field clearable prepend-icon="mdi-video" @click= "onPickVideo" label="Upload an appreciation video"></v-text-field>
                            <input 
                            type="file" 
                            name = "sharing.s_video_talk" 
                            style="display:none" 
                            ref="fileInputVideo" 
                            accept="video/*"
                            required
                            @click:clear="rem()"
                            @change="onFileChangeVideo">
                        </div>
                        <div class = "form-group">
                            <v-text-field clearable prepend-icon="mdi-video" @click= "onPickVideo2" label="Upload a video of your learning"></v-text-field>
                            <input 
                            type="file" 
                            name = "sharing.s_video_dance" 
                            style="display:none" 
                            ref="fileInputVideo2" 
                            accept="video/*"
                            required
                            @change="onFileChangeVideo2">
                        </div>
                        <v-btn v-if="!share_obj" outlined class="text-decoration-none" rounded color="indigo" dark
                        @click="submit">Submit</v-btn>
                        <v-btn v-else class="text-decoration-none" outlined rounded color="indigo" dark
                        @click="update">Update</v-btn>
                    </v-col>
                </v-row>
            </v-form>   
        </v-col>
        <v-col cols="12" md="6" class="px-sm-8 my-6 grey lighten-4 rounded-xl">
            <v-row class="pb-6 pa-4 justify-center text-center">
                <template v-if="typeof sharing.teacher== 'object'">
                <h2> {{sharing.teacher.username}}</h2>
                </template>
                <template v-else>
                    <h2> {{sharing.teacher}}</h2>
                </template>
                <v-spacer></v-spacer>
                <h5>{{sharing.s_location}}</h5>
                <v-btn icon class="text-decoration-none" >
                    <country-flag :country= sharing.s_teacher_country />
                </v-btn>
            </v-row>
            <v-row class="pb-6 justify-center text-center">
                <v-img :src="imageData" height="500px" width="500px"></v-img>
            </v-row>
            <v-row class="pb-6 justify-center text-center">
                <h5 class="pb-6 text-center">{{sharing.s_appreciation}} {{sharing.s_date}} </h5>
            </v-row>
            <v-row v-if="sharing.s_video_dance" class="pb-6 justify-center text-center">
                <h5 class="pb-6 text-center"><v-icon color="green">mdi-video</v-icon> Freestyle video.</h5>
            </v-row>
            <v-row v-if="sharing.s_video_talk" class="pb-6 justify-center text-center">
                <h5 class="pb-6 text-center"><v-icon color="green">mdi-video</v-icon> Appreciation video.</h5>
            </v-row>
        </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
        {{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn
            color="error"
            icon
            v-bind="attrs"
            @click="snackbar = false"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
      </template>
    </v-snackbar>
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
    <v-snackbar v-model="mention_teacher_snackbar">
        Please fill the required details.
        <template v-slot:action="{ attrs }">
            <v-btn
            color="error"
            icon
            v-bind="attrs"
            @click="mention_teacher_snackbar = false"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
      </template>
    </v-snackbar>
    </v-container>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import vuex from 'vuex'
export default {
    middleware : 'check_auth',
    components: {
        CountryFlag
    },
    mounted() {
    this.$store.dispatch("check_artists");
    },
    created (){
        if(this.$store.state.share_obj)
        {
            this.sharing = Object.assign({}, this.$store.getters.share_obj);
            this.imageData = this.sharing.s_photo;
        }
    },
    computed: {
        ...mapGetters(['artists', 'share_obj','usersPortfolio'])
    },
    data(){
        return {
            countries:[
                    {"name": "Afghanistan", "code": "AF"},
                    {"name": "Åland Islands", "code": "AX"},
                    {"name": "Albania", "code": "AL"},
                    {"name": "Algeria", "code": "DZ"},
                    {"name": "American Samoa", "code": "AS"},
                    {"name": "AndorrA", "code": "AD"},
                    {"name": "Angola", "code": "AO"},
                    {"name": "Anguilla", "code": "AI"},
                    {"name": "Antarctica", "code": "AQ"},
                    {"name": "Antigua and Barbuda", "code": "AG"},
                    {"name": "Argentina", "code": "AR"},
                    {"name": "Armenia", "code": "AM"},
                    {"name": "Aruba", "code": "AW"},
                    {"name": "Australia", "code": "AU"},
                    {"name": "Austria", "code": "AT"},
                    {"name": "Azerbaijan", "code": "AZ"},
                    {"name": "Bahamas", "code": "BS"},
                    {"name": "Bahrain", "code": "BH"},
                    {"name": "Bangladesh", "code": "BD"},
                    {"name": "Barbados", "code": "BB"},
                    {"name": "Belarus", "code": "BY"},
                    {"name": "Belgium", "code": "BE"},
                    {"name": "Belize", "code": "BZ"},
                    {"name": "Benin", "code": "BJ"},
                    {"name": "Bermuda", "code": "BM"},
                    {"name": "Bhutan", "code": "BT"},
                    {"name": "Bolivia", "code": "BO"},
                    {"name": "Bosnia and Herzegovina", "code": "BA"},
                    {"name": "Botswana", "code": "BW"},
                    {"name": "Bouvet Island", "code": "BV"},
                    {"name": "Brazil", "code": "BR"},
                    {"name": "British Indian Ocean Territory", "code": "IO"},
                    {"name": "Brunei Darussalam", "code": "BN"},
                    {"name": "Bulgaria", "code": "BG"},
                    {"name": "Burkina Faso", "code": "BF"},
                    {"name": "Burundi", "code": "BI"},
                    {"name": "Cambodia", "code": "KH"},
                    {"name": "Cameroon", "code": "CM"},
                    {"name": "Canada", "code": "CA"},
                    {"name": "Cape Verde", "code": "CV"},
                    {"name": "Cayman Islands", "code": "KY"},
                    {"name": "Central African Republic", "code": "CF"},
                    {"name": "Chad", "code": "TD"},
                    {"name": "Chile", "code": "CL"},
                    {"name": "China", "code": "CN"},
                    {"name": "Christmas Island", "code": "CX"},
                    {"name": "Cocos (Keeling) Islands", "code": "CC"},
                    {"name": "Colombia", "code": "CO"},
                    {"name": "Comoros", "code": "KM"},
                    {"name": "Congo", "code": "CG"},
                    {"name": "Congo, The Democratic Republic of the", "code": "CD"},
                    {"name": "Cook Islands", "code": "CK"},
                    {"name": "Costa Rica", "code": "CR"},
                    {"name": "Cote D'Ivoire", "code": "CI"},
                    {"name": "Croatia", "code": "HR"},
                    {"name": "Cuba", "code": "CU"},
                    {"name": "Cyprus", "code": "CY"},
                    {"name": "Czech Republic", "code": "CZ"},
                    {"name": "Denmark", "code": "DK"},
                    {"name": "Djibouti", "code": "DJ"},
                    {"name": "Dominica", "code": "DM"},
                    {"name": "Dominican Republic", "code": "DO"},
                    {"name": "Ecuador", "code": "EC"},
                    {"name": "Egypt", "code": "EG"},
                    {"name": "El Salvador", "code": "SV"},
                    {"name": "Equatorial Guinea", "code": "GQ"},
                    {"name": "Eritrea", "code": "ER"},
                    {"name": "Estonia", "code": "EE"},
                    {"name": "Ethiopia", "code": "ET"},
                    {"name": "Falkland Islands (Malvinas)", "code": "FK"},
                    {"name": "Faroe Islands", "code": "FO"},
                    {"name": "Fiji", "code": "FJ"},
                    {"name": "Finland", "code": "FI"},
                    {"name": "France", "code": "FR"},
                    {"name": "French Guiana", "code": "GF"},
                    {"name": "French Polynesia", "code": "PF"},
                    {"name": "French Southern Territories", "code": "TF"},
                    {"name": "Gabon", "code": "GA"},
                    {"name": "Gambia", "code": "GM"},
                    {"name": "Georgia", "code": "GE"},
                    {"name": "Germany", "code": "DE"},
                    {"name": "Ghana", "code": "GH"},
                    {"name": "Gibraltar", "code": "GI"},
                    {"name": "Greece", "code": "GR"},
                    {"name": "Greenland", "code": "GL"},
                    {"name": "Grenada", "code": "GD"},
                    {"name": "Guadeloupe", "code": "GP"},
                    {"name": "Guam", "code": "GU"},
                    {"name": "Guatemala", "code": "GT"},
                    {"name": "Guernsey", "code": "GG"},
                    {"name": "Guinea", "code": "GN"},
                    {"name": "Guinea-Bissau", "code": "GW"},
                    {"name": "Guyana", "code": "GY"},
                    {"name": "Haiti", "code": "HT"},
                    {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
                    {"name": "Holy See (Vatican City State)", "code": "VA"},
                    {"name": "Honduras", "code": "HN"},
                    {"name": "Hong Kong", "code": "HK"},
                    {"name": "Hungary", "code": "HU"},
                    {"name": "Iceland", "code": "IS"},
                    {"name": "India", "code": "IN"},
                    {"name": "Indonesia", "code": "ID"},
                    {"name": "Iran, Islamic Republic Of", "code": "IR"},
                    {"name": "Iraq", "code": "IQ"},
                    {"name": "Ireland", "code": "IE"},
                    {"name": "Isle of Man", "code": "IM"},
                    {"name": "Israel", "code": "IL"},
                    {"name": "Italy", "code": "IT"},
                    {"name": "Jamaica", "code": "JM"},
                    {"name": "Japan", "code": "JP"},
                    {"name": "Jersey", "code": "JE"},
                    {"name": "Jordan", "code": "JO"},
                    {"name": "Kazakhstan", "code": "KZ"},
                    {"name": "Kenya", "code": "KE"},
                    {"name": "Kiribati", "code": "KI"},
                    {"name": "Korea, Democratic People'S Republic of", "code": "KP"},
                    {"name": "Korea, Republic of", "code": "KR"},
                    {"name": "Kuwait", "code": "KW"},
                    {"name": "Kyrgyzstan", "code": "KG"},
                    {"name": "Lao People'S Democratic Republic", "code": "LA"},
                    {"name": "Latvia", "code": "LV"},
                    {"name": "Lebanon", "code": "LB"},
                    {"name": "Lesotho", "code": "LS"},
                    {"name": "Liberia", "code": "LR"},
                    {"name": "Libyan Arab Jamahiriya", "code": "LY"},
                    {"name": "Liechtenstein", "code": "LI"},
                    {"name": "Lithuania", "code": "LT"},
                    {"name": "Luxembourg", "code": "LU"},
                    {"name": "Macao", "code": "MO"},
                    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
                    {"name": "Madagascar", "code": "MG"},
                    {"name": "Malawi", "code": "MW"},
                    {"name": "Malaysia", "code": "MY"},
                    {"name": "Maldives", "code": "MV"},
                    {"name": "Mali", "code": "ML"},
                    {"name": "Malta", "code": "MT"},
                    {"name": "Marshall Islands", "code": "MH"},
                    {"name": "Martinique", "code": "MQ"},
                    {"name": "Mauritania", "code": "MR"},
                    {"name": "Mauritius", "code": "MU"},
                    {"name": "Mayotte", "code": "YT"},
                    {"name": "Mexico", "code": "MX"},
                    {"name": "Micronesia, Federated States of", "code": "FM"},
                    {"name": "Moldova, Republic of", "code": "MD"},
                    {"name": "Monaco", "code": "MC"},
                    {"name": "Mongolia", "code": "MN"},
                    {"name": "Montserrat", "code": "MS"},
                    {"name": "Morocco", "code": "MA"},
                    {"name": "Mozambique", "code": "MZ"},
                    {"name": "Myanmar", "code": "MM"},
                    {"name": "Namibia", "code": "NA"},
                    {"name": "Nauru", "code": "NR"},
                    {"name": "Nepal", "code": "NP"},
                    {"name": "Netherlands", "code": "NL"},
                    {"name": "Netherlands Antilles", "code": "AN"},
                    {"name": "New Caledonia", "code": "NC"},
                    {"name": "New Zealand", "code": "NZ"},
                    {"name": "Nicaragua", "code": "NI"},
                    {"name": "Niger", "code": "NE"},
                    {"name": "Nigeria", "code": "NG"},
                    {"name": "Niue", "code": "NU"},
                    {"name": "Norfolk Island", "code": "NF"},
                    {"name": "Northern Mariana Islands", "code": "MP"},
                    {"name": "Norway", "code": "NO"},
                    {"name": "Oman", "code": "OM"},
                    {"name": "Pakistan", "code": "PK"},
                    {"name": "Palau", "code": "PW"},
                    {"name": "Palestinian Territory, Occupied", "code": "PS"},
                    {"name": "Panama", "code": "PA"},
                    {"name": "Papua New Guinea", "code": "PG"},
                    {"name": "Paraguay", "code": "PY"},
                    {"name": "Peru", "code": "PE"},
                    {"name": "Philippines", "code": "PH"},
                    {"name": "Pitcairn", "code": "PN"},
                    {"name": "Poland", "code": "PL"},
                    {"name": "Portugal", "code": "PT"},
                    {"name": "Puerto Rico", "code": "PR"},
                    {"name": "Qatar", "code": "QA"},
                    {"name": "Reunion", "code": "RE"},
                    {"name": "Romania", "code": "RO"},
                    {"name": "Russian Federation", "code": "RU"},
                    {"name": "RWANDA", "code": "RW"},
                    {"name": "Saint Helena", "code": "SH"},
                    {"name": "Saint Kitts and Nevis", "code": "KN"},
                    {"name": "Saint Lucia", "code": "LC"},
                    {"name": "Saint Pierre and Miquelon", "code": "PM"},
                    {"name": "Saint Vincent and the Grenadines", "code": "VC"},
                    {"name": "Samoa", "code": "WS"},
                    {"name": "San Marino", "code": "SM"},
                    {"name": "Sao Tome and Principe", "code": "ST"},
                    {"name": "Saudi Arabia", "code": "SA"},
                    {"name": "Senegal", "code": "SN"},
                    {"name": "Serbia and Montenegro", "code": "CS"},
                    {"name": "Seychelles", "code": "SC"},
                    {"name": "Sierra Leone", "code": "SL"},
                    {"name": "Singapore", "code": "SG"},
                    {"name": "Slovakia", "code": "SK"},
                    {"name": "Slovenia", "code": "SI"},
                    {"name": "Solomon Islands", "code": "SB"},
                    {"name": "Somalia", "code": "SO"},
                    {"name": "South Africa", "code": "ZA"},
                    {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
                    {"name": "Spain", "code": "ES"},
                    {"name": "Sri Lanka", "code": "LK"},
                    {"name": "Sudan", "code": "SD"},
                    {"name": "Suriname", "code": "SR"},
                    {"name": "Svalbard and Jan Mayen", "code": "SJ"},
                    {"name": "Swaziland", "code": "SZ"},
                    {"name": "Sweden", "code": "SE"},
                    {"name": "Switzerland", "code": "CH"},
                    {"name": "Syrian Arab Republic", "code": "SY"},
                    {"name": "Taiwan, Province of China", "code": "TW"},
                    {"name": "Tajikistan", "code": "TJ"},
                    {"name": "Tanzania, United Republic of", "code": "TZ"},
                    {"name": "Thailand", "code": "TH"},
                    {"name": "Timor-Leste", "code": "TL"},
                    {"name": "Togo", "code": "TG"},
                    {"name": "Tokelau", "code": "TK"},
                    {"name": "Tonga", "code": "TO"},
                    {"name": "Trinidad and Tobago", "code": "TT"},
                    {"name": "Tunisia", "code": "TN"},
                    {"name": "Turkey", "code": "TR"},
                    {"name": "Turkmenistan", "code": "TM"},
                    {"name": "Turks and Caicos Islands", "code": "TC"},
                    {"name": "Tuvalu", "code": "TV"},
                    {"name": "Uganda", "code": "UG"},
                    {"name": "Ukraine", "code": "UA"},
                    {"name": "United Arab Emirates", "code": "AE"},
                    {"name": "United Kingdom", "code": "GB"},
                    {"name": "United States", "code": "US"},
                    {"name": "United States Minor Outlying Islands", "code": "UM"},
                    {"name": "Uruguay", "code": "UY"},
                    {"name": "Uzbekistan", "code": "UZ"},
                    {"name": "Vanuatu", "code": "VU"},
                    {"name": "Venezuela", "code": "VE"},
                    {"name": "Viet Nam", "code": "VN"},
                    {"name": "Virgin Islands, British", "code": "VG"},
                    {"name": "Virgin Islands, U.S.", "code": "VI"},
                    {"name": "Wallis and Futuna", "code": "WF"},
                    {"name": "Western Sahara", "code": "EH"},
                    {"name": "Yemen", "code": "YE"},
                    {"name": "Zambia", "code": "ZM"},
                    {"name": "Zimbabwe", "code": "ZW"}
                    ],
            sharing: {
                    s_teacher_name: "",
                    s_teacher_country: "",
                    s_student_country: "",
                    s_photo: "",
                    s_appreciation: "",
                    s_video_talk: "",
                    s_video_dance: "",
                    s_date: "",
                    s_location: "",
                    username: this.$store.state.auth.user.username,
                    teacher: ""
                },
            imageData: "",
            videoData: "",
            videoData2: "",
            date: "",
            menu: false,
            snackbar: false,
            uploaded_snackbar: false,
            mention_teacher_snackbar: false,
            text: `Max. video upload size is 5MB! :)`,
            uploaded_text: `Video uploaded! :)`,
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
        onPickVideo() //changing the click from button to input using refs
        {
            this.$refs.fileInputVideo.click()
        },
        onFileChangeVideo(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.videoData = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log("video size in KB is ", Math.floor(files[0].size/1000));
                if(Math.floor(files[0].size/1000)<5000){
                    this.uploaded_snackbar = true;
                    this.sharing.s_video_talk = files[0];
                }
                else{
                    this.snackbar = true;
                    console.log("Upload size is 5K KB.");
                }
            }
        },
        onPickVideo2() //changing the click from button to input using refs
        {
            this.$refs.fileInputVideo2.click()
        },
        onFileChangeVideo2(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.videoData2 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0]);
                if(Math.floor(files[0].size/1000)<5000){
                    this.uploaded_snackbar = true;
                    this.sharing.s_video_dance = files[0];
                }
                else{
                    this.snackbar = true;
                    console.log("Upload size is 5K KB.");
                }
            }
        },
        async rem(){
            this.sharing.s_video_dance = ''
        },
        async submit() {
            let t_name = typeof this.sharing.teacher;
            if(t_name == 'object') //if teacher exists then changing the value of teacher to username 
            {
                this.sharing.teacher = this.sharing.teacher.username
                this.sharing.s_teacher_name = this.sharing.teacher 
            }
            else
            {
                this.sharing.s_teacher_name = this.sharing.teacher 
                this.sharing.teacher = "" //making null because no artists to tag.
            }
            if(this.sharing.s_teacher_name != "" && this.sharing.s_location != "" && this.sharing.s_date != "" && this.sharing.s_photo != "" && this.sharing.s_appreciation != "")
            {
                this.sharing.s_student_country = this.usersPortfolio.country;
                const config = {
                    headers: { "content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access}
                };
                let formData = new FormData();
                for (let data in this.sharing) {
                    formData.append(data, this.sharing[data]);
                }
                try {
                    let response = await this.$axios.$post("/v1/e1t1/sharing/", formData, config);
                    this.$router.push("/e1t1/");
                } catch (e) {
                    console.log("cant post!",e);
                }
            }
            else{
                this.mention_teacher_snackbar = true
            }
        },
        async update() {
            let t_name = typeof this.sharing.teacher;
            if(t_name == 'object') //if teacher exists then changing the value of s_teacher to username 
            {
                this.sharing.teacher = this.sharing.teacher.username
                this.sharing.s_teacher_name = this.sharing.teacher 
            }
            else{
                this.sharing.s_teacher_name = this.sharing.teacher 
                this.sharing.teacher = "" //making null because no artists to tag.
            }
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access}
            };
            if(this.share_obj.teacher!=this.sharing.teacher) //checking if data has changed
                {
                let formName = new FormData();
                for (let data in this.sharing) {
                    if(data == 's_teacher' || data == 'username' )
                    {
                        console.log("name has changed");
                        formName.append(data, this.sharing[data]);
                    }}
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formName, config);
            }
            if(this.share_obj.s_appreciation!=this.sharing.s_appreciation)
            {
                let formAppreciation = new FormData();
                for (let data in this.sharing) {
                    if(data == 's_appreciation' || data == 'username')
                    {
                        console.log("appreciation has changed");
                        formAppreciation.append(data, this.sharing[data]);
                    }
                }
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formAppreciation, config);
            }
            if(this.share_obj.s_teacher_country!=this.sharing.s_teacher_country) //checking if data has changed
            {
                let formCountry = new FormData();
                for (let data in this.sharing) {
                if(data == 's_teacher_country' || data == 'username')
                {
                    console.log("country has changed");
                    formCountry.append(data, this.sharing[data]);
                }
                }
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formCountry, config);
            }
            if(this.share_obj.s_photo!=this.sharing.s_photo) //checking if data has changed
            {
                let formPhoto = new FormData();
                for (let data in this.sharing) {
                if(data == 's_photo' || data == 'username')
                {
                    console.log("photo has changed");
                    formPhoto.append(data, this.sharing[data]);
                }
                }
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formPhoto, config);
            }
            if(this.share_obj.s_video_talk!=this.sharing.s_video_talk) //checking if data has changed
            {
                let formVideoTalk = new FormData();
                for (let data in this.sharing) {
                if(data == 's_video_talk' || data == 'username')
                {
                    console.log("video_talk has changed");
                    formVideoTalk.append(data, this.sharing[data]);
                }
                }
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formVideoTalk, config);
            }
            if(this.share_obj.s_video_dance!=this.sharing.s_video_dance) //checking if data has changed
            {
                let formVideoDance = new FormData();
                for (let data in this.sharing) {
                if(data == 's_video_dance' || data == 'username')
                {
                    console.log("video_dance has changed");
                    formVideoDance.append(data, this.sharing[data]);
                }
                }
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formVideoDance, config);
            }
            if(this.share_obj.s_date!=this.sharing.s_date) //checking if data has changed
            {
                let formDate = new FormData();
                for (let data in this.sharing) {
                if(data == 's_date' || data == 'username')
                {
                    console.log("date has changed");
                    formDate.append(data, this.sharing[data]);
                }
                }
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formDate, config);
            }
            if(this.share_obj.s_location!=this.sharing.s_location) //checking if data has changed
            {
                let formLocation = new FormData();
                for (let data in this.sharing) {
                if(data == 's_location' || data == 'username')
                {
                    console.log("location has changed");
                    formLocation.append(data, this.sharing[data]);
                }
                }
                await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.id+"/", formLocation, config);
            }
            this.$router.push("/e1t1/"+ this.share_obj.id);
            this.$store.dispatch("remove_share_obj")
        }, 
               
    },
    }
</script>