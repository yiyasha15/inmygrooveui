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
        return apiClient1.get('/artist/portfolio')
    },
    getArtist(username) {
        return apiClient1.get('/artist/portfolio/?search=' + username)
    },
    getGalleries(username) {
        return apiClient1.get('/artist/gallery/?search=' + username)
    },
    getMilestones(username) {
        return apiClient1.get('/artist/work/?search=' + username)
    },
    getEach1Teach1s(){
        return apiClient1.get('/e1t1')
    },
    getEach1Teach1(username) {
        return apiClient1.get('/e1t1/?search=' + username)
    }
}