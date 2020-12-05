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
		<p class="text-center">Inmygroove is currently a community of __ dancers.</p>
	</v-card>
</template>

<script>
import vuex from 'vuex'
export default {
	auth : 'guest',
	methods: {
      async registerUser(registrationInfo){
        try {
			console.log("clicked",registrationInfo);
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
				let res = await this.$auth.loginWith('local', {
					data: registrationInfo
				})
				this.$auth.setUser(res.data)
				 this.$auth.setToken('local',res.data.access);
				 this.$auth.setRefreshToken('local', res.data.refresh);
				 console.log('status', this.$auth.$state);	 
				 console.log('status', this.$auth.$storage.$state);
				console.log(this.$auth.loggedIn);
				console.log(this.$auth.user);
				console.log("New user registered.", res.data.username);
				this.$router.push('/');
			}
		} catch {
		
		}
      }
    },
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
	name: 'WelcomePage',
}
</script>