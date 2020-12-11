<template>
	<v-card width="500" class="mx-auto mt-12 ">
		<v-card-title class="justify-center align-center">
            <h3>Are you sure you want to sign out?
				<!-- <br> {{this.$auth.user.username}}? -->
				</h3>
		</v-card-title>
		<v-card-actions class="mb-3 justify-center">
			<v-btn class="ml-4" color="error" @click="signout">Sign Out</v-btn>
			<!-- <v-spacer></v-spacer>
			<v-btn class="mr-4" color="info">Login</v-btn> -->
		</v-card-actions>
		{{this.$auth.user.access}}
	</v-card>
</template>

<script>
export default {
	methods:{
		signout(){
			this.$auth.logout();
		}
	}
}
</script>