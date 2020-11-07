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
			<v-btn @click="submitForm(userInfo)" class="ml-4" color="yellow">{{ buttonText }}</v-btn>
			<!-- <v-spacer></v-spacer>
			<v-btn class="mr-4" color="info">Login</v-btn> -->
		</v-card-actions>
		<v-divider></v-divider>
		<p class="text-center">Inmygroove is currently a community of __ dancers.</p>
	</v-card>
</template>

<script>
//   import validations from "@/utils/validations";
  export default {
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
    props: ["submitForm", "buttonText", "hasName"]
  }
</script>
