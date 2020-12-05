<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div align="center" justify="center" class="mx-12 my-8">
            <img src = "~/assets/pencil_art2.png"  width="80%" alt="In My Groove logo">
          </div>
        </v-col>
        <v-col cols="12" md="6" offset-md="-4">
          <div align="center" justify="center" class="mx-12 mb-6" align-content="center">
              <h1 class="my-6 font-weight-bold">In My Groove</h1>
              <hr><br>
              <div class="font-weight-light text-center ma-0">
                 <h3>A community platform to celebrate the "Each 1 Teach 1" legacy of the HipHop culture.</h3>
              </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3">
                      <v-hover v-slot="{ hover }">
                      <v-card :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }" 
                        to = '/artists' class = "ma-1 pa-2 grey lighten-5 " mx-auto rounded-lg elevation-3 max-width="320" height="180">
                        <img src = "~/assets/art1.jpeg" width="100%" alt="portfolio logo" height="140">
                        <v-btn small class="text-decoration-none white elevation-0">Artists & Community</v-btn>                                                           
                      </v-card>
                      </v-hover>
                    </v-col>       
              </v-row>                    
        </v-col>
        <v-col align="center" justify="center" >
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3" >
                      <v-hover v-slot="{ hover }">
                      <v-card :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }" to = '/create' class = "ma-1 pa-1 grey lighten-5" mx-auto rounded-lg elevation-3 max-width="320" height="180">
                        <img src = "~/assets/portfolio.png"  width="100%" alt="portfolio logo" height="140">
                      <v-btn small class="text-decoration-none white elevation-0 ">create your website</v-btn>                                  
                      </v-card> 
                      </v-hover>
                    </v-col>            
              </v-row>                    
          </v-col>
        <v-col align="center" justify="center" >
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3">
                      <v-hover v-slot="{ hover }">
                      <v-card :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }" :to= "`/create/each1teach1/`" class = "ma-1 pa-1 grey lighten-5" mx-auto rounded-lg elevation-3 max-width="320" height="180">
                        <img src = "~/assets/each1teach1.jpeg"  width="100%" alt="portfolio logo" height="140">
                        <v-btn small class="text-decoration-none white elevation-0" >Connect with your peers</v-btn>    
                      </v-card>
                      </v-hover>
                    </v-col>            
              </v-row>                    
        </v-col>
        <v-col align="center" justify="center" >
              <v-row no-gutters>            
                    <v-col md="10" offset-md="3">
                      <v-hover v-slot="{ hover }">
                      <v-card :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }" to = '/blogs' class = "ma-1 pa-1 grey lighten-5" mx-auto rounded-lg elevation-3 max-width="320" height="180">
                        <img src = "~/assets/blogimg.png"  width="100%" alt="portfolio logo" height="140">
                        <v-btn small class="text-decoration-none white elevation-0">Culture blogs</v-btn>
                      </v-card> 
                      </v-hover>                                    
                    </v-col>            
              </v-row>                    
          </v-col>
      </v-row>
    </v-container>
</template>

<script>
var i = 0;

export default {

  head() {  //head function (a property of vue-meta), returns an object
    return {
      title: 'InMyGroove Community',
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