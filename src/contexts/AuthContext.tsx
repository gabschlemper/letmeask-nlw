import { createContext, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";
import { AuthContextType, User, AuthContextProviderProps } from "./types"

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      } 

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        } 

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
      console.log(result)
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}