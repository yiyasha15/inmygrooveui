/*
 This script uses javascript axios module to communicate with the backend API 
 baseURL is as the name suggests, it is the baseURL where our api OPENS its endpoints 
 All other branches starts from this root path i.e: http://localhost:8000/api/v1 
 getArtists() function fetches the data available at baseURL/portfolio and 
 getartist() {a single artist's data}, fetches from baseURL/portfolio/id 
*/

import axios from 'axios'

const apiClient1 = axios.create({
    baseURL: 'http://localhost:8000/api/v1',  //3000 earlier
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json' // double quote and single quotes r 
        //important in json 
    }
})

export default {
    getArtists() {
        return apiClient1.get('/artist/portfolios')
    },
    getArtist(username) {
        // return apiClient1.get('/artist/portfolios/' + username)
        return apiClient1.get('/artist/portfolios/' + username)
    },
    getBio(username){
        return apiClient1.get('/artist/bios/' + username)
    },
    // getGalleries(username) {
    //     return apiClient1.get('/artist/gallery/?search=' + username)
    // },
    getHighlights(username) {
        return apiClient1.get('/artist/highlights/?username=' + username)
    },
    getJourney(username) {
        return apiClient1.get('/artist/journey/?username=' + username)
    },
    // getJudging(username) {
    //     return apiClient1.get('/artist/jw/?search=' + username)
    // },
    // getMoments(username) {
    //     return apiClient1.get('/artist/moments/?search=' + username)
    // },
    // getEvents(username) {
    //     return apiClient1.get('/artist/events/?search=' + username)
    // },
    getEach1Teach1s(){
        return apiClient1.get('/e1t1/sharing/')
    },
    getPersonalMessages(id){
        return apiClient1.get('/e1t1/qna/?shareid=' + id)
    },
    getEach1Teach1_user(username) {
        return apiClient1.get('/e1t1/sharing/?search=' + username)
    },
    getEach1Teach1(id) {
        return apiClient1.get('/e1t1/sharing/' + id)
    },
    getLikes(id){
        return apiClient1.get('/e1t1/likes/?search=' + id)
    },
    getComments(id){
        return apiClient1.get('/e1t1/comments/?search=' + id)
    }
}