<template>
<v-card 
      class="ma-2 "
      :to="'/artists/'+ mystudent.s_student + '/teachers'" 
      max-width="190">
      <div v-if = mystudent.s_photo>
        <v-img :src="mystudent.s_photo" class="centerImage" width="180px" height="180px"/>
        <v-card-title v-if = mystudent.s_teacher>
        {{ mystudent.s_teacher }}
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
      name: 'TeachersCard',
      props: {
        mystudent: Object,
      },
    }
</script>

