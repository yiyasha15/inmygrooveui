<template>
  <v-card @click="dialog= true" class="d-inline-block mx-2">
    <v-row justify="space-between">
      <v-col cols="auto">
        <v-img :src="highlights.hiphoto" height="200" width="200"/>
      </v-col>
    </v-row>
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
                  <v-img :src="highlights.hiphoto" class="centerImage" width="80%" max-height="480px"/>
                </v-row>
                  <v-row class="pa-4">
                  <v-spacer></v-spacer>
                  <v-btn v-if="highlights.hilink" icon color="indigo" @click="openlink">
                    <v-icon>mdi-link</v-icon>
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" class="pl-6">
                <v-row class="px-4 pt-4">
                    <h4>{{highlights.hicontext}}</h4> 
                    <v-spacer></v-spacer>
                  <v-btn v-if="highlights.hilink" icon color="indigo" @click="openlink">
                    <v-icon>mdi-link</v-icon>
                  </v-btn>
                </v-row>
                <v-row class="px-4">
                  <p class="caption">{{highlights.hidate}}</p>
                </v-row>
                <v-row class="pa-4 ">
                  <p><nuxt-link :to="'/'+ highlights.username"><b>{{highlights.username}}</b> </nuxt-link> {{highlights.hicontent}}</p>
                </v-row>
              </v-col>
          </v-row>
      </v-container>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="error"
          icon
          v-bind="attrs"
          @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    props: {
      highlights: Object,
    },
    methods:{
      openlink(){
        var url = this.highlights.hilink;
        var win = window.open(url, '_blank');
        win.focus();
      }
    },
    data() {
      return {
        dialog: false,
        snackbar: false,
        text: `Cheers!`,
        }
    },
    mounted(){
      // console.log(this.highlights);
    }
  }
</script>

