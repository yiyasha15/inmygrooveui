<template>
  <v-container>
      <v-row no-gutters>
        <v-col cols="12" md='6'>
          <div align="center" justify="center" class="mx-12 my-8">
            <img src = "~/assets/goku.png"  width="60%" alt="In My Groove logo">
          </div>
         </v-col>
        <v-col cols="12" md='6'>
          <div>
            <div v-if="!userHasPortfolio" class="ma-8">
              <h2 class="font-weight-light">How to get started?</h2>
              <h6 class="font-weight-light mb-8">Yo! <b class="text-capitalize">
                {{loggedInUser.username}}
                </b>, so glad that you're joining the <b>InMyGroove
                community</b>, we have a basic template laid out for you. Please follow these steps.
              </h6>
              <h6 class="font-weight-light">1. Fill the form according to the guidelines provided on each page. All these combined make up your portfolio. </h6>
              <h6 class="font-weight-light">2. <b>About Page.</b> Give a name other artists know you by.</h6>
              <h6 class="font-weight-light">3. <b>Bio Page.</b> Share about yourself and your social presence. </h6>
              <h6 class="font-weight-light">4. <b>Gallery Page.</b> Upload four beautiful images.</h6>
              <h6 class="font-weight-light">5. <b>Highlights Page.</b> Share some of your profound memories.</h6>
              <h6 class="font-weight-light">6. <b>Judging/Workshops Page.</b> Share about your workshop and judging experiences.</h6>
              <h6 class="font-weight-light">7. <b>Events Page.</b> Share about the events you have attended.</h6>
              <h6 class="font-weight-light mt-8">We understand that gathering all these memories, will take some time, but memories eventually fade away 
                but the shared ones will be here to stay. So, years down the lane we hope you have a smile on your face 
                looking back at the journey. Okay, let's get started.
              </h6>
              <div class="mt-6" >
                <v-btn rounded dark color="indigo" class="text-decoration-none" :to= "`/create/about/`">Get Started</v-btn>
              </div>
            </div>
            <div v-else class="ma-8">
              <h1 class="font-weight-light">How to edit portfolio?</h1>
              <h5 class="mt-4 font-weight-light">Hi {{loggedInUser.username}}, <br>Let's edit your portfolio follow these steps.
              </h5>
              <div class="mt-6" >
                <v-btn rounded dark color="indigo" class="text-decoration-none" :to= "`/create/about/`">Edit</v-btn>
              </div>
            </div>
            
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
    middleware : 'check_auth',
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
        ...mapGetters(['usersPortfolio', 'userHasPortfolio', 'loggedInUser'])
    },
    mounted() {
    this.$store.dispatch("check_user_portfolio");
  },
}
</script>
<style scoped>
</style>