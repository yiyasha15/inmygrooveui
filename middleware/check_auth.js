export default function ({$auth, store, redirect, route}) {
  // If the user is not authenticated
  if (!store.state.auth.loggedIn) {
    console.log('im heree ',route.path);
    console.log('am i logged in',store.state.auth.loggedIn);
    redirect(`/login?redirect=${route.path}`)
  }
}