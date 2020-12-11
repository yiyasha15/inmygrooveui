/*just adding this index.js file inside the store directory enables vuex in nuxt */
import createPersistedState from "vuex-persistedstate";

// export const plugins = [createPersistedState()]
// export const state = () => ({
//   auth: {
//     loggedIn: false,
//     user: null
//   }
// })
import * as Cookies from 'js-cookie'
import cookie from 'cookie'
export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    }
  }
//   export const actions = {
//     // This one runs on the beginning of reload/refresh
//     nuxtServerInit ({ commit }, { req }) {
//         if (req.headers.cookie) {
//               const parsed = cookie.parse(req.headers.cookie)
//               try {
//                   // get user id that you would set on auth as Cookie
//                   user_id = parsed.uid
//               } catch (err) {
//                   // error here...
//               }
//         }

//         // perform login and store info on vuex store
//         commit('authUserOnReload', user_id)
//     },
// }

// // Define Mutations
// export const mutations = {
//     authUserOnReload (state, user_id) {
//       state.auth.user.access = user_id
//         // perform login here and store user
//     }
// }
