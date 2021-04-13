<template>
    <v-card class="lighten-4 pa-4 mt-6">
        <v-row>
        <v-col class="d-inline-flex">
            <!-- <div v-for="artist in artists" :key ="artist.index">
                <nuxt-link :to="'/'+ comment.c_commenter">
                    <v-list-item-avatar v-if=" comment.c_commenter == artist.username">
                            <img :src = "artist.thumb" alt="img">
                    </v-list-item-avatar>
                </nuxt-link>
              </div> -->
            <v-avatar class="mr-2" >
                <img src="@/assets/martha.jpeg" alt="img">
            </v-avatar>
            <div>
                {{post}}
            <div>@{{post.owner}}</div>
            <div class="caption">5 Jan 2021</div>
            </div>
        </v-col>
        </v-row>
        <v-row class="pa-4 mt-2">
            <div class="title">{{post.title}}</div>
            <div>{{post.content}}</div>
        </v-row>
        <v-row class="pa-4">
        <v-spacer></v-spacer>
        <v-btn icon color="orange" >
        <v-icon>mdi-heart-outline</v-icon> 3
        </v-btn>
        <v-btn class="ml-4" icon color="indigo" >
        <v-icon>mdi-comment-outline</v-icon>5
        </v-btn>
        </v-row>
        <!-- <h4>Posts</h4> -->
    </v-card>
</template>
<script>
export default {
    props: 
    {
        post: Object
    }
}
</script>