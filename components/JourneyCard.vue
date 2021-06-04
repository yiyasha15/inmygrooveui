<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      @click="dialog= true" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="160" 
    >
      <v-img
        v-if = journey.jophoto :src = "journey.jophoto" 
        :lazy-src= "journey.jophoto" 
        class="grey lighten-2 white--text"
        height="100"
        width="160"
      />
      <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-container class="rounded-lg white">
        <v-col cols="12" align="end" justify="end">
        <v-btn icon color="error" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-col>
        <v-row class="ma-4">
          <v-col cols="12" md="6" align="center" justify="center">
            <v-row>
              <v-img :src="journey.jophoto" class="centerImage" width="80%" max-height="480px"/>
            </v-row>
              <!-- <v-row class="pa-4">
              <v-spacer></v-spacer>
              <v-btn v-if="journey.jolink" icon color="indigo" @click="openlink">
                <v-icon>mdi-link</v-icon>
              </v-btn>
            </v-row> -->
          </v-col>
          <v-col cols="12" md="6" class="pl-6">
            <v-row class="px-4">
                <h4>{{journey.joevent}}</h4> 
                <v-spacer></v-spacer>
              <v-btn v-if="journey.jolink" icon color="indigo" @click="openlink">
                <v-icon>mdi-link</v-icon>
              </v-btn>
              
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                    v-on="on">
                    <v-icon v-if="journey.isprivate" class="pl-2 float-right" small>mdi-lock</v-icon>
                </v-btn>
                </template>
                <span>This is your private post.</span>
              </v-tooltip>

            </v-row>
            <v-row class="px-4">
              <p class="caption">{{journey.jodate}}</p>
            </v-row>
            <v-row class="pa-4 ">
              <p><nuxt-link :to="'/'+ journey.username"><b>{{journey.username}}</b> </nuxt-link> {{journey.jocontent}}</p>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
    <!-- <v-card-subtitle>
      {{ artist.artist_name }} <country-flag size=small :country= 'artist.country' />
    </v-card-subtitle> -->
      <v-card-actions >
        <div width="100" class="text-decoration-none caption" style="max-width: fit-content; height:2em; overflow:hidden">
        {{ journey.joevent }} 
        </div>
        <v-spacer></v-spacer>
        <v-icon v-if="journey.isprivate" class="pl-2 float-right" small>mdi-lock</v-icon>
      </v-card-actions>
    </v-card>
  </v-hover>
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
        dialog: false
        }
    },
    mounted(){
      // console.log(tjos.journey);
    }
  }
</script>
<style scoped>

</style>

