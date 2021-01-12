<template>
  <v-card class="ma-2 " max-width="270" >
      <div v-if = moments.m_clip>
        <video width="270" height="200" controls>
            <source :src="moments.m_clip" type="video/mp4" class="centerImage">
            Your browser does not support the video tag.
        </video>
        <v-card-title>
        <h6>{{moments.m_artist}}</h6>
        </v-card-title>
        <v-overlay :z-index="2" :value="overlay" >
          <v-container class="rounded-lg black" >
            <v-col cols="12" align="end" justify="end">
            <v-btn icon color="error" @click="overlay = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-col>
            <v-row>
                <v-col cols="12" md="8" align="center" justify="center">
                    <video width="800" height="450" controls>
                        <source :src="moments.m_clip" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </v-col>
            </v-row>
            <v-row class="pa-4 my-4 mx-8">
                    <v-btn icon color="orange" @click="snackbar = true">
                      <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="moments.m_link" icon color="indigo" @click="openlink">
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </v-row>
        </v-container>
        </v-overlay>
        <v-card-actions>
        <v-btn color="orange" icon @click="snackbar = true">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="moments.m_link" icon color="indigo" >
            <v-icon>mdi-link</v-icon>
          </v-btn>
          <v-btn @click="overlay = !overlay" icon>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-card-actions>
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
      moments: Object,
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
    methods:{
      openlink(){
        var url = this.judging.jw_link;
        var win = window.open(url, '_blank');
        win.focus();
      }
    },
    mounted(){
      // console.log(this.moments);
    }
  }
</script>

