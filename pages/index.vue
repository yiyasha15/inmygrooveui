<template>
  <div>
    <center>
      <!-- for mobile -->
       <v-img
        class="hidden-md-and-up "
        height="250"
        :src="require('@/assets/bboys.jpeg')"
        >
       </v-img>
       <v-container class="hidden-md-and-up mr-4">
        <div align="end" justify="end" >
            <h2 > Represent Right!</h2>
            <div class="mt-2" >
              <v-btn large rounded dark color="#BD3D30" 
              class="text-decoration-none elevation-none px-4 justify-end" 
              :to= "`/artists/`"><h4>Our Community </h4>
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
            </div>
        </div>
      </v-container>
      <!-- for desktop -->
    <v-img
    class="hidden-sm-and-down"
    width="80%"
    :src="require('@/assets/bboys.jpeg')"
    >
    <v-layout
        align-center
        fill-height
      >
      <v-col>
        <v-row class="align-center
        justify-end">
        <h1 class=" font-weight-bold"> Represent Right!</h1></v-row>
        <v-row class="align-center
        justify-end">  
          <v-btn large rounded dark color="#BD3D30" class="text-decoration-none elevation-none px-6" :to= "`/artists/`"><h3>Our Community </h3>
          <v-icon right>
            mdi-arrow-right
          </v-icon>
        </v-btn>
        </v-row>
      </v-col>
    </v-layout>
      
     <!-- <div class="justify-end align-end">
        <h1 class=" font-weight-bold"> Represent Right!</h1>
        <div class="mt-4" >
          <v-btn large rounded dark color="#BD3D30" 
          class="text-decoration-none elevation-none px-6" 
          :to= "`/artists/`"><h3>Our Community </h3>
          <v-icon right>
            mdi-arrow-right
          </v-icon>
        </v-btn>
        </div>
     </div> -->
    </v-img>
    </center>
    <v-container>
      <v-row align="center" justify="center" align-content="center" class="ma-md-12 my-8" grey >
        <h3 class="px-6 text-center">
          At inmygroove, you can document your HipHop journey & stay connected
          to some of the people who matter the most, your teachers and students in this culture,
          the people who show you the way and the people whom you show it.
          <!-- InMyGroove is a community platform <b>to celebrate the each one teach one legacy of the hiphop culture </b> in a meaningful way. 
          We all learn from some artists who passionately shared their dance and knowledge, may be in the studios, streets, clubs or cyphers. We hope, like us
          you too understand the value of their sharing along the way which made you a dope dancer today. Let's celebrate them and share your experiences with them.
          Eventually a new generation dancer will get to know them through you.<b> The cycle of the culture repeats and along the way comes your turn, to be celebrated by your students.</b>
          The past, present and future of each one teach one becomes one right here. You see it right. Let's make the culture even more meaningfully connected than it is today. 
          We feel that together we can acheive this hence the initiative <b>'Inmygroove', where you represent yourself, your journey and your teachers/friends/brothers/sisters
          who passed a part of their groove, a part of their soul to you.</b> -->
        </h3>
      </v-row>
      <v-row>
        <v-sheet 
            class="mt-5 mx-auto"
            min-width="50"
        >
            <v-slide-group v-model="model" show-arrows center-active>
              
              <!-- <template v-slot:next>
            <v-icon color="orange" large>mdi-hand-pointing-right</v-icon>
          </template>
              <template v-slot:prev>
            <v-icon color="orange" large>mdi-hand-pointing-left</v-icon>
          </template> -->
                <v-slide-item v-for="(slide, i) in slides" :key="i" v-slot="{ toggle }">
                    <v-card width="600" height="400" class="ma-4" @click="toggle">
                        <v-card-title>
                            <v-img width="500" contain :src="slide.image"></v-img>
                        </v-card-title>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
            <v-expand-transition>
            <v-sheet
              v-if="model != null"
              height="200"
              tile
            >
              <v-row
                class="fill-height my-4 mx-12"
                align="center"
                justify="center"
              >
                <h3 v-if="model==0">
                  Check out the community of dancers around the world.
                </h3>
                <h3 v-if="model==1" >
                  Represent yourself!
                </h3>
                <h3 v-if="model==2" >
                  Share your dance journey and highlights.
                </h3>
                <h3 v-if="model==3" >
                  Mention your teachers and let them know you've learnt from them.
                </h3>
                <h3 v-if="model==4" >
                  Let's build the community stronger.
                </h3>
                
              </v-row>
            </v-sheet>
          </v-expand-transition>
        </v-sheet>
      </v-row>
      <v-row class="justify-center align-center mt-12">
        <h2 v-if="!userHasPortfolio">Ready to start?</h2>
      </v-row>
        <v-row class="justify-center align-center my-6" mb-6>
            <v-btn v-if="!userHasPortfolio" large rounded dark color="#BD3D30" 
            class="text-decoration-none elevation-none px-4 justify-end" 
            :to= "`/create/`"><h4>Create a portfolio</h4>
            <v-icon right>
              mdi-arrow-right
            </v-icon>
          </v-btn>
          <v-btn v-else large rounded dark color="#BD3D30" 
            class="text-decoration-none elevation-none px-4 justify-end" 
            :to= "`/create/`"><h4>Edit your portfolio</h4>
            <v-icon right>
              mdi-arrow-right
            </v-icon>
          </v-btn>
      </v-row>
      <v-row class="justify-center align-center mt-16">
        <v-col cols="12" md="6">
          <div align="center" justify="center">
          <img src = "~/assets/e1t11.jpeg"  width="100%" alt="portfolio logo">
          </div></v-col>
        <v-col cols="12" md="6">
          <div class="mx-8" align="left" justify="left">
          <h1 class=" font-weight-bold"> Each 1 Teach 1</h1>
          <h4 class="font-weight-light mt-2">we celebrate the 'EACH 1 TEACH 1'
            legacy of the hiphop culture and it starts with you,
            who represents the culture right.</h4>
          <v-btn large dark rounded color="#35463A" class="mt-4 text-decoration-none elevation-none" :to= "`/create/each1teach1/`"><h4>Get started</h4>
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
      <v-row class="justify-center align-center mt-16">
        <!-- <p>The vision is to document the flow of knowledge from the origin to the future so that the history stays true and the people are given due credits for their sharing and passing the knowledge. In the process, we hope that together we can strengthen our bonds with our fellow artists and empower the culture even more.</p> -->
          <v-col cols="12">
            <div class="caption mx-8 mt-8" align-content="center" align="center" justify="center">
              <h1 align="center" justify="center" >Our Vision</h1><br>
            <p>The vision is to document the flow of knowledge from the origin to the 
              future so that the history stays true and the people are given due credits 
              for their sharing and passing the knowledge. In the process, we hope that 
              together we can strengthen our bonds with our fellow artists and empower 
              the culture even more.</p>
            </div>
          </v-col>
      </v-row>
    </v-container>
  </div>
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
    data(){
      return {
        model: null,
        slides: [
        {
          image: require('@/assets/comm.png'),
          cap: " Check out the community of dancers around the world."
        },
        {
          image: require('@/assets/rr.png'),
          cap: " Represent yourself!"
        },
        {
          image: require('@/assets/portfolio.png'),
          cap: " Share your dance journey and highlights. "
        },
        {
          image: require('@/assets/highlights.png'),
          cap: " Mention your teachers and let them know you've learnt from them."
        },
        {
          image: require('@/assets/e1t1.png'),
          cap: " Let's build the community stronger."
        }
      
    ]
        // images: [
        //   { alt: "Our community", src: require("@/assets/community.jpg") },
        //   { alt: "Represent yourself", src: require("@/assets/represent.jpg") },
        //   { alt: "Your journey", src: require("@/assets/yourjourney.jpg") },
        //   { alt: "Share", src: require("@/assets/images/sharejpg") },
        // ]
      }
    }
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