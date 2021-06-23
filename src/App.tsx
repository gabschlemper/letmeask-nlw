import { Home } from './pages/home/Home';
import { NewRoom } from './pages/newRoom/NewRoom';
import { Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/rooms/new" component={NewRoom}/>
    </BrowserRouter>
    );
}

export default App;
