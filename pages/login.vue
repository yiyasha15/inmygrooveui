<template>
	<v-card width="500" class="mx-auto mt-6 ">
		<v-card-title class="justify-center">
			<h1 class="headline font-weight-black">Welcome to InMyGroove</h1>
		</v-card-title>
		<v-card-text>
			<v-form>
				<v-text-field label="Username" prepend-icon="mdi-account-circle" />
				<v-text-field       
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-form>
		</v-card-text>
		<v-card-actions class="mb-3 justify-center">
			<v-btn class="ml-4" color="yellow">Join the community</v-btn>
			<!-- <v-spacer></v-spacer>
			<v-btn class="mr-4" color="info">Login</v-btn> -->
		</v-card-actions>
		<v-divider></v-divider>
		<p class="text-center">Inmygroove is currently a community of __ dancers.</p>
	</v-card>
	<!-- <div class="mb-3 justify-center">
		<p>Inmygroove is currently a community of __ dancers.</p>
	</div> -->
</template>

<script>
export default {
	name: 'WelcomePage',
	data() {
		return {
			showPassword: false
		}
	}
}
</script>