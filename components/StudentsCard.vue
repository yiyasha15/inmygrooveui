<template>
<v-card 
      class="ma-2 "
      :to="'/artists/'+ myteacher.s_student + '/teachers'" 
      max-width="190" >
      <div v-if = myteacher.s_photo>
        <v-img :src="myteacher.s_photo" class="centerImage" width="180px" height="180px"/>
        <v-card-title v-if = myteacher.s_photo>
        {{ myteacher.s_student }}
        </v-card-title>
        <!-- <v-card-subtitle v-if = milestone.m_context>
          {{milestone.m_context}}
        </v-card-subtitle> -->
        <v-card-actions>
        </v-card-actions>
      </div>        
  </v-card>
</template>

<script>
    export default {
      name: 'StudentsCard',
      props: {
        myteacher: Object,
      },
      
    }
</script>

