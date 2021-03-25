<template>
    <v-container>
      <v-row>
        <v-col cols="12" >
          <div align="center" justify="center">
            <img src = "~/assets/bboys.jpeg" width="70%" alt="In My Groove logo">
          </div>
        </v-col>
        <v-col cols="12" >
          <div align="end" justify="end" class="mx-12 mb-12 mt-0 pt-0" align-content="center">
              <h1 class=" font-weight-bold"> Represent Right!</h1>
              <div class="mt-4" >
                <v-btn text rounded dark color="#BD3D30" class="h1 text-decoration-none elevation-none px-6 justify-end" :to= "`/artists/`">Our Community 
                <v-icon right>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
              </div>
              <hr>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" align-content="center">
        <h5 class="pa-6 font-weight-light text-center">
          At inmygroove, we... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          <!-- InMyGroove is a community platform <b>to celebrate the each one teach one legacy of the hiphop culture </b> in a meaningful way. 
          We all learn from some artists who passionately shared their dance and knowledge, may be in the studios, streets, clubs or cyphers. We hope, like us
          you too understand the value of their sharing along the way which made you a dope dancer today. Let's celebrate them and share your experiences with them.
          Eventually a new generation dancer will get to know them through you.<b> The cycle of the culture repeats and along the way comes your turn, to be celebrated by your students.</b>
          The past, present and future of each one teach one becomes one right here. You see it right. Let's make the culture even more meaningfully connected than it is today. 
          We feel that together we can acheive this hence the initiative <b>'Inmygroove', where you represent yourself, your journey and your teachers/friends/brothers/sisters
          who passed a part of their groove, a part of their soul to you.</b> -->
        </h5>
      </v-row>
      <v-row>
        <div class="mx-8 mt-12" align-content="center">
          <h1 v-if="!userHasPortfolio" class=" font-weight-bold"> Create a portfolio</h1>
          <h1 v-else class=" font-weight-bold" > Edit your portfolio 
            <!-- <v-icon right>
              mdi-arrow-right
            </v-icon> -->
          </h1>
          <div class="mt-4" >
            <v-btn text rounded dark color="#BD3D30" class="text-decoration-none elevation-none px-4 justify-end" :to= "`/create/`">Get Started
            <v-icon right>
              mdi-arrow-right
            </v-icon>
          </v-btn>
          </div>
          <hr>
      </div>
      </v-row>
      <v-row class="justify-center align-center mt-4">
        <v-col cols="12">
          <div align="center" justify="center">
          <img src = "~/assets/e1t11.jpeg"  width="80%" alt="portfolio logo">
          </div></v-col>
        <v-col cols="12">
          <div class="mx-8" align-content="center" align="center" justify="center">
          <h1 class=" font-weight-bold"> Each I Teach I</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.</p>
          <v-btn text rounded dark color="#35463A" class="mt-2 text-decoration-none elevation-none justify-end" :to= "`/e1t1/`">Each 1 Teach 1
          <v-icon right>
            mdi-arrow-right
          </v-icon></v-btn>
          </div>
        </v-col>

        <!-- <v-col cols="12" md="4"  class="pa-md-6 pa-sm-4 pa-xs-0">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 4 : 0"
                :class="{ 'on-hover': hover }" to = '/create'>
                <img src = "~/assets/portfolio.png"  width="100%" alt="portfolio logo" height="150">
                <p v-if="!userHasPortfolio" class="font-weight-light text-center py-2"> Create a portfolio</p>
                <p v-else class="font-weight-light text-center py-2"> Edit your portfolio</p>
                </v-card>
            </v-hover>
        </v-col> -->
        <!-- <v-col cols="12" md="4"  class="pa-md-6 pa-sm-4 pa-xs-0">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 4 : 0"
                :class="{ 'on-hover': hover }" to = '/e1t1'>
                <img src = "~/assets/each1teach1.jpeg"  width="100%" alt="portfolio logo" height="150">
                <p class="font-weight-light text-center py-2"> Each one Teach one</p>
                </v-card>
            </v-hover>
        </v-col> -->
    </v-row>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import vuex from 'vuex' 
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'InMyGroove Community',
        }
      },
  // mounted() {
  //   this.$store.dispatch("check_user_portfolio");
  //   this.$store.dispatch("check_user_gallery");
  //   this.$store.dispatch("check_user_highlights");
  // },
   computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio'])
    },
}
//https://stackoverflow.com/questions/57800048/how-to-enable-dark-mode-with-custom-colors-in-light-theme-in-vuetify
//You know that you have a groove that no other dancer has in this 
         // world. We all have our grooves. It is our identity as dancers.
         // When you dance someone connects deeply with you without your notice. 
         // When you teach, a part of you lives in their dance. we are all unique
          //yet connected.This is how Hip Hop connects, through sharing. Each One Teach One. 
          // "In My Groove" is an effort to connect us 
          //a little more, connect Hip Hop a little more, connect the students with their 
          //teachers and the teachers with their students a little more so that the legacy stays forever.

/*
<v-avatar width="60px" height="60px">
          <img
            src="~/assets/yiyasha.jpeg"
            alt="yiyasha"
          >
        </v-avatar>
        <v-avatar width="60px" height="60px">
          <img
            src="~/assets/river.jpeg"
            alt="yiyasha"
          >
  </v-avatar>

*/
</script>
<style scoped>
</style>