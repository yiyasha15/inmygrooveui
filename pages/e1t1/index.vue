<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8"  class="justify-center">
        <h4 class ="pl-6 my-4 font-weight-light xs12">Our Community</h4>
      </v-col>
      <v-col cols="12" md="4"  class= "pr-6 justify-end mb-2 px-6" >
        <v-text-field
          class="ma-0 pa-0"
          label="Search teachers"
          placeholder=""
          rounded
          solo
          prepend-inner-icon="mdi-magnify"
          v-model="search">
        </v-text-field>
      </v-col>
    </v-row>
      <v-btn text color="indigo" class="mt-2 mb-6 text-decoration-none justify-end" dark @click="addteacher">
      <v-icon class="px-2">mdi-account-multiple-plus-outline</v-icon>Share my experience</v-btn>
    <v-layout row wrap justify-center >
      <div v-for="teacher in filteredteachers" :key ="teacher.index">
        <v-flex sm6 xs6> 
            <teachers-card :e1t1="teacher"></teachers-card>
        </v-flex>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import TeachersCard from '@/components/TeachersCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
      title: 'Each One Teach One -InMyGroove',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'List of teachers tagged - InMyGroove Community'
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
    TeachersCard
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
    addteacher(){
      this.$store.dispatch("remove_share_obj")
      // this.$router.push('/createe1t1/')
      this.$router.push('/create/each1teach1/')
    }
  }
  // layout: 'e1t1'
}
</script>
