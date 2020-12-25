/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import cookie from 'cookie'
import EventService from '@/services/EventService.js'

export const state = () => ({
  portfolio: null,
  gallery: [],
  work:[],
  hasWork: false,
  hasPortfolio: false,
  hasGallery: false
})
export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    },
    userHasPortfolio(state){
      return state.hasPortfolio
    },
    usersPortfolio(state){
      return state.portfolio
    },
    usersGallery(state){
      return state.gallery
    },
    userHasGallery(state){
      return state.hasGallery
    },
    usersWork(state){
      return state.work
    },
    userHasWork(state){
      return state.hasWork
    }
  }
  export const actions = {
    check_user_portfolio({commit, state}){
      console.log(state);
        if(state.auth.loggedIn) {
            EventService.getArtist(state.auth.user.username).then(res =>
            {
              commit('usersPortfolio',res.data)
            })
          }
          
      },
    check_user_gallery({commit, state}){
      console.log(state);
        if(state.auth.loggedIn) {
            EventService.getGalleries(state.auth.user.username).then(res =>
            {
              commit('usersGallery',res.data)
            })
        }
    },
    check_user_work({commit, state}){
      console.log(state);
        if(state.auth.loggedIn) {
            EventService.getMilestones(state.auth.user.username).then(res =>
            {
              commit('usersWork',res.data)
            })
        }
    },
    remove_portfolio({commit, state})
      {
        if(state.auth.loggedIn){
          commit('clearPortfolio')
        }
      },
    remove_gallery({commit, state})
      {
        if(state.auth.loggedIn){
          commit('clearGallery')
        }
      },
    remove_work({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearWork')
      }
    }
  }
    // Define Mutations
export const mutations = {
  usersPortfolio(state, artist)
  {
    if(artist)
    {
      state.portfolio = artist
      state.hasPortfolio = true
    }
  },
  usersGallery(state, gallery)
  {
    if(gallery.length)
    {
      state.gallery = gallery
      state.hasGallery = true}
  },
  usersWork(state, work)
  {
    if(work.length)
    {
      state.work = work
      state.hasWork = true}
  },
  clearPortfolio(state) //if user has portfolio change state to true
  {
    state.portfolio = null
    state.hasPortfolio = false
  },
  clearGallery(state) //if user has portfolio change state to true
  {
    {state.gallery =[]
    state.hasGallery = false}
  },
  clearWork(state) //if user has portfolio change state to true
  {
    {state.work =[]
    state.hasWork = false}
  },
}
    // authUserOnReload (state, user_id) {
    //   state.auth.user.access = user_id
        // perform login here and store user
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
