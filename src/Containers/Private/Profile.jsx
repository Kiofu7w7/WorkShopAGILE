import { getAuth, updateProfile } from 'firebase/auth'
import React from 'react'

const Profile = () => {

  const funcion = async () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: "Santiago Buitrago Giraldo", photoURL: "https://lh3.googleusercontent.com/a/ACg8ocIGKkrOTisORwBZeUsTeeqVsynijCz6lcUZVo98rjHCmQ=s96-c", address: "calle 22#22-33"
    }).then(() => {
      console.log(auth)
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

  }

  return (
    <div>
      <button onClick={()=> funcion()}>actualizar</button>
      <button>ver</button>
    </div>
  )
}

export default Profile