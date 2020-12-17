
// import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'
// import cookie from 'cookie'
// // // access the store, http request and environment from the Nuxt context
// // // https://nuxtjs.org/api/context/
// export default ({ store, req }) => {
// createPersistedState({
// key: 'auth_cookie', // choose any name for your cookie
// paths: [
// // persist the access_token and refresh_token values from the "auth" store module
// 'this.store.state.auth.loggedIn',
// 'store.state.auth.user'
// ],
// storage: {
// // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
// getItem: key => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key],
// // js-cookie can handle setting both client-side and server-side cookies with one method
// // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
// setItem: (key, value) => Cookies.set(key, value, { expires: 14, secure:  process.env.NODE_ENV === 'production' }),
// // also allow js-cookie to handle removing cookies
// removeItem: key => Cookies.remove(key)
// }
// })(store)
// }