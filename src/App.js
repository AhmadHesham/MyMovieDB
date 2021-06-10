import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import AppBar from './components/appbar/AppBar'
import Login from './components/pages/Login';

function App() {
	const isLogged = useSelector(state => state.isLogged)
	return (
		<div>
			<Router>
				<AppBar />
				<Route exact path="/login" render={() => <Login />}/>
				<Route exact path="/" render={() => isLogged ? <h1>Hi</h1> : <Login />} />
				<Route exact path="/home" render={() => isLogged ? <h1>Hi</h1> : <Login />} />
			</Router>
		</div>
	);
}

export default App;
