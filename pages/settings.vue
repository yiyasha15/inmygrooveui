<template>
    <v-app> 
        <v-container>
            <h3 class="ml-4">Settings</h3>
            <v-card width="700" class="ma-6 pa-2">
            <div class="ma-6">
                <h3 class="mt-6">User</h3>
                <v-form>
                    <v-text-field v-model="info.name" label="Name" prepend-icon="mdi-account-circle" />
                    <v-text-field v-model="info.email" label="Email" prepend-icon="mdi-account-circle" />
                    <v-text-field v-model="info.username" label="Username" prepend-icon="mdi-account-circle" />
                </v-form>
            <v-btn class="text-decoration-none" outlined rounded color="indigo" dark
                @click="save_information">Save Information</v-btn>
            <v-snackbar v-model="snackbar"> Changes saved.
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Close
                </v-btn>
            </template>
            </v-snackbar>
            </div>
            </v-card>
            <v-card width="700" class="ma-6 pa-2">
            <div class="ma-6">
                <h3 class="mt-6">Account</h3>
                <v-form>
                    <v-text-field v-model="info.password" label="Set new password"  />
                    <v-text-field v-model="info.password" label="Confirm password"  />
                </v-form>
            <v-btn class="text-decoration-none" outlined rounded color="indigo" dark
                @click="set_new_password">Set New Password</v-btn>
            </div>
            </v-card>
            <v-card width="700" class="ma-6 pa-2">
            <div class="ma-6">
                <h3 class="mt-6">Delete Account</h3>
                <!-- <ul>Deleting your account will make you loose all your data.</ul>
                <ul>Your username will be available yo anyone.</ul> -->
            <v-btn class="text-decoration-none" outlined rounded color="error" dark
                @click="delete_account">Delete Account</v-btn>
            </div>
            </v-card>
        </v-container>
    </v-app>
</template>
<script>
export default {
    middleware : 'check_auth',
    data() {
      return {
        snackbar: false,
        showPassword: false,
		hasName: false,
        info: {
            name:'',
            email: '',
            password: ''
        },
      }
    },
     mounted() {
    this.$store.dispatch("check_user_portfolio");
  },
    methods: {
        async save_information() {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            try {
                // let response = await this.$axios.$delete("/v1/artist/gallery/25", config)
                //user,username, email changes
                console.log("changed successfully");
                this.snackbar = true;
                this.$router.push("/settings");
            } catch (e) {
                console.log(e);
            }
            
        }, 
        async set_new_password() {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            try {
                let formPassword = new FormData();
                formPassword.append('name', this.$store.state.auth.user.username);
                formPassword.append('password', this.info.password)
                formPassword.append('email', this.info.email)
                await this.$axios.$put("/v1/user/update/", formPassword, config)
                //new password
                console.log("new password changed successfully");
                this.snackbar = true;
                this.$router.push("/settings");
            } catch (e) {
                console.log(e);
            }
            
        },  
        async delete_account() {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access
                }
            };
            try {
                // let response = await this.$axios.$delete("/v1/artist/gallery/25", config)
                //delete account
                console.log("Deleted account successfully");
                this.snackbar = true;
                this.$router.push("/settings");
            } catch (e) {
                console.log(e);
            }
            
        }      
    }
}
</script>