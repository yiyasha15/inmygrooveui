<template>
    <v-app>
        <div>
            <nuxt-child :artist="artist"/>
        </div>
        <v-row>
            <v-col :class="{'mx-6': $vuetify.breakpoint.smAndDown, 'mx-16': $vuetify.breakpoint.mdAndUp}">
                <div class="font-weight-light display-1">{{artist.artist_name}}</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <v-layout align-center justify-center >
                    <v-flex>
                        <div class="px-6">
                          <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/`">About</v-btn>
                          <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/work`"> Work </v-btn>
                          <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/each1teach1`">Each 1 Teach 1 </v-btn>
                        </div>
                        <!--Conditional Template Rendering-->
                        <!--https://forum.vuejs.org/t/check-if-variable-is-set-v-if/12738-->
                    </v-flex>
                </v-layout>
            </v-col>
        </v-row>
        <!--<v-container class="grey lighten-5">--> <!--gives that shady rectangular boundary around the component-->
            <div>
                <v-row >            
                    <v-col md="6" offset-md="3">
                        <br>
                        <h5>Biography</h5>
                        <h4  class="mb-5 font-weight-light">{{ artist.biography }}</h4>
                    </v-col>            
                </v-row>
            </div>            
        <!--</v-container>-->
        
    </v-app>
</template>

<script>
export default {
    props: ['artist'],
    components: {
    },
}
/*
<v-container full-width>
                 <v-row align="center" justify="center">
                 <v-col cols="12" md="6">
                 <h3>something</h3>
                 <h4>something too</h4>
                 </v-col>
                 </v-row>
</v-container>

<div>
                        
    <img src = "~/assets/ba3.gif" width="30%" alt="Artist movement gif" class="center"></img>                        
    <img src = "~/assets/ba2.gif" width="30%" alt="Artist movement gif" class="center"></img>                                                
    <img src = "~/assets/ba3.gif" width="30%" alt="Artist movement gif" class="center"></img>
                                    
</div>
*/
</script>
