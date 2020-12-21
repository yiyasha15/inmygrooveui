<template>
	<v-card width="500" class="mx-auto mt-12 ">
		<v-card-title class="justify-center align-center">
            <h3>Are you sure you want to sign out?
				<!-- <br> {{this.$auth.user.username}}? -->
				</h3>
		</v-card-title>
		<v-card-actions class="mb-3 justify-center">
			<v-btn class="ml-4" color="error" @click="signout">Sign Out</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex'
import vuex from 'vuex'
export default {
	methods:{
		signout(){
			this.$store.dispatch("remove_portfolio")
			this.$store.dispatch("remove_gallery")
			this.$auth.logout();
		}
	}
}
</script>