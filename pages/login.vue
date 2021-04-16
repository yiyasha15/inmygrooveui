<template>
	<v-card width="500" class="mx-auto mt-6 ">
		<v-card-title class="justify-center">
			<h1 class="headline font-weight-black">Welcome to InMyGroove</h1>
		</v-card-title>
		<v-card-text>
			<v-form>
                <!-- <v-text-field v-if="hasName" v-model="userInfo.name" label="Name" prepend-icon="mdi-account-circle" /> -->
				<v-text-field v-model="userInfo.email" label="Email" prepend-icon="mdi-account-circle" />
				<v-text-field       
                    v-model="userInfo.password"
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-form>
		</v-card-text>
		<v-card-actions class="mb-3 justify-center">
			<v-btn @click="submitForm(userInfo)" class="px-4" rounded color="yellow">Log in</v-btn>
			<v-btn to='/register' class="ml-4 px-4 text-decoration-none" rounded color="primary" >Register</v-btn>
			<!-- <v-spacer></v-spacer>
			<v-btn class="mr-4" color="info">Login</v-btn> -->
		</v-card-actions>
		<v-divider></v-divider>
		<p class="text-center pa-4">Inmygroove is currently a community of {{img_artists}} dancers.</p>
	</v-card>
</template>

<script>
import vuex from 'vuex'
import { mapGetters } from 'vuex'
import EventService from '@/services/EventService.js'
export default {
	methods:{
		async submitForm(userInfo){
          let res = await this.$auth.loginWith('local', {
            data: userInfo
		  }).then(res => {
			console.log(res.data);
			this.$auth.setUser(res.data)
			this.$auth.setUserToken(res.data.access)
			this.$auth.setRefreshToken('local', res.data.refresh);
			this.$store.dispatch("check_user_portfolio");
			this.$store.dispatch("check_user_bio");
			let redirect_url = this.$route.query.redirect || '/'
			this.$router.push(redirect_url)
		})
		}
	},
	data() {
      return {
        showPassword: false,
		hasName: false,
        userInfo: {
          email: '',
          password: ''
        },
        // ...validations
      }
	},
	mounted() {
	this.$store.dispatch("check_artists");
	},
	computed: {
		...mapGetters(['img_artists'])
	},
	layout: 'login'
}
</script>