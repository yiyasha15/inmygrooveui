<template>
    <v-app>
      <div>
        <v-main>
          <v-container fill-height>
              <div class="text-center font-weight-bold">{{artist.artist_name}}</div>
            <v-layout align-center justify-center>
                <v-flex xs6>
                  <div class="text-xs-center" align="center">
                    <v-btn rounded outlined class="text-capitalize" :to= "`/${artist.username}/`">About</v-btn>
                    <v-btn rounded outlined class="text-capitalize" :to= "`/${artist.username}/work`"> Work </v-btn>
                    <v-btn rounded outlined class="text-capitalize" :to= "`/${artist.username}/each1teach1`">Each 1 Teach 1 </v-btn>
                  </div>
                  <div>
                    <div v-for = "share in sharing" :key = "share.index">
                        <div v-for = "s_student in share.s_student" :key = "s_student.index">
                            <div v-if="s_student.username === artist.username">
                                <v-img :src="share.s_photo" class="centerImage" height="100px" width="100px"/>
                                <div class="text font-weight-light" v-for = "s_teacher in share.s_teacher" :key = "s_teacher.index">
                                    {{s_teacher.username}},{{s_teacher.country}}              
                                </div>
                            </div>
                        </div>                
                    </div>
                  </div>
                    
                </v-flex>
            </v-layout>
          </v-container>
        </v-main>
      </div>
    </v-app>
</template>


<script>
export default {
    //props:['artist']
    props: {
        artist: Object,
        sharing: Object
    },
}
</script>

<style>

</style>script
