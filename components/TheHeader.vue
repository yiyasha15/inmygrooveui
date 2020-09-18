<template>
   <v-container>
        <v-toolbar flat class="mt-6">
            <a href='/'> <img src="@/assets/inmygroove.png" height="80px" width="90px"></a>
            <!-- <v-btn medium class="ma-6 yellow text-decoration-none elevation-0" to='/'>InmyGroove</v-btn> -->
        <v-spacer></v-spacer>
        <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
        <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs"
            v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
            </div>
        </template>
        <v-list>
            <v-list-item
            v-for="(item, index) in items"
            :key="index"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
        </v-toolbar>
    </v-container>
</template>
<script>
export default {
    data() {
    return {
        items: [
          { title: 'Login', url:'' },
          { title: 'Sign Up' , url:''},
        ],
      
    }
}
}
</script>