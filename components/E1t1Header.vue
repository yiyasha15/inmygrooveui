<template>
   <v-container>
        <v-toolbar flat class="mt-6">
            <nuxt-link :to="'/'" >
             <img src="@/assets/inmygroove.png" height="80px" width="90px">
            </nuxt-link> 
            <v-spacer></v-spacer> 
            <v-btn v-if="isAuthenticated" icon color="indigo" class="mr-2 text-decoration-none" to="/notifications">
            <!-- <v-badge color="green" content="0"> -->
            <v-icon>mdi-bell</v-icon>
            <!-- </v-badge> -->
            </v-btn>
            <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                    </div>
                </template>
                <v-list>
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
                    :to="'/create'"
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
        <div v-if="!isAuthenticated">
            <v-btn rounded color="yellow" class="mr-2 text-decoration-none" to="/login">Log in</v-btn>
            <v-btn rounded color="indigo" dark class="mr-2 text-decoration-none" to="/register">Register</v-btn>
        </div>
        </v-toolbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio'])
    },
}
</script>