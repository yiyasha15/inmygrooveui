/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import EventService from '@/services/EventService.js'

export const state = () => ({
  artists: [], //array of artists in img community
  share_obj: null, //object to edit e1t1 data
  editing_obj: null, //object to edit data
  sharing:[], //e1t1 onject
  portfolio: null, //store portfolio data of the logged in user
  bio: null, //store bio data of the logged in user
  // gallery: [], //store gallery data of the logged in user
  highlights: [], //store Highlights data of the logged in user
  journey: [], //store Highlights data of the logged in user
  // judging: [], //store bio data of the logged in user
  // moments: [], //store bio data of the logged in user
  // events: [], //store bio data of the logged in user
  list_of_artists: [],
  personalMessages: [],
  hasHighlights: false, //if user has highlights data
  hasJourney: false, 
  hasPortfolio: false, //if user has portfolio data
  hasBio: false, //if user has bio data
  // hasGallery: false, //if user has gallery data
  // hasJudging: false, //if user has judging data
  // hasMoments: false, //if user has moments data
  // hasEvents: false, //if user has events data
  hasPersonalMessages: false,
  img_artists: '', //no. of artist in img community
  comments_list: [],
  love: '',
  dope: '',
  info:''

})
export const getters = {
  artists(state) {
    return state.artists
  },
  list_of_artists(state) {
    return state.list_of_artists
  },
  share_obj(state){
    return state.share_obj
  },
  editing_obj(state){
    return state.editing_obj
  },
  sharing(state) {
    return state.sharing
  },
  personalMessages(state){
    return state.personalMessages
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
  usersJourney(state){
    return state.journey
  },
  userHasJourney(state){
    return state.hasJourney
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
  userHasPersonalMessages(state){
    return state.hasPersonalMessages
  },
  usersEvents(state){
    return state.events
  },
  userHasEvents(state){
    return state.hasEvents
  },
  img_artists(state){
    return state.img_artists
  },
  comments_list(state){
    return state.comments_list
  },
  love(state){
    return state.love
  },
  dope(state){
    return state.dope
  },
  info(state){
    return state.info
  }
}
export const actions = {
  check_likes({commit}, id){
    EventService.getLikes(id).then(res =>
      {
        commit('check_likes',res.data)
      })
  },
  check_comments({commit}, id){
    EventService.getComments(id).then(res =>
      {
        commit('check_comments',res.data)
      })
  },
  check_share_obj({commit, state}, share_obj){
    if(state.auth.loggedIn) {
    commit('check_share_obj', share_obj)
    }
  },
  check_editing_obj({commit, state}, editing_obj){
    if(state.auth.loggedIn) {
    commit('check_editing_obj', editing_obj)
    }
  },
  check_artists({commit}){
    EventService.getArtists().then(res =>
    {
      commit('get_artists',res.data)
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
  // check_user_gallery({commit, state}){
  //     if(state.auth.loggedIn) {
  //         EventService.getGalleries(state.auth.user.username).then(res =>
  //         {
  //           commit('usersGallery',res.data)
  //         })
  //     }
  // },
  check_user_highlights({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getHighlights(state.auth.user.username).then(res =>
      {
        commit('usersHighlights',res.data)
      })
    }
  },
  check_user_journey({commit, state}){
    if(state.auth.loggedIn) {
      EventService.getJourney(state.auth.user.username).then(res =>
      {
        commit('usersJourney',res.data)
      })
    }
  },
  // check_user_judging({commit, state}){
  //   if(state.auth.loggedIn) {
  //     EventService.getJudging(state.auth.user.username).then(res =>
  //     {
  //       commit('usersJudging',res.data)
  //     })
  //   }
  // },
  // check_user_moments({commit, state}){
  //   if(state.auth.loggedIn) {
  //     EventService.getMoments(state.auth.user.username).then(res =>
  //     {
  //       commit('usersMoments',res.data)
  //     })
  //   }
  // },
  // check_user_events({commit, state}){
  //   if(state.auth.loggedIn) {
  //     EventService.getEvents(state.auth.user.username).then(res =>
  //     {
  //       commit('usersEvents',res.data)
  //     })
  //   }
  // },
  check_personal_room({commit, state}, id)
  {
    if(state.auth.loggedIn) {
      EventService.getPersonalMessages(id).then(res =>
      {
        commit('get_personal_messages',res.data)
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
  // remove_gallery({commit, state})
  //   {
  //     if(state.auth.loggedIn){
  //       commit('clearGallery')
  //     }
  //   },
  remove_highlights({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearHighlights')
    }
  },
  remove_journey({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearJourney')
    }
  },
  // remove_judging({commit, state})
  // {
  //   if(state.auth.loggedIn){
  //     commit('clearJudging')
  //   }
  // },
  // remove_moments({commit, state})
  // {
  //   if(state.auth.loggedIn){
  //     commit('clearMoments')
  //   }
  // },
  // remove_events({commit, state})
  // {
  //   if(state.auth.loggedIn){
  //     commit('clearEvents')
  //   }
  // },
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
  },
  remove_editing_obj({commit, state})
  {
    if(state.auth.loggedIn && state.editing_obj){
      commit('clear_editing_obj',state.editing_obj)
    }
  },
  remove_comments({commit, state})
  {
    if(state.auth.loggedIn && state.comments_list){
      commit('clear_comments',state.comments_list)
    }
  },
  remove_reactions({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_reactions')
    }
  },
  remove_personal_messages({commit, state})
  {
    if(state.auth.loggedIn && state.personalMessages){
      commit('clear_personal_messages',state.personalMessages)
    }
  },
  
}
    // Define Mutations
export const mutations = {
  check_likes(state, likes){
    if(likes){
      state.love = likes.filter(likes => likes.l_type == "LO");
      state.dope = likes.filter(likes => likes.l_type == "DO");
      state.info = likes.filter(likes => likes.l_type == "IF");
    }
  },
  check_comments(state, comments_list){
    if(comments_list){
      state.comments_list = comments_list
    }
  },
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
  check_editing_obj(state, editing_obj){
    if(editing_obj){
      state.editing_obj = null
      state.editing_obj = editing_obj
    }
  },
  clear_editing_obj(state, editing_obj){
    if(editing_obj){
      state.editing_obj = null}
  },
  clear_comments(state) //if user has portfolio change state to true
  {
    state.comments_list =[]
  },
  get_artists(state, artists) 
  {
    if(artists)
    {state.artists = artists}
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
  usersJourney(state, journey)
  {
    if(journey.length)
    {
      state.journey = journey
      state.hasJourney = true}
  },
  // usersJudging(state, judging)
  // {
  //   if(judging.length)
  //   {
  //     state.judging = judging
  //     state.hasJudging = true}
  // },
  // usersMoments(state, moments)
  // {
  //   if(moments.length)
  //   {
  //     state.moments = moments
  //     state.hasMoments = true}
  // },
  // usersEvents(state, events)
  // {
  //   if(events.length)
  //   {
  //     state.events = events
  //     state.hasEvents = true}
  // },
  get_personal_messages(state, personalMessages)
  {
    state.personalMessages = personalMessages
    state.hasPersonalMessages = true
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
  // clearGallery(state) //if user has portfolio change state to true
  // {
  //   state.gallery =[]
  //   state.hasGallery = false
  // },
  clearHighlights(state) //if user has portfolio change state to true
  {
    state.highlights =[]
    state.hasHighlights = false
  },
  clearJourney(state) //if user has portfolio change state to true
  {
    state.journey =[]
    state.hasJourney = false
  },
  // clearJudging(state) //if user has portfolio change state to true
  // {
  //   state.judging =[]
  //   state.hasJudging = false
  // },
  // clearMoments(state) //if user has portfolio change state to true
  // {
  //   state.moments =[]
  //   state.hasMoments = false
  // },
  // clearEvents(state) //if user has portfolio change state to true
  // {
  //   state.events =[]
  //   state.hasEvents = false
  // },
  img_community(state, length) //if user has portfolio change state to true
  {
    state.img_artists = length
  },
  clearArtistsSharing(state) //if user has portfolio change state to true
  {
    state.artists = null
    state.sharing = null
    state.list_of_artists = null
  },
  clear_personal_messages(state)
  {
    state.personalMessages = []
    state.hasPersonalMessages = false
  },
  clear_reactions(state)
  {
    state.love = ''
    state.dope = ''
    state.info = ''
  },
}