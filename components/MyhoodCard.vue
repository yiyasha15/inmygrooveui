<template>
<v-hover>
  <template v-slot="{ hover }" >
  <v-card class = "ma-1 pa-1 grey lighten-5"
   :elevation="hover ? 6 : 1" :to="'/' + myhood.id" 
   min-width="240" max-height="220">
    <v-container align="center">
        <div>
          <div v-if = myhood.photo>
              <v-img :src = "myhood.photo" width="210px" height="140px"/>
          </div>
          <!-- v-img covers larger area than only img tag -->
          <!-- <v-card-title color = "black" x-small>{{event.title}}</v-card-title> -->
          <v-card-actions>
            <div class="text-decoration-none" width="230px">
            {{ myhood.room_name }}
            </div>
            <v-spacer></v-spacer>
            <div class="text-decoration-none" >
            {{ myhood.people.length }}
            </div>
            </v-card-actions>
        </div>
    </v-container>
  </v-card>
  </template>
</v-hover>
</template>

<script>
    export default {
      name: 'Myhood Card',
      props: {
        myhood: Object
      },
      }
</script>

