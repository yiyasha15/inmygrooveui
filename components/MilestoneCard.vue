<template>
  <v-card width=300px class = "ma-1 pa-1" >
    <v-container>
        <div>
          <div v-if = milestone.m_photo>
            <v-img :src="milestone.m_photo" class="centerImage" width = "300px"/>
            <div class="text font-weight-light" v-if = milestone.m_context >
              {{milestone.m_context}}
            </div>
          </div>
        </div>
    </v-container>             
  </v-card>
</template>

<script>
    export default {
      name: 'MilestoneCard',
      props: {
        milestone: Object,
      },
      
    }
</script>

