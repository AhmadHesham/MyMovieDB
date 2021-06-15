import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import AppBar from './components/appbar/AppBar'
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Search from './components/pages/Search'

function App() {
	const isLogged = useSelector(state => state.isLogged)
	return (
		<div style={{height: '100vh'}}>
			<Router>
				<AppBar />
				<Route exact path="/login" render={() => <Login />}/>
				<Route exact path="/" render={() => isLogged ? <Home /> : <Login />} />
				<Route exact path="/home" render={() => isLogged ? <Home /> : <Login />} />
				<Route exact path="/search" render={() => <Search />} />
			</Router>
		</div>
	);
}

export default App;
