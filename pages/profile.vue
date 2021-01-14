<template>
    <v-container>
        <h3>Profile</h3>
        Name : {{this.loggedInUser.username}}
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    computed :{
        ...mapGetters([ 'loggedInUser'])
    }
}
</script>