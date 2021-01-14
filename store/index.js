/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import EventService from '@/services/EventService.js'

export const state = () => ({
  artists: [],
  share_obj: null,
  sharing:[],
  portfolio: null, //store portfolio data of the logged in user
  bio: null, //store bio data of the logged in user
  gallery: [], //store gallery data of the logged in user
  highlights: [], //store Highlights data of the logged in user
  judging: [], //store bio data of the logged in user
  moments: [], //store bio data of the logged in user
  // artists_names: [],
  events: [], //store bio data of the logged in user
  hasHighlights: false, //if user has highlights data
  hasPortfolio: false, //if user has portfolio data
  hasBio: false,
  hasGallery: false, //if user has gallery data
  hasJudging: false,
  hasMoments: false,
  hasEvents: false,
  img_artists: '',
  // plugins: [createPersistedState()],
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
  // artists_names(state) {
  //   return state.artists_names
  // },
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
  userHasBio(state){
    return state.hasBio
  },
  usersBio(state){
    return state.bio
  },
  usersGallery(state){
    return state.gallery
  },
  userHasGallery(state){
    return state.hasGallery
  },
  usersHighlights(state){
    return state.highlights
  },
  userHasHighlights(state){
    return state.hasHighlights
  },
  usersJudging(state){
    return state.judging
  },
  userHasJudging(state){
    return state.hasJudging
  },
  usersMoments(state){
    return state.moments
  },
  userHasMoments(state){
    return state.hasMoments
  },
  usersEvents(state){
    return state.events
  },
  userHasEvents(state){
    return state.hasEvents
  },
  img_artists(state){
    return state.img_artists
  }
}
export const actions = {
  check_share_obj({commit, state}, share_obj){
    if(state.auth.loggedIn) {
    commit('check_share_obj', share_obj)
    }
  },
  check_artists({commit}){
    EventService.getArtists().then(res =>
    {
      commit('get_artists',res.data)
      // commit('get_artists_names',res.data)
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
    check_user_bio({commit, state}){
      if(state.auth.loggedIn) {
          EventService.getBio(state.auth.user.username).then(res =>
          {
            commit('usersBio',res.data)
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
  check_user_highlights({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getHighlights(state.auth.user.username).then(res =>
      {
        commit('usersHighlights',res.data)
      })
    }
  },
  check_user_judging({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getJudging(state.auth.user.username).then(res =>
      {
        commit('usersJudging',res.data)
      })
    }
  },
  check_user_moments({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getMoments(state.auth.user.username).then(res =>
      {
        commit('usersMoments',res.data)
      })
    }
  },
  check_user_events({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getEvents(state.auth.user.username).then(res =>
      {
        commit('usersEvents',res.data)
      })
    }
  },
  remove_portfolio({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearPortfolio')
      }
    },
  remove_bio({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearBio')
      }
    },
  remove_gallery({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearGallery')
      }
    },
  remove_highlights({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearHighlights')
    }
  },
  remove_judging({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearJudging')
    }
  },
  remove_moments({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearMoments')
    }
  },
  remove_events({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearEvents')
    }
  },
  remove_artists_sharing({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearArtistsSharing')
    }
  },
  remove_share_obj({commit, state})
  {
    if(state.auth.loggedIn && state.share_obj){
      commit('clear_share_obj',state.share_obj)
    }
  }
}
    // Define Mutations
export const mutations = {
  check_share_obj(state, share_obj){
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
  // get_artists_names(state, artists) 
  // {
  //   if(state.auth.loggedIn){
  //     console.log("artists.length: ",artists.length);
  //     console.log("state.artists_names.length: ",state.artists_names.length);
  //   if(artists.length == state.artists_names.length)
  //   {
  //     console.log("3");
  //   }
  //   else{
  //     console.log("4");
  //     artists.forEach(function (artist) {
  //       state.artists_names.push(artist.username)
  //   });
  //   //   state.artists_names = state.artists_names.filter(function(item) {
  //   //   return item !== state.auth.user.username
  //   // })
  //   // state.artists_names.filter(item => item !== state.auth.user.username)
  //   }
  // }
  // },
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
  usersBio(state, bio)
  {
    if(bio)
    {
      state.bio = bio
      state.hasBio = true
    }
  },
  usersGallery(state, gallery)
  {
    if(gallery.length)
    {
      state.gallery = gallery
      state.hasGallery = true}
  },
  usersHighlights(state, highlights)
  {
    if(highlights.length)
    {
      state.highlights = highlights
      state.hasHighlights = true}
  },
  usersJudging(state, judging)
  {
    if(judging.length)
    {
      state.judging = judging
      state.hasJudging = true}
  },
  usersMoments(state, moments)
  {
    if(moments.length)
    {
      state.moments = moments
      state.hasMoments = true}
  },
  usersEvents(state, events)
  {
    if(events.length)
    {
      state.events = events
      state.hasEvents = true}
  },
  clearPortfolio(state) //if user has portfolio change state to true
  {
    state.portfolio = null
    state.hasPortfolio = false
  },
  clearBio(state) //if user has portfolio change state to true
  {
    state.bio = null
    state.hasBio = false
  },
  clearGallery(state) //if user has portfolio change state to true
  {
    state.gallery =[]
    state.hasGallery = false
  },
  clearHighlights(state) //if user has portfolio change state to true
  {
    state.highlights =[]
    state.hasHighlights = false
  },
  clearJudging(state) //if user has portfolio change state to true
  {
    state.judging =[]
    state.hasJudging = false
  },
  clearMoments(state) //if user has portfolio change state to true
  {
    state.moments =[]
    state.hasMoments = false
  },
  clearEvents(state) //if user has portfolio change state to true
  {
    state.events =[]
    state.hasEvents = false
  },
  img_community(state, length) //if user has portfolio change state to true
  {
    state.img_artists = length
  },
  clearArtistsSharing(state) //if user has portfolio change state to true
  {
    state.artists = null
    state.sharing = null
    // state.artists_names = null
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
