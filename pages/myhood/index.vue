<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8"  class="justify-center">
        <h4 class ="pl-6 my-4 font-weight-light xs12">Our Community</h4>
      </v-col>
      <v-col cols="12" md="4"  class= "pr-6 justify-end mb-2 px-6" >
        <v-text-field
          class="ma-0 pa-0"
          label="Search rooms"
          placeholder=""
          rounded
          solo
          prepend-inner-icon="mdi-magnify"
          v-model="search">
        </v-text-field>
      </v-col>
    </v-row>
      <v-btn text color="indigo" class="mt-2 mb-6 text-decoration-none justify-end" dark @click="make_a_room">
      <v-icon class="px-2">mdi-account-multiple-plus-outline</v-icon>Make a room</v-btn>
    <v-layout row wrap justify-center >
      <!-- <div v-for="room in myhood" :key ="myhood.index">
        <v-flex sm6 xs6> 
            <myhood-card :e1t1="teacher"></myhood-card>
        </v-flex>
      </div> -->
    </v-layout>
  </v-container>
</template>
<script>
import MyhoodCard from '@/components/MyhoodCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
      title: 'My Hood -InMyGroove',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'List of artists rooms - InMyGroove Community'
        }
      ]
    }
  },
  async asyncData({error}) {
    try {
      const response = await EventService.getEach1Teach1s()
      return {
        teachers: response.data
      }
    } catch (e) {
        error({statusCode:503, message: "unable to fetch teacher data at this point"})
    }
  },
  components: {
    MyhoodCard
  },
  data() {
    return {
      search: ""
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    filteredteachers: function(){
      return this.teachers.filter((teacher) => {
        return teacher.s_teacher.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods:{
    make_a_room(){
      this.$store.dispatch("remove_myhood_obj")
      this.$router.push('/create/myhood/')
    }
  }
  // layout: 'e1t1'
}
</script>
