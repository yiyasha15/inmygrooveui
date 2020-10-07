<template>
  <v-card 
      class="ma-2 "
      max-width="190" >
      <div v-if = milestone.m_photo>
        <v-img :src="milestone.m_photo" class="centerImage" height="180px"/>
        <v-card-title v-if = milestone.m_what_happend>
        {{milestone.m_what_happend}}
        </v-card-title>
        <!-- <v-card-subtitle v-if = milestone.m_context>
          {{milestone.m_context}}
        </v-card-subtitle> -->
        <v-card-actions>
          <v-btn color="purple" text @click="love = !love">Love</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show" v-if = milestone.m_context>
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              {{milestone.m_context}}
            </v-card-text>
          </div>
        </v-expand-transition>
        <!-- <div class="text font-weight-bold" v-if = milestone.m_what_happend>
          {{milestone.m_what_happend}}
        </div>
        <div class="text font-weight-light" v-if = milestone.m_context>
          {{milestone.m_context}}
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

