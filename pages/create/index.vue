<template>
  <v-container>
      <v-row no-gutters>
        <v-col md='9'>
          <video width="90%" autoplay>
            <source src="~/assets/goku_vid.mp4" type="video/mp4">
          Your browser does not support the video tag.
          </video>
          <!-- <img src = "~/assets/goku.png"  width="40%" alt="In My Groove logo"> -->
        </v-col>
        <v-col md='3'>
          <div>
            <v-layout justify-center>
                <v-flex xs6>
                    <div class="text-xs-center mt-6" align = "center">
                      <h5 v-if="!userHasPortfolio" >Let's build your portfolio first.</h5>
                      <v-btn v-if="!userHasPortfolio" rounded outlined color="indigo" class=" text-decoration-none" :to= "`/create/about/`">Start Building</v-btn>
                      <v-btn v-else rounded outlined color="indigo" class=" text-decoration-none mt-8" :to= "`/create/about/`">Edit here</v-btn>
                    </div>
                </v-flex>
            </v-layout>
            <!-- <h2 text class="mb-5 font-weight-bold" >Yo, What's up !! </h2> -->
            <!-- <div text class="mb-5">
              I am Goku, 12 year old dancer and InMyGroove mascot.</div> -->
            <!--<div text class="mb-5 font-weight-thin">
              I am young and learning, but I can dance well and even battle u,
              coz I am dope, because my teachers are the dopest.
            </div>-->
            <!-- <h5 text class="mb-5">
              You can join the InMyGroove community, and share your work/experience of
              your dance journey. 
              To build your own webpage just click on "Start Building" and get started!
            </h5>
            <hr>
            <div text class="mb-5 font-weight-bold">btw, let's get down sometime.</div> -->
            <!-- <div >
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark rounded color="#e6d5b8" class="mr-2 text-decoration-none" v-bind="attrs" v-on="on"> Check me out </v-btn>
              </template>

              <v-card>
                <img src = "~/assets/goku.png"  width="50%" alt="In My Groove logo">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#1c2b2d" text @click="dialog = false">
                    Cool
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div> -->
          </div>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
export default {
    middleware : 'auth',
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
        ...mapGetters(['usersPortfolio', 'userHasPortfolio'])
    },
    mounted() {
    this.$store.dispatch("check_user_portfolio");
  },
}
</script>
<style scoped>
</style>