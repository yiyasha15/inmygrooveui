export default async function({$auth, redirect, store}) {
    let user = $auth.user;
    if(user && user.admin) {
      // let the user in
    } else {
      store.dispatch('snackbar/setSnackbar', {color: 'error', text: "Please login first."})
      redirect('/login')
    }
  }