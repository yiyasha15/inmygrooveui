<template>
   <v-container>
        <v-toolbar flat class="mt-6">
            <a href='/'> <img src="@/assets/inmygroove.png" height="80px" width="90px"></a>
            <!-- <v-btn medium class="ma-6 yellow text-decoration-none elevation-0" to='/'>InmyGroove</v-btn> -->
        <v-spacer></v-spacer>
        <div v-if="isAuthenticated">
            <!-- <v-btn outlined rounded color="indigo" class="mr-2 text-decoration-none" to="/write_blog" >Write a blog</v-btn> -->
            <!-- <v-btn  outlined rounded color="error" class="mr-2 text-decoration-none" to="/" @click="check" >Check</v-btn> -->
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
                    :to="'/'+ loggedInUser.username"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>@{{ loggedInUser.username }}</v-list-item-title>
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
            <!-- <v-btn  outlined rounded color="error" class="mr-2 text-decoration-none" @click="checkk" >Check</v-btn> -->
            <v-btn outlined rounded color="indigo" class="mr-2 text-decoration-none" text to="/login">Log in</v-btn>
            <v-btn rounded color="indigo" dark class="mr-2 text-decoration-none" to="/register">Register</v-btn>
            <!-- log in
            register -->
        </div>
        </v-toolbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
//     data() {
//     return {
//         items: [
//             { title: 'Profile', url:'/profile' }, 
//             { title: 'Notifications', url:'/notifications' },
//             { title: 'Write a blog', url:'/write_blog' },
//             { title: 'Log Out' , url:'/logout'},
//         ],
      
//     }
// },
    methods: {
        handleClick(index) {
        this.items[index].click.call(this)
        },
        check()
        {
            let key = this.$auth.getToken('local');
            let key2 = this.$auth.getRefreshToken('local');
            if(key)
            {
                console.log('you should be logged in');
                
            }
            console.log('hi', key);
            console.log('hi re', key2);
            console.log('youclicked',this.$auth.user.username);
            console.log('youclicked',this.$auth.$state);
            console.log('youclicked',this.$auth);
            // console.log('youclicked',this.$auth.getState.username);
            // console.log('youclicked',this.$auth.user.username);
            
        },
        checkk()
        {
            let key = this.$auth.getToken('local');
            let key2 = this.$auth.getRefreshToken('local');
            if(key)
            {
                console.log('you should be logged in');
                // let curr_user = res from token;
                // await this.$auth.loginWith('local', {
				// 	data: curr_user
                // })
				// this.$auth.setUser(curr_user.data)
				//  this.$auth.setToken('local',curr_user.data.access);
				//  this.$auth.setRefreshToken('local', curr_user.data.refresh);
            }
            console.log('hi', key);
            console.log('hi re', key2);
            console.log('youclicked',this.$auth);
            // console.log('youclicked',this.$auth.getState.username);
            // console.log('youclicked',this.$auth.user.username);
            
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
}
</script>