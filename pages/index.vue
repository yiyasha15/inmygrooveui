<template>
  <v-app>
    <v-container>
      <div align="center" justify="center" class="mx-12 my-6" width="40%">
        <img src = "~/assets/pencil_art2.png"  width="30%" alt="In My Groove logo">
      </div>
      <div align="center" justify="center" class="mx-12 mb-6" align-content="center">
        <div class="font-weight-light text-center ma-0"> "In My Groove" is a community platform to celebrate the "each 1 teach 1" legacy of the HipHop culture.
          <br>
            Every student can appreciate her/his teachers who shared their knowledge and every teacher can find all of their students at one place.
          <br>
            Let's connect HipHop a little more, share it a little more...together.
        </div>
      </div>
      <div align="center" justify="center" class="mb-6"> 
        <div class="text-center xs12">                                                                                                                                                                                                                                                                                                                                         
            <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/artists'>find artists</v-btn>
            <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/create'>create your own website</v-btn>
            <v-btn  class="mx-3 text-decoration-none white elevation-0" medium to = '/blogs'>community blogs</v-btn>
        </div>                                                             
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