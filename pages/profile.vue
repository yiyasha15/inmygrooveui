<template>
    <v-container>
        <h3>Profile</h3>
        Name : {{this.$auth.user}}
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed :{
        ...mapGetters([ 'loggedInUser'])
    }
}
</script>