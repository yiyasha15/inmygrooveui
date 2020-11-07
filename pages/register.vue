<template>
	<!-- <UserAuthForm buttonText="Join the Community" :submitForm="loginUser"/> -->
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
			<!-- <v-spacer></v-spacer>
			<v-btn class="mr-4" color="info">Login</v-btn> -->
		</v-card-actions>
		<v-divider></v-divider>
		<p class="text-center">Inmygroove is currently a community of __ dancers.</p>
	</v-card>
</template>

<script>
// import UserAuthForm from '@components/UserAuthForm'
export default {
	// components:{
	// 	UserAuthForm
	// },
	methods: {
      async registerUser(registrationInfo){
        try {
          await this.$axios.post('v1/user/create/', registrationInfo)
          await this.$auth.loginWith('local', {
            data: registrationInfo
		  })
		  console.log("New user registered.");
        //   this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing up, ${this.$auth.user.name}`})
          this.$router.push('/');
        } catch {
        //   this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'There was an issue signing up.  Please try again.'})
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
        // ...validations
      }
    },
	name: 'WelcomePage',
}
</script>