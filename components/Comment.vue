<template>
  <v-container class="ma-2 pa-8">
    <section>
          <div v-for="(comment, i) in comments" :key="i" class="d-flex align-start">
              <div v-for="artist in artists" :key ="artist.index">
                <nuxt-link :to="'/'+ comment.c_commenter">
                    <v-list-item-avatar v-if=" comment.c_commenter == artist.username">
                            <img :src = "artist.thumb" alt="img">
                    </v-list-item-avatar>
                </nuxt-link>
              </div>
              <div>
                <nuxt-link :to="'/'+ comment.c_commenter">
                <div class="subtitle grey--text">{{comment.c_commenter}}</div>
                </nuxt-link>
                <p class="commentFormat">{{comment.c_comment}}</p></div>
            <v-spacer></v-spacer>
        <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs"
                v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
                </div>
            </template>
            <v-list>
                <v-list-item
                v-if="comment.c_commenter == loggedInUser.username"
                class="text-decoration-none pl-6 pr-12"
                color="error"
                @click="deleted(comment)"
                >
                <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
                <v-list-item
                v-else
                class="text-decoration-none pl-6 pr-12"
                @click="reported(comment)"
                >
                <v-list-item-title>Report</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
            <!-- <v-divider v-if="i + 1 < comments.length"></v-divider> -->
        </div>
         </section>
    <v-snackbar v-model="delete_snackbar">
            Deleted.
            <template v-slot:action="{ attrs }">
            <v-btn
                color="error"
                icon
                v-bind="attrs"
                @click="delete_snackbar = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </template>
    </v-snackbar>
    <v-snackbar v-model="report_snackbar">
        Reported.
        <template v-slot:action="{ attrs }">
        <v-btn
            color="error"
            icon
            v-bind="attrs"
            @click="report_snackbar = false"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import store from 'vuex'
  export default {
    props: {
      comments: Array,
    },
    data() {
      return {
        show: false,
        report_snackbar: false,
        delete_snackbar :false
        }
    },
    mounted(){
      // console.log(this.events);
    },
    computed: {
        ...mapGetters(['loggedInUser', 'artists' ,'isAuthenticated']),
    },
    methods:{
      async deleted(comments){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access
            }
        };
        try {
            let response = await this.$axios.$delete("/v1/e1t1/comments/"+ comments.id, config)
            this.$store.dispatch("check_comments", comments.c_shareid)
            this.delete_snackbar =true
        } catch (e) {
            console.log(e);
        }
    },
    async reported(comments){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access
            }
        };
        try {
          this.report_snackbar =true
        } catch (e) {
            console.log(e);
        }
      }
    }
  }
</script>
<style scoped>
.commentFormat{
   white-space: pre-line;  
}
</style>

