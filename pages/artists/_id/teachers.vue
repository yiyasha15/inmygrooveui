<template>
    <v-app>
        <div>
            <nuxt-child :artist="artist"/>
        </div>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <div>
                        {{artist.mystudent[0].s_appreciation}}
                    </div>
                    <!-- <div>
                        {{artist.mystudent.s_where_u_met}}
                    </div>
                    <div>
                        {{artist.mystudent.s_date}}
                    </div>
                    <div>
                        {{artist.mystudent.s_country}}
                    </div> -->
                <!-- <v-slider
                    v-model="slider"
                    :thumb-size="24"
                    thumb-label="always">
                    <template v-slot:thumb-label="{ value }">
                    {{ artist.myteacher.id}}
                    {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 9)] }}
                    </template>
                </v-slider> -->
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
     props: ['artist'],
    data () {
    return {
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
      slider: 50,
    }
  },
}
</script>