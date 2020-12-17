<template>
  <v-card 
      class="ma-2 "
      max-width="190" >
      <div v-if = milestone.w_photo>
        <v-img :src="milestone.w_photo" class="centerImage" height="180px"/>
        <v-card-title v-if = milestone.w_content>
        {{milestone.w_content}}
        {{milestone.w_context}}
        </v-card-title>
        <!-- <v-card-subtitle v-if = milestone.w_context>
          {{milestone.w_context}}
        </v-card-subtitle> -->
        <v-card-actions>
          <v-btn color="purple" text @click="love = !love">Love</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show" v-if = milestone.w_context>
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              <a href="milestone.w_context" target=”_blank”>{{milestone.w_context}}</a>
            </v-card-text>
          </div>
        </v-expand-transition>
        <!-- <div class="text font-weight-bold" v-if = milestone.w_content>
          {{milestone.w_content}}
        </div>
        <div class="text font-weight-light" v-if = milestone.w_context>
          {{milestone.w_context}}
        </div> -->
      </div>        
  </v-card>
</template>

<script>
    export default {
      name: 'MilestoneCard',
      props: {
        milestone: Object,
      },
      data() {
        return {
          show: false,
          love: false,
          }
      }
    }
</script>

