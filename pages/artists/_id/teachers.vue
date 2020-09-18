<template>
    <v-app>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                <v-slider
                    v-model="slider"
                    :thumb-size="24"
                    thumb-label="always"
                >
                    <template v-slot:thumb-label="{ value }">
                    {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 9)] }}
                    </template>
                </v-slider>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
    data () {
    return {
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
      slider: 50,
    }
  },
}
</script>