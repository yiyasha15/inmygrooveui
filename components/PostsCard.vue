<template>
    <v-card class="lighten-4 pa-4 mt-6">
        <v-row>
        <v-col class="d-inline-flex">
            <v-avatar class="mr-2" >
                <img src="@/assets/martha.jpeg" alt="img">
            </v-avatar>
            <div>
            <div>@martha</div>
            <div class="caption">5 Jan 2021</div>
            </div>
        </v-col>
        </v-row>
        <v-row class="pa-4 mt-2">
            <div class="title">CYPHER SESSION jam organised by astro.</div>
            <div> Hey ya'll there's a jam this friday, check out the astro's insta page.</div>
        </v-row>
        <v-row class="pa-4">
        <v-spacer></v-spacer>
        <v-btn icon color="orange" >
        <v-icon>mdi-heart</v-icon> 34
        </v-btn>
        <v-btn class="ml-4" icon color="indigo" >
        <v-icon>mdi-comment</v-icon>5
        </v-btn>
        </v-row>
        <!-- <h4>Posts</h4> -->
    </v-card>
</template>