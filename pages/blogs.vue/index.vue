<template>
    <v-container>
      <v-row>
          <div class ="pl-6 title mt-2">Community Blogs</div>
        <v-spacer></v-spacer>
          <v-btn v-if="$auth.loggedIn" class="text-decoration-none mt-2 mx-6  pa-4" rounded color="indigo" dark 
          to="/write_blog" >Write a post</v-btn>
      </v-row>
      <v-layout row wrap class="mt-6 ml-4" >
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