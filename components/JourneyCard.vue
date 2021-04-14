<template>
<v-hover>
  <template v-slot="{ hover }" >
  <v-card @click="dialog= true" :elevation="hover ? 8 : 2" 
   class="d-inline-block mx-2" max-width="200">
    <v-img :src="journey.jophoto" height="200" />
    <!-- <v-row justify="space-between">
      <v-col>
        <v-img :src="journey.jophoto" height="200" width="200"/>
      </v-col>
    </v-row> -->
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
              <v-row class="pa-4">
              <v-spacer></v-spacer>
              <v-btn v-if="journey.jolink" icon color="indigo" @click="openlink">
                <v-icon>mdi-link</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="pl-6">
            <v-row class="px-4 pt-4">
                <h4>{{journey.joevent}}</h4> 
                <v-spacer></v-spacer>
              <v-btn v-if="journey.jolink" icon color="indigo" @click="openlink">
                <v-icon>mdi-link</v-icon>
              </v-btn>
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
  </v-card>
  </template>
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

