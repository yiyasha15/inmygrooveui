/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import EventService from '@/services/EventService.js'

export const state = () => ({
  artists: [],
  artist_names: [],
  share_obj: null,
  sharing:[],
  portfolio: null, //store portfolio data of the logged in user
  gallery: [], //store gallery data of the logged in user
  work:[], //store work data of the logged in user
  hasWork: false, //if user has work data
  hasPortfolio: false, //if user has portfolio data
  hasGallery: false, //if user has gallery data
  img_artists: '',
  // plugins: [
  //   createPersistedState({
  //     getState: (key) => Cookies.getJSON(key),
  //     setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
  //   })
  // ]
})
export const getters = {
  artists(state) {
    return state.artists
  },
  artist_names(state) {
    return state.artist_names
  },
  share_obj(state){
    return state.share_obj
  },
  sharing(state) {
    return state.sharing
  },
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
  },
  img_artists(state){
    return state.img_artists
  }
}
export const actions = {
  shareid({commit, state}, share_obj){
    if(state.auth.loggedIn) {
      commit('shareid', share_obj)
    }
  },
  check_artists({commit}){
    EventService.getArtists().then(res =>
    {
      commit('get_artists',res.data)
      commit('get_artist_names',res.data)
      commit('img_community',res.data.length)
    })
    },
  check_sharing({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getEach1Teach1_user(state.auth.user.username).then(res =>
      {
        commit('get_sharing',res.data)
      })}
      },
  check_user_portfolio({commit, state}){
      if(state.auth.loggedIn) {
          EventService.getArtist(state.auth.user.username).then(res =>
          {
            commit('usersPortfolio',res.data)
          })
        }  
    },
  check_user_gallery({commit, state}){
      if(state.auth.loggedIn) {
          EventService.getGalleries(state.auth.user.username).then(res =>
          {
            commit('usersGallery',res.data)
          })
      }
  },
  check_user_work({commit, state}){
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
  },
  remove_artists_sharing({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearArtistssharing')
    }
  },
  remove_share_obj({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_share_obj')
    }
  }
}
    // Define Mutations
export const mutations = {
  shareid(state, share_obj){
    if(share_obj){
      state.share_obj = null
      state.share_obj = share_obj
    }
  },
  clear_share_obj(state, share_obj){
    if(share_obj){
      state.share_obj = null}
  },
  get_artists(state, artists) 
  {
    if(artists)
    {state.artists = artists}
  },
  get_artist_names(state, artists) 
  {if(state.auth.loggedIn){
    if(artists.length == state.artist_names.length+1)
    {}
    else{
      artists.forEach(function (artist) {
        state.artist_names.push(artist.username)
    });
      state.artist_names = state.artist_names.filter(function(item) {
      return item !== state.auth.user.username
    })
    // state.artist_names.filter(item => item !== state.auth.user.username)
    }
  }
  },
  get_sharing(state, sharing) 
  {
    if(sharing)
    {state.sharing = sharing}
  },
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
    state.gallery =[]
    state.hasGallery = false
  },
  clearWork(state) //if user has portfolio change state to true
  {
    state.work =[]
    state.hasWork = false
  },
  img_community(state, length) //if user has portfolio change state to true
  {
    state.img_artists = length
  },
  clearArtistssharing(state) //if user has portfolio change state to true
  {
    state.artists = null
    state.sharing = null
    state.artist_names = null
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
