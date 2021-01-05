<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div align="center" justify="center" class="mx-12 my-8">
            <img src = "~/assets/art1.jpeg"  width="90%" alt="In My Groove logo">
          </div>
        </v-col>
        <v-col cols="12" md="6" offset-md="-4">
          <div align="center" justify="center" class="mx-12 mb-12" align-content="center">
              <h1 class="my-6 font-weight-bold"> In My Groove</h1>
              <hr><br>
              <div class="font-weight-light text-center ma-0">
                 <h5>for all of us, who do the hiphop culture right.</h5>
              </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" align-content="center">
        <h5 class="pa-6 font-weight-light text-center">
          InMyGroove is a community platform <b>to celebrate the each one teach one legacy of the hiphop culture </b> in a meaningful way. 
          We all learn from some artists who passionately shared their dance and knowledge, may be in the studios, streets, clubs or cyphers. We hope, like us
          you too understand the value of their sharing along the way which made you a dope dancer today. Let's celebrate them and share your experiences with them.
          Eventually a new generation dancer will get to know them through you.<b> The cycle of the culture repeats and along the way comes your turn, to be celebrated by your students.</b>
          The past, present and future of each one teach one becomes one right here. You see it right. Let's make the culture even more meaningfully connected than it is today. 
          We feel that together we can acheive this hence the initiative <b>'Inmygroove', where you represent yourself, your journey and your teachers/friends/brothers/sisters
          who passed a part of their groove, a part of their soul to you.</b>
        </h5>
      </v-row>
      <v-row>
        <v-col cols="6" md="3" class="pa-md-8 pa-sm-4 pa-xs-0">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }" to = '/artists'>
                <img src = "~/assets/pencil_art2.png" width="100%" alt="portfolio logo" height="140">
                <p class="font-weight-light text-center "> Our community</p>
                </v-card>
            </v-hover>
        </v-col >
        <v-col cols="6" md="3"  class="pa-md-8 pa-sm-4 pa-xs-0">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }" to = '/create'>
                <img src = "~/assets/portfolio.png"  width="100%" alt="portfolio logo" height="140">
                <p class="font-weight-light text-center"> Create a portfolio</p>
                </v-card>
            </v-hover>
        </v-col>
        <v-col cols="6" md="3"  class="pa-md-8 pa-sm-4 pa-xs-0">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }" to = '/e1t1'>
                <img src = "~/assets/each1teach1.jpeg"  width="100%" alt="portfolio logo" height="140">
                <p class="font-weight-light text-center"> Each one Teach one</p>
                </v-card>
            </v-hover>
        </v-col>
        <v-col cols="6" md="3"  class="pa-md-8 pa-sm-4 pa-xs-0">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }" to = '/blogs'>
                <img src = "~/assets/blogimg.png"  width="100%" alt="portfolio logo" height="140">
                <p class="font-weight-light text-center"> Blogs</p>
                </v-card>
            </v-hover>
        </v-col>
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
  //   this.$store.dispatch("check_user_work");
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