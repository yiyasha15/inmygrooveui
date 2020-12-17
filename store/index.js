/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import cookie from 'cookie'
import EventService from '@/services/EventService.js'

export const state = () => ({
  portfolio: false
})
export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    },
    userHasPortfolio(state){
      return state.portfolio
    }
  }
  export const actions = {
    hi({commit}){
      let name = this.$auth.user.username
      console.log(name);
          let artist_response = EventService.getArtist(name)
          let artist = artist_response.data[0]
          console.log(artist.username);
          commit('userHasPortfolio', artist.username)
      },

    }
    // This one runs on the beginning of reload/refresh
    // nuxtServerInit ({ commit }, { req }) {
    //     if (req.headers.cookie) {
    //           const parsed = cookie.parse(req.headers.cookie)
    //           try {
    //               // get user id that you would set on auth as Cookie
    //               user_id = parsed.uid
    //           } catch (err) {
    //               // error here...
    //           }
    //     }

    //     // perform login and store info on vuex store
    //     commit('authUserOnReload', user_id)
    // },

// Define Mutations
export const mutations = {
  userHasPortfolio(state, username ) //if user has portfolio change state to true
  {
    if(username){
      state.portfolio = true
    }
  },
    // authUserOnReload (state, user_id) {
    //   state.auth.user.access = user_id
        // perform login here and store user
    }
