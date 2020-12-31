<template>
  <v-card 
      class="ma-2 "
      max-width="270" >
      <div v-if = milestone.w_photo>
        <v-img :src="milestone.w_photo" class="centerImage" height="180px"/>
        <v-card-title v-if = milestone.w_content>
        <h6>{{milestone.w_content}}</h6>
        </v-card-title>
        <v-card-actions>
        <v-overlay :z-index="2" :value="overlay" >
          <v-container class="rounded-lg black" >
            <v-col cols="12" align="end" justify="end">
            <v-btn icon color="error" @click="overlay = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-col>
            <v-row>
                <v-col cols="12" md="8" align="center" justify="center">
                    <v-img :src="milestone.w_photo" class="centerImage" width="50%" max-height="480px"/>
                </v-col>
                <v-col cols="12" md="4" class="pl-6">
                  <v-row>
                    <p>{{milestone.w_datetime}}</p>
                  </v-row>
                  <v-row>
                    <div class="pr-4" v-if="milestone.w_content">
                      <h4>{{milestone.w_content}}</h4>
                    </div>
                  </v-row>
                  <v-row class="py-4 pr-4">
                    <p>{{milestone.w_artist}}: {{milestone.w_context}}</p>
                  </v-row>
                  <v-row class="py-4 pr-4">
                    <v-btn icon color="orange" @click="snackbar = true">
                      <v-icon>mdi-creation</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon color="pink">
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
            </v-row>
        </v-container>
        </v-overlay>
        <v-btn color="orange" icon @click="snackbar = true">
            <v-icon>mdi-creation</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon color="pink" >
            <v-icon>mdi-link</v-icon>
          </v-btn>
          <v-btn @click="overlay = !overlay" icon>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <!-- <v-btn icon @click="show = !show" v-if = milestone.w_context>
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn> -->
        </v-card-actions>
        <!-- <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
                {{milestone.w_context}}
            </v-card-text>
          </div>
        </v-expand-transition> -->
        <!-- <div class="text font-weight-bold" v-if = milestone.w_content>
          {{milestone.w_content}}
        </div>
        <div class="text font-weight-light" v-if = milestone.w_context>
          {{milestone.w_context}}
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
      milestone: Object,
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
      // console.log(this.milestone);
    }
  }
</script>

