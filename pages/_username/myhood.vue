<template>
    <v-container>
        <v-row>
        <v-col cols="12" md="8"  class="justify-center">
            <h4 class ="pl-6 my-4 font-weight-light xs12">My hood</h4>
        </v-col>
        </v-row>
        <v-btn text color="indigo" class="mt-2 mb-6 text-decoration-none justify-end" dark @click="make_a_room">
        <v-icon class="px-2">mdi-account-multiple-plus-outline</v-icon>Make a room</v-btn>
        <v-layout row wrap justify-center >
        <div v-for="rooms in myhood" :key ="rooms.index">
            <v-flex sm6 xs6> 
                <myhood-card :myhood= rooms></myhood-card>
            </v-flex>
        </div>
        </v-layout>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import MyhoodCard from "@/components/MyhoodCard.vue"
import vuex from 'vuex'
export default {
    methods:{
    make_a_room(){
      this.$store.dispatch("remove_myhood_obj")
      this.$router.push('/create/myhood/')
    }
    },
    props:{
        myhood: Object //async
    },
    components:{
        MyhoodCard
    },
    
}
</script>