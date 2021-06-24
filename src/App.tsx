import { Home } from './pages/home/Home';
import { NewRoom } from './pages/newRoom/NewRoom';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import {AuthContextProvider} from "./contexts/AuthContext"
import { Room } from './pages/room/Room';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
        <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
    );
}

export default App;
