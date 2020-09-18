<template>
    <v-app>
        <div>
            <nuxt-child :artist="artist"/>
        </div>
        <v-container>
        <v-row>
            <v-col cols="12" sm="4" >
                <div class="font-weight-light display-1 xs12 pl-4">{{artist.artist_name}}</div>
            </v-col>
            <v-col class="px-0 d-flex align-end justify-end pr-4">
                <div>
                    <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/`">About</v-btn>
                    <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/work`"> Work </v-btn>
                    <v-btn class="elevation-0 white text-decoration-none" :to= "`/artists/${artist.id}/each1teach1`">Each 1 Teach 1 </v-btn>
                </div>
            </v-col>
        </v-row>
        <div v-if="artist.mystudent.length == 0">
            <div class="text font-weight-light mt-12">
                This is a page to connect with your teachers and students
            </div>
        </div>
        <div v-if="artist.myteacher.length == 0">
            <v-btn class="elevation-0 text-decoration-none mt-4" :to= "`/create/each1teach1/`">Add Teacher </v-btn>
        </div>
        <div v-if="artist.mystudent.length > 0">
            <div class="text font-weight-light">
                People who have taught me/influenced me 
                <hr>
            </div>
            <div class="d-flex flex-wrap">
                <div v-for = "mystudent in artist.mystudent" :key = "mystudent.index">
                    <TeachersCard :mystudent="mystudent" ></TeachersCard>
                    <!--bind the prop, "teacher" object (in studentCard component) with teacher iterator in for loop--> 
                </div>
            </div>
        </div>
        <br>
        <div v-if="artist.myteacher.length > 0">
            <div class="text font-weight-light">
                My students
                <hr>
            </div>
        
            <div class="d-flex flex-wrap">
                <div v-for = "myteacher in artist.myteacher" :key = "myteacher.index">
                    <StudentsCard :myteacher="myteacher" ></StudentsCard>
                    <!--bind the prop, "teacher" object (in studentCard component) with teacher iterator in for loop--> 
                </div>
            </div>
        </div>
        </v-container>
    </v-app>
</template>


<script>
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'


export default {
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard
    },
}
</script>


