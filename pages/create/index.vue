<template>
  <v-app>
      <v-container>
        <v-row no-gutters>
          <v-col md="6" offset-md="3">
            <v-row>
              <v-col>
                <img src = "~/assets/goku.png"  width="80%" alt="In My Groove logo">
              </v-col>
              <v-col>
                <div align-center justify-center>
                  
                  <div text class="mb-5 font-weight-bold" >Yo, What's up !! </div>
                  <div text class="mb-5 font-weight-light">
                    I am Goku, 12 year old dancer and InMyGroove mascot.</div>
                  <!--<div text class="mb-5 font-weight-thin">
                    I am young and learning, but I can dance well and even battle u,
                    coz I am dope, because my teachers are the dopest.
                  </div>-->
                  <div text class="mb-5 font-weight-light">
                    but before, let's make your website.
                    just click on "Start Building" and get started.
                  </div>
                  <hr>
                  <div text class="mb-5 font-weight-bold">btw, let's get down sometime.</div>
                  <!--<v-btn xs6 rounded outlined color="error">Check me out!</v-btn>-->
                  <div >
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                      >
                        Check me out
                      </v-btn>
                    </template>

                    <v-card>
                      <img src = "~/assets/goku.png"  width="50%" alt="In My Groove logo">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="dialog = false"
                        >
                          Cool
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-main>
        <v-container fill-height>
          <v-layout justify-center>
              <v-flex xs6>
                  <div class="text-xs-center" align = "center">
                    <v-btn class="elevation-0 white text-decoration-none" :to= "`/create/about/`">Start Building</v-btn>
                    <v-btn class="elevation-0 white text-decoration-none">Edit here</v-btn>
                  </div>
              </v-flex>
          </v-layout>
          
        </v-container>
      </v-main>
  </v-app>
</template>

<script>
export default {
 data () {
      return {
        dialog: false,
      }
    },
}
</script>

<style>

</style>template