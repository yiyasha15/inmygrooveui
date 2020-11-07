<template>
    <v-container>
    <v-row>
      <v-col cols="12" md="8"  class="justify-center">
        <div class ="pl-6 title xs12">Community Blogs</div>
      </v-col>
      <v-col cols="12" md="4"  class= "pr-6 justify-end mb-2 px-6" >
          <v-text-field
            class="ma-0 pa-0"
            label="Search blogs"
            placeholder=""
            rounded
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          ></v-text-field>
      </v-col>
    </v-row>
    <v-layout row wrap justify-center >
          <v-flex sm6 xs6> 
            <BlogCard></BlogCard> 
          </v-flex>
    </v-layout>
      <!-- <v-layout row wrap justify-center >
        <div v-for="blogs in blogs" :key ="blogs.index">
          <v-flex sm6 xs6> 
            <BlogCard :blog="blog" ></BlogCard> 
          </v-flex>
          </div>
    </v-layout> -->
  </v-container>
</template>

<script>
import BlogCard from '@/components/BlogCard'
export default {
    components: 
    { 
        BlogCard
    },
}

</script>