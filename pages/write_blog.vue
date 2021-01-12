<template>
    <v-app>
        <v-container class="ma-24">
            <v-row>
                <v-col cols="6">
                    <div>
                        <h5 class="font-light-weight">Write a blog for the community.</h5>
                        <div>Let's share our stories.</div>
                        <br>
                        <vue-editor v-model="content"/>
                        <!-- <VueEmoji @input="onInput" :value="myText" />  -->
                        <v-btn class="text-decoration-none mt-6" @click="post"
                        rounded color="indigo" dark >Post</v-btn>
                    </div>
                </v-col>
                <v-col cols="6">
                    <blog-card></blog-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";
import VueEmoji from 'emoji-vue'
import vuex from 'vuex'
import BlogCard from '~/components/BlogCard.vue';
export default {
    // layouts:'blogHeader'
    components: 
    { 
        VueEditor,
        VueEmoji,
        BlogCard 
    },
    methods: {
      onInput(event) {

          //event.data contains the value of the textarea
      }
    },
    methods:{
        post(){
            this.$router.push("/blogs")
        }
    },
    data: () => ({
    content: "Write a blog for the community."
    }) 
}

</script>