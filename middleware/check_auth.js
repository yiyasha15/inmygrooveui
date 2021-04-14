export default function ({$auth, store, redirect, route}) {
  // If the user is not authenticated
  if (!store.state.auth.loggedIn) {
    console.log(route.path);
    console.log(store.state.auth.loggedIn);
    redirect(`/login?redirect=${route.path}`)
  }
}