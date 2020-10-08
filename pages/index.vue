<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col >
          <div align="center" justify="center" class="mx-12 my-8" width="50%">
            <img src = "~/assets/pencil_art2.png"  width="100%" alt="In My Groove logo">
          </div>
        </v-col>
        <v-col md="6" offset-md="-4">
          <div align="center" justify="center" class="mx-12 mb-6" align-content="center">
              <div class="mb-5 font-weight-bold">Pass The HipHop (PATH)</div>
              <hr><br><br><br>
              <div class="font-weight-light text-center ma-0">
                "Pass The HipHop" a.k.a PATH, is a community platform to celebrate the "Each 1 Teach 1" legacy of the HipHop culture.
                 Here we can acknowledge all those HipHop artists who passed their knowledge, skill and experience to make us better 
                 at our own craft. You can tag and appreciate your teachers & peers and let them know how much their words and teachings meant to you in your own journey.
                 similarly you will have a complete database of all your students and peers who learned something from you when they tag you.              
                 Let's connect HipHop a little more, share it a little more...Together.
              </div>
          </div>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col align="center" justify="center" >
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3">
                      <v-card class = "ma-1 pa-1 grey lighten-5" :elevation="hover ? 6 : 0"  min-width="180" max-height="260">
                        <img src = "~/assets/art1.jpeg"  width="100%" alt="portfolio logo"></img>
                      </v-card>
                      <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/artists'>Artists & Community</v-btn>                                     
                    </v-col>            
              </v-row>                    
        </v-col>
        <v-col align="center" justify="center" >
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3">
                      <v-card class = "ma-1 pa-1 grey lighten-5" :elevation="hover ? 6 : 0"  min-width="180" max-height="260">
                        <img src = "~/assets/portfolio.png"  width="100%" alt="portfolio logo"></img>
                      </v-card>   
                      <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/create'>create your website</v-btn>                                  
                    </v-col>            
              </v-row>                    
          </v-col>
        <v-col align="center" justify="center" >
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3">
                      <v-card>
                        <img src = "~/assets/each1teach1.jpeg"  width="100%" alt="portfolio logo"></img>
                      </v-card>
                      <v-btn  class="mx-3 text-decoration-none white elevation-0" medium :to= "`/create/each1teach1/`">Connect with your peers</v-btn>                                     
                    </v-col>            
              </v-row>                    
        </v-col>
        <v-col align="center" justify="center" >
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3">
                      <v-card>
                        <img src = "~/assets/blogimg.png"  width="100%" alt="portfolio logo"></img>
                      </v-card>
                      <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/artists'>culture blogs</v-btn>                                     
                    </v-col>            
              </v-row>                    
          </v-col>
      </v-row>

      <div align="center" justify="center" class="mb-6"> 
        <!--<div class="text-center xs12">                                                                                                                                                                                                                                                                                                                                         
            <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/artists'>find artists</v-btn>
            <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/create'>create your own website</v-btn>
            <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/blogs'>community blogs</v-btn>
        </div>-->                                                            
      </div>    
      <v-divider set="inset"></v-divider>
    </v-container>
  </v-app>     
</template>

<script>
var i = 0;

export default {

  head() {  //head function (a property of vue-meta), returns an object
    return {
      title: 'Home Page',
}
}
}
//https://stackoverflow.com/questions/57800048/how-to-enable-dark-mode-with-custom-colors-in-light-theme-in-vuetify
//You know that you have a groove that no other dancer has in this 
         // world. We all have our grooves. It is our identity as dancers.
         // When you dance someone connects deeply with you without your notice. 
         // When you teach, a part of you lives in their dance. we are all unique
          //yet connected.This is how Hip Hop connects, through sharing. Each One Teach One. "In My Groove" is an effort to connect us 
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