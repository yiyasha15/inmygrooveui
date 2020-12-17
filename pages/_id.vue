<template>
  <v-app>
    <v-container>
    <v-row>
        <v-col cols="12" sm="4" >
            <div class="font-weight-light display-1 xs12 pl-4">{{e1t1}}</div>
        </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
    head() {
        return {
            title: 'e1t1',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    // content: 'What you need to know about this e1t1 #' + this.e1t1.name
                }
            ]
        }
    },
    async asyncData({error, params}) {
      try {
        let each1teach1 = await EventService.getEach1Teach1(params.username)
        console.log(each1teach1.data);
        return {
            e1t1: each1teach1.data[0],
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    
}
</script>

<style scoped>

</style>
