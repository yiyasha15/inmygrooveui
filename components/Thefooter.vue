<template>
  <v-footer class="ma-6 white">
    <v-container>
      <v-divider set="inset"></v-divider>
      <v-row class="mt-8">
        <v-col cols="12" sm="6">
          <v-row>
            <div class="mb-2">&copy; InMyGroove {{ new Date().getFullYear() }}</div><br>
          </v-row>
          <v-row>
            <p class="caption">developed by the dancers for the dancers.</p>
          </v-row>
        </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6">
        <v-row class="mx-4 justify-end">
        <v-btn plain small text :to= "`/about_us/`">About</v-btn>
        </v-row>
        <v-row class="mx-4 justify-end">
          <v-btn plain small text :to= "`/team/`">Team</v-btn>
        </v-row>
        <v-row class="mx-4 justify-end">
          <v-btn plain small text :to= "`/contact/`">Contact Us</v-btn>
        </v-row>
        <v-row class="justify-end mb-2">
          <v-btn small icon class="text-decoration-none mt-2 mx-4 mr-10"  @click="openig" >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>
        </v-row>
      </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  methods: {
    openig(){
            var url = 'https://www.instagram.com/inmygroove.dance/';
            var win = window.open(url, '_blank');
            win.focus();
        },
  }
}
</script>