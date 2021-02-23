<template>
  <v-card 
      class="ma-2 "
      max-width="270" >
      <div v-if = journey.jophoto>
        <v-img :src="journey.jophoto" class="centerImage" height="180px"/>
        <v-card-title v-if = journey.jocontent>
        <h6>{{journey.jocontext}}</h6>
        </v-card-title>
        <v-card-actions>
        <v-overlay :z-index="2" :value="overlay" >
          <v-container class="rounded-lg black" >
            <v-col cols="12" align="end" justify="end">
            <v-btn icon color="error" @click="overlay = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-col>
            <v-row class="ma-4">
                <v-col cols="12" md="6" align="center" justify="center">
                    <v-img :src="journey.jophoto" class="centerImage mb-6" width="80%" max-height="480px"/>
                </v-col>
                <v-col cols="12" md="6" class="pl-6">
                  <v-row class="pt-2 pr-4">
                    <p>{{journey.jodate}}</p>
                  </v-row>
                  <v-row class="py-4 pr-4">
                      <h4>{{journey.jocontext}}</h4>
                  </v-row>
                  <v-row class="py-4 pr-4">
                    <p>{{journey.username}}: {{journey.jocontent}}</p>
                  </v-row>
                  <v-row class="py-4 pr-4">
                    <!-- <v-btn icon color="orange" @click="snackbar = true">
                      <v-icon>mdi-heart-outline</v-icon>
                    </v-btn> -->
                    <v-spacer></v-spacer>
                    <v-btn v-if="journey.jolink" icon color="indigo" @click="openlink">
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
            </v-row>
        </v-container>
        </v-overlay>
        <!-- <v-btn color="orange" icon @click="snackbar = true">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn v-if="journey.jolink" icon color="indigo" @click="openlink" >
            <v-icon>mdi-link</v-icon>
          </v-btn>
          <v-btn @click="overlay = !overlay" icon>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <!-- <v-btn icon @click="show = !show" v-if = journey.jocontext>
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn> -->
        </v-card-actions>
        <!-- <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
                {{journey.jocontext}}
            </v-card-text>
          </div>
        </v-expand-transition> -->
        <!-- <div class="text font-weight-bold" v-if = journey.jocontent>
          {{journey.jocontent}}
        </div>
        <div class="text font-weight-light" v-if = journey.jocontext>
          {{journey.jocontext}}
        </div> -->
        
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
      </div>  
  </v-card>
  
</template>

<script>
  export default {
    props: {
      journey: Object,
    },
    methods:{
      openlink(){
        var url = this.journey.jolink;
        var win = window.open(url, '_blank');
        win.focus();
      }
    },
    data() {
      return {
        show: false,
        overlay: false,
        zIndex: 0,
        snackbar: false,
        text: `Cheers!`,
        }
    },
    mounted(){
      // console.log(tjos.journey);
    }
  }
</script>

