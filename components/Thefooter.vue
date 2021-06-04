<template>
  <!-- <v-footer class="white" height="auto">
    <v-container>
      <v-card flat class="flex white">
        <hr class="my-4">
        <v-card-title>
          <v-col class="pa-0">
          <v-row class="justify-center align-center my-2">
          <v-btn class="mx-2" plain small text :to= "`/about_us/`">About</v-btn>
          <v-btn class="mx-2" plain small text :to= "`/team/`">Team</v-btn>
          <v-btn class="mx-2" plain small text :to= "`/contact/`">Contact Us</v-btn>
          </v-row>
          <v-row class="justify-center align-center my-4">
          <v-btn small icon class="text-decoration-none mx-2"  @click="openig" >
              <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn small icon class="text-decoration-none mx-2"  @click="openig" >
              <v-icon>mdi-facebook</v-icon>
          </v-btn>
          </v-row>
          <v-row class="justify-center align-center my-4">
          <h6 >&copy; InMyGroove {{ new Date().getFullYear() }}</h6><br>
          </v-row>
          </v-col>
        </v-card-title>
      </v-card>
      </v-container>
  </v-footer> -->
  <v-footer class="ma-6 white">
    <v-container>
      <!-- <img src="@/assets/vivi.png"  width="100px"> -->
      <v-divider set="inset"></v-divider>
      <!-- <img class="mt-4" src="@/assets/vivi.png"  width="100px"> -->
      <v-row class="mt-2">
        <v-col cols="12" sm="6" >
          <!-- :class="{'justify-center': $vuetify.breakpoint.smAndDown, 'justify-end mb-2 ': $vuetify.breakpoint.mdAndUp}" -->
          <v-row>
            <p class="mb-2">&copy; InMyGroove {{ new Date().getFullYear() }}</p><br>
          </v-row>
          <v-row>
            <p class="caption">developed by the dancers for the dancers.</p>
          </v-row>
        </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6">
        <v-row :class="{'justify-center': $vuetify.breakpoint.smAndDown, 'justify-end mb-2 ': $vuetify.breakpoint.mdAndUp}">
        <v-btn plain small text :to= "`/about_us/`">About</v-btn>
          <v-btn plain small text :to= "`/team/`">Team</v-btn>
          <v-btn plain small text :to= "`/contact/`">Contact Us</v-btn>
          <v-btn small icon class="text-decoration-none"  @click="openig" >
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