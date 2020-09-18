<template>
      <v-card width=250px height=100px class = "ma-1 pa-1" color="deep-purple accent-3"> <!-- dark -->
        <div>
            <span v-if = "!readMoreActivated"> {{thought.t_content.slice(0,10)}}></span>
            <a v-if = "!readMoreActivated" @click = "activateReadMore" href="#">read more ...</a>
            <span v-if = "readMoreActivated" v-html = "thought.t_content"></span>
        </div>
            <v-btn  icon >
              <v-icon>mdi-heart</v-icon>
            </v-btn>       
      </v-card>
</template>

<script>
    export default {
      name: 'ThoughtCard',
      props: {
        thought: Object
      },
      data() {
        return {
            //longText: "KDFNDF jhdbvkd jhvfkff jdbhvkf",
            readMoreActivated: false
        }
      },
      methods: {
        activateReadMore() {
            this.readMoreActivated = true
        },
      }
    }
</script>

