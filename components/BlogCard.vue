<template>
<v-hover>
  <template v-slot="{ hover }" >
  <v-card class = "ma-1 pa-1 grey lighten-5" :elevation="hover ? 6 : 0" min-width="260" max-height="260">
    <v-container align="center">
    </v-container>
  </v-card>
  </template>
</v-hover>
</template>

<script>
    export default {
      name: 'BlogCard',
      }
</script>

