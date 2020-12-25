<template>
	<v-card width="500" class="mx-auto mt-6 ">
		<v-card-title class="justify-center">
			<h1 class="headline font-weight-black">Welcome to InMyGroove</h1>
		</v-card-title>
		<v-card-text>
			<v-form>
                <v-text-field v-model="registrationInfo.name" label="Name" prepend-icon="mdi-account-circle" />
				<v-text-field v-model="registrationInfo.email" label="Email" prepend-icon="mdi-account-circle" />
				<v-text-field       
                    v-model="registrationInfo.password"
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-form>
		</v-card-text>
		<v-card-actions class="mb-3 justify-center">
			<v-btn @click="registerUser(registrationInfo)" class="ml-4" color="yellow">Join the community</v-btn>
			<v-btn to='/login' class="ml-4 text-decoration-none" color="primary" >Already registered</v-btn>
			<!-- <v-spacer></v-spacer>
			<v-btn class="mr-4" color="info">Login</v-btn> -->
		</v-card-actions>
		<v-divider></v-divider>
		<p class="text-center">Inmygroove is currently a community of {{img_artists}} dancers.</p>
	</v-card>
</template>

<script>
import vuex from 'vuex'
import { mapGetters } from 'vuex'
import EventService from '@/services/EventService.js'
export default {
	auth : 'guest',
	data() {
      return {
        showPassword: false,
        registrationInfo: {
            name:'',
            email: '',
            password: ''
        },
      }
	},
	methods: {
      async registerUser(registrationInfo){
        try {
			if(registrationInfo.name =='' ){
				alert('Guess you forgot typing yo name.. love, Goku.');
			}
			else if(registrationInfo.email == ''){
				alert('Guess you forgot typing yo email.. love, Goku.');
			}
			else if(registrationInfo.password==''){
				alert('Guess you forgot typing yo password.. love, Goku.');
			}
			else{
				await this.$axios.post('v1/user/create/', registrationInfo)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
				let res = await this.$auth.loginWith('local', {
					data: registrationInfo
				})
					this.$auth.setUser(res.data)
					this.$auth.setToken('local',res.data.access);
					this.$auth.setRefreshToken('local', res.data.refresh);
					this.$store.dispatch("check_user_portfolio");
					this.$store.dispatch("check_user_gallery");
					this.$store.dispatch("check_user_work");
					this.$router.push('/');
				
			}
		} catch {
		
		}
      }
	},
	mounted() {
	this.$store.dispatch("check_artists");
	},
	computed: {
		...mapGetters(['img_artists'])
	}
	
}
</script>