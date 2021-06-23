import { createContext, useState, useEffect } from 'react'
import { Home } from './pages/home/Home';
import { NewRoom } from './pages/newRoom/NewRoom';
import { Route, BrowserRouter } from 'react-router-dom'
import { auth, firebase } from "./services/firebase"
import { AuthContextType, User } from "./types/types"

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>()

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
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContext.Provider>
    </BrowserRouter>
    );
}

export default App;
