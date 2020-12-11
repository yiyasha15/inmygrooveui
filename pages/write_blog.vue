<template>
    <v-app>
        <v-container class="ma-24">
        <div>
            <h5>Write a blog for the community.</h5>
            <div>Let's share our history, experience, dance philosophies, 
                thoughts, stories and fun event memories.</div>
            <br>
            <vue-editor v-model="content"/>
            <!-- <VueEmoji @input="onInput" :value="myText" />  -->
            <v-btn class="text-decoration-none mt-6" rounded color="indigo" dark >Post</v-btn>
        </div>
        <!-- <div>
            {{content}}
        </div> -->
        </v-container>
    </v-app>
</template>

<script>
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";
import VueEmoji from 'emoji-vue'
import vuex from 'vuex'
export default {
    // layouts:'blogHeader'
    components: 
    { 
        VueEditor,
        VueEmoji 
    },
    methods: {
      onInput(event) {
          //event.data contains the value of the textarea
      }
  },
    data: () => ({
    content: "Write a blog for the community."
    }) 
}

</script>