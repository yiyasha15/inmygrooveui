<template>
   <v-container>
        <v-toolbar flat class="mt-6">
            <nuxt-link :to="'/'" >
             <img src="@/assets/inmygroove.png" height="80px" width="90px">
            </nuxt-link>
            <!-- <v-btn medium class="ma-6 yellow text-decoration-none elevation-0" to='/'>InmyGroove</v-btn> -->
        <v-spacer></v-spacer>
        <!-- <v-btn outlined rounded color="indigo" class="mr-2 text-decoration-none" to="/myhood" >My hood</v-btn> -->
        <!-- {{userHasPortfolio}} -->
        <div v-if="isAuthenticated">
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 text-decoration-none" to="/write_blog" >Write a blog</v-btn> -->
            <!-- <v-btn icon color="indigo" class="mr-2 text-decoration-none" to="/notifications" @click="check">
            <v-badge
            color="green"
            content="6"
            ><v-icon>mdi-bell</v-icon></v-badge>
            </v-btn> -->
            <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                    </div>
                </template>
                <v-list>
                    <!-- <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :to="item.url"
                    class="text-decoration-none"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item> -->
                    <v-list-item
                    :to="'/'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>In My Groove</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/'+ loggedInUser.username"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-avatar size="36">
                    <img
                        :src = "usersPortfolio.thumb" 
                        alt="img"
                    >
                    </v-avatar>
                    <v-list-item-title class="pl-2">@{{ loggedInUser.username }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="!userHasPortfolio"
                    :to="'/create/about'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Create a portfolio</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/about'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Edit your portfolio</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item
                    :to="'/notifications'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Notifications</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    :to="'/write_blog'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Write a Post</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    :to="'/settings'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    :to="'/logout'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Log Out</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <div v-else>
            <v-btn rounded color="yellow" class="mr-2 text-decoration-none" to="/login">Log in</v-btn>
            <v-btn rounded color="indigo" dark class="mr-2 text-decoration-none" to="/register">Register</v-btn>
        </div>
        </v-toolbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import store from 'vuex'
export default {
    // mounted(){
    //     if(this.$auth.getToken('local')){
    //         this.$router.push("/login");
    //     }
    // },
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio'])
    },
}
</script>