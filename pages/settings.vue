<template>
    <v-app> 
        <v-container>
            <h3>Settings</h3>
            <div class="mt-4">
                Delete gallery image.<br>
            <v-btn class="text-decoration-none" rounded color="indigo" dark
                @click="submit">Delete</v-btn>
            <v-snackbar v-model="snackbar" >
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>
            </div>
        </v-container>
    </v-app>
</template>
<script>
export default {
    middleware : 'auth',
    data(){
        return {

            snackbar: false,
            text: 'Deleted successfully.'
        }
    },
    methods: {
        async submit() {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$auth.user.access
                }
            };
            try {
                let response = await this.$axios.$delete("/v1/artist/gallery/5", config)
                console.log("Deleted successfully");
                this.snackbar = true;
                this.$router.push("/settings");
            } catch (e) {
                console.log(e);
            }
            
        }        
    }
}
</script>