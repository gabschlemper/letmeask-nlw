import { Home } from './pages/home/Home';
import { NewRoom } from './pages/newRoom/NewRoom';
import { Route, BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from "./contexts/AuthContext"

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
    );
}

export default App;
