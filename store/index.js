/*just adding this index.js file inside the store directory enables vuex in nuxt */
import createPersistedState from "vuex-persistedstate";

// export const plugins = [myPlugin]
export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    }
  }
// import createPersistedState from "vuex-persistedstate";
// const store = createStore({
//     // ...
//     plugins: [createPersistedState()],
//   });