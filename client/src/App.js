import './App.css';
import { Route } from 'react-router';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Details from './components/Details/Details';
import Search from './components/Search/Search';
import CreateVideoGame from './components/CreateVideoGame/CreateVideoGame';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={ LandingPage } />
      <Route path='/videogames' component={ NavBar } />
      <Route exact path='/videogames' component={ Home } />
      <Route path='/videogames/details/:id'  render={({match}) => <Details id={match.params.id}/>} />
      <Route exact path='/videogames/search' component={Search} />
      <Route exact path='/videogames/create' component={CreateVideoGame} />
    </div>
    
  );
}

export default App;
//con el Route vamos a tener un erutamiento dinamico y a la vez renderizan un componente