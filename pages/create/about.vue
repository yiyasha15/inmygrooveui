<template>
    <v-app>
        <v-container class="ma-24 ">
            <div class="text-xs-center mb-6" align = "center">
                <v-btn dark rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/about/`">About</v-btn>
                <v-btn outlined rounded color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/bio/`">Bio</v-btn>
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
                        <h5 class="font-weight-light mt-4">Build your portfolio</h5>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="justify-end mt-4 mr-8">
                            <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="primary"><v-icon>mdi-information-outline</v-icon></v-btn>
                        </template>
                        <span>We already have prepared an intuitive template for your website. <br>
                            You can preview it while uploading the information. <br>
                            Time to upload contents, let's go.</span>
                        </v-tooltip>
                        </v-row>
                    </v-col>
                    </v-row>
                    <v-form v-on:submit.prevent="submit">
                        <v-row>
                            <v-col cols="12" md="9">
                                <v-text-field
                                    v-model = "artist_data.artist_name"
                                    label="Name"
                                    :maxlength="50">
                                </v-text-field>
                                <v-select label="Country" v-model= "artist_data.country"
                                    :items="countries"
                                    item-text="name"
                                    item-value="code"
                                ></v-select>
                                <div class = "form-group">
                                    <v-text-field prepend-icon="mdi-image" @click= "onPick" label="Upload a landscape image"></v-text-field>
                                    <input 
                                    type="file" 
                                    name = "cover" 
                                    style="display:none" 
                                    ref="fileInput" 
                                    accept="image/*"
                                    required
                                    @change="onFileChange">
                                </div>
                                <!-- <v-select v-model= "artist_data.style" 
                                    :items="items" 
                                    attach 
                                    chips 
                                    label="Style" 
                                    multiple>
                                </v-select>
                                <v-textarea
                                    v-model= "artist_data.introduction"
                                    label="Introduction">
                                </v-textarea>
                                <v-text-field
                                    v-model= "artist_data.quote"
                                    label="Favourite quote"
                                    :maxlength="120">
                                </v-text-field>
                                <v-text-field
                                    v-model= "artist_data.crew"
                                    label="Crew"
                                    :maxlength="120">
                                </v-text-field>
                                <v-text-field
                                    v-model= "artist_data.ig"
                                    label="Instagram"
                                    :maxlength="120">
                                </v-text-field>
                                <v-text-field
                                    v-model= "artist_data.fb"
                                    label="Facebook"
                                    :maxlength="120">
                                </v-text-field>
                                <v-text-field
                                    v-model= "artist_data.personal"
                                    label="Personal website"
                                    :maxlength="120">
                                </v-text-field> -->
                                <v-btn v-if="!userHasPortfolio" outlined class="text-decoration-none" rounded color="indigo" dark
                                 @click="submit">submit</v-btn>
                                 <v-btn v-if="userHasPortfolio" class="mt-2 mr-2 text-decoration-none" outlined rounded color="indigo" dark
                                 @click="update">Update</v-btn>
                                <v-dialog v-if="userHasPortfolio" v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark rounded color="error" class="mt-2 mr-2 text-decoration-none" v-bind="attrs" v-on="on">Delete my portfolio</v-btn>
                                </template>
                                <v-card class="pa-4">
                                    Are you sure you want to delete your portfolio?
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
                        <h2> {{artist_data.artist_name}}</h2>
                        <v-spacer></v-spacer>
                        <v-btn v-if="artist_data.country " icon class="text-decoration-none" >
                            <country-flag :country= artist_data.country />
                        </v-btn>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <v-img :src="imageData" height="300px" width="500px"></v-img>
                    </v-row>
                    <!-- <v-row v-if="artist_data.quote" class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center font-italic">"{{artist_data.quote}}" </h5>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center">{{artist_data.introduction}} </h5>
                    </v-row>
                    <v-row v-if="artist_data.crew" class="pb-6 justify-center text-center">
                        <h5 class="pb-6 text-center">Repping: {{artist_data.crew}} 🙏 </h5>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <v-col v-if="artist_data.ig"><v-icon>mdi-instagram</v-icon></v-col>
                        <v-col v-if="artist_data.fb"><v-icon>mdi-facebook</v-icon></v-col>
                        <v-col v-if="artist_data.yt"><v-icon>mdi-youtube</v-icon></v-col>
                        <v-col v-if="artist_data.personal"><v-icon>mdi-email</v-icon></v-col>
                    </v-row> -->
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
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
    </v-app>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    middleware : 'check_auth',
    // middleware:['auth-admin'],
    components: {
        CountryFlag
    },
    computed: {
        ...mapGetters(['usersPortfolio', 'userHasPortfolio', 'loggedInUser'])
    },
    mounted() {
    // this.$store.dispatch("check_user_portfolio");
    },
    created(){
        if(this.$store.state.hasPortfolio)
        {
            this.artist_data = Object.assign({}, this.$store.getters.usersPortfolio);
            this.imageData = this.artist_data.cover;
        }
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
                // this is artist object
            artist_data: {
                artist_name: "",
                username: this.$store.state.auth.user.username,
                country: "",
                cover: "",
                // style: "",
                // introduction: "",
                // quote: "",
                // crew: "",
                // ig: "",
                // fb: "",
                // personal: ""
            },
            dialog: false,
            items: ['HipHop', 'House', 'Locking', 'Popping'],
            imageData: "",
            snackbar: false,
            valid_snackbar: false,
            update_text: 'Website updated successfully.',
            text: 'Website created successfully.'
        }
    },
    methods: {
        ...mapActions(['check_user_portfolio']),
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
                this.artist_data.cover = files[0];
                console.log(this.artist_data);
            }
        },
        async submit() {
            if(this.artist_data.artist_name != "" && this.artist_data.country != "" && this.artist_data.cover != "" )
            {
                console.log(this.artist_data);
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            let formData = new FormData();
            for (let data in this.artist_data) {
                formData.append(data, this.artist_data[data]);
            }
            try {
                console.log(formData);
                let response = await this.$axios.$post("/v1/artist/portfolios/", formData, config)
                console.log("Artist website created.");
                //update store
                this.$store.dispatch("check_user_portfolio");
                this.snackbar = true;
                this.$router.push("/create/bio");
            } catch (e) {
                console.log(e);
            }
            }
            else{
                this.valid_snackbar = true
            }
        },    
        async update() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            if(this.usersPortfolio.artist_name!=this.artist_data.artist_name) //checking if data has changed
            {
            let formName = new FormData();
            for (let data in this.artist_data) {
                if(data == 'artist_name' || data == 'username' )
                {
                    console.log("name has changed");
                    formName.append(data, this.artist_data[data]);
                }
            }
            await this.$axios.$patch("/v1/artist/portfolios/"+this.usersPortfolio.username + '/', formName, config)
            }
            if(this.usersPortfolio.cover!=this.artist_data.cover) //checking if data has changed
            {
            let formImage = new FormData();
            for (let data in this.artist_data) {
                if(data == 'cover' || data == 'username' )
                {
                    console.log("image has changed");
                    formImage.append(data, this.artist_data[data]);
                }}
            await this.$axios.$patch("/v1/artist/portfolios/"+this.usersPortfolio.username + '/', formImage, config)
            }
            if(this.usersPortfolio.country!=this.artist_data.country) //checking if data has changed
            {
            let formCountry = new FormData();
            for (let data in this.artist_data) {
                if(data == 'country' || data == 'username' )
                {
                    console.log("country has changed");
                    formCountry.append(data, this.artist_data[data]);
                }}
            await this.$axios.$patch("/v1/artist/portfolios/"+this.usersPortfolio.username + '/', formCountry, config)
            }
            // if(this.usersPortfolio.style!=this.artist_data.style) //checking if data has changed
            // {
            // let formStyle = new FormData();
            // for (let data in this.artist_data) {
            //     if(data == 'style' || data == 'username' )
            //     {
            //         console.log("style has changed");
            //         formStyle.append(data, this.artist_data[data]);
            //     }}
            // await this.$axios.$patch("/v1/artist/portfolio/"+this.usersPortfolio.username + '/', formStyle, config)
            // }
            // if(this.usersPortfolio.introduction!=this.artist_data.introduction) //checking if data has changed
            // {
            // let formIntro = new FormData();
            // for (let data in this.artist_data) {
            //     if(data == 'introduction' || data == 'username' )
            //     {
            //         console.log("style has changed");
            //         formIntro.append(data, this.artist_data[data]);
            //     }}
            // await this.$axios.$patch("/v1/artist/portfolio/"+this.usersPortfolio.username + '/', formIntro, config)
            // }
            // if(this.usersPortfolio.quote!=this.artist_data.quote) //checking if data has changed
            // {
            // let formQuote = new FormData();
            // for (let data in this.artist_data) {
            //     if(data == 'quote' || data == 'username' )
            //     {
            //         console.log("quote has changed");
            //         formQuote.append(data, this.artist_data[data]);
            //     }}
            // await this.$axios.$patch("/v1/artist/portfolio/"+this.usersPortfolio.username + '/', formQuote, config)
            // }
            // if(this.usersPortfolio.crew!=this.artist_data.crew) //checking if data has changed
            // {
            // let formCrew = new FormData();
            // for (let data in this.artist_data) {
            //     if(data == 'crew' || data == 'username' )
            //     {
            //         console.log("crew has changed");
            //         formCrew.append(data, this.artist_data[data]);
            //     }}
            // await this.$axios.$patch("/v1/artist/portfolio/"+this.usersPortfolio.username + '/', formCrew, config)
            // }
            // if(this.usersPortfolio.ig!=this.artist_data.ig) //checking if data has changed
            // {
            // let formIg = new FormData();
            // for (let data in this.artist_data) {
            //     if(data == 'ig' || data == 'username' )
            //     {
            //         console.log("ig has changed");
            //         formIg.append(data, this.artist_data[data]);
            //     }}
            // await this.$axios.$patch("/v1/artist/portfolio/"+this.usersPortfolio.username + '/', formIg, config)
            // }
            // if(this.usersPortfolio.fb!=this.artist_data.fb) //checking if data has changed
            // {
            // let formfb = new FormData();
            // for (let data in this.artist_data) {
            //     if(data == 'fb' || data == 'username' )
            //     {
            //         console.log("fb has changed");
            //         formfb.append(data, this.artist_data[data]);
            //     }}
            // await this.$axios.$patch("/v1/artist/portfolio/"+this.usersPortfolio.username + '/', formfb, config)
            // }
            // if(this.usersPortfolio.personal!=this.artist_data.personal) //checking if data has changed
            // {
            // let formPersonal = new FormData();
            // for (let data in this.artist_data) {
            //     if(data == 'personal' || data == 'username' )
            //     {
            //         console.log("personal has changed");
            //         formPersonal.append(data, this.artist_data[data]);
            //     }}
            // await this.$axios.$patch("/v1/artist/portfolio/"+this.usersPortfolio.username + '/', formPersonal, config)
            // }
        this.$store.dispatch("check_user_portfolio");
        this.snackbar = true;
        this.$router.push("/create/about");
        },
        async deleted() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/portfolios/"+this.usersPortfolio.username, config)
                console.log("Artist portfolio deleted.");
                //update store
                this.$store.dispatch("remove_portfolio")
                this.artist_data = ''
                this.imageData = ''
                this.snackbar = true;
                this.$router.push("/create/about");
            } catch (e) {
                console.log(e);
            }
        }         
    }
}
</script>
