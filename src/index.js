import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './index.css';
import Home from './home';
import Login    from './login';
import Register from './register';
import firebase, {auth} from './firebase.js'
import Contact from './contact'
class AppRouter extends Component{
	constructor(props){
		super(props);
		this.state = {user: null}
		this.logOutUser = this.logOutUser.bind(this);
	}
	componentDidMount(){
		auth.onAuthStateChanged(user => {
			if(user){
				this.setState({
					user
				});
			}
		});
	}

	logOutUser = () => {
		firebase.auth().signOut()
			.then(window.location = "/");
	}

	render(){
		return(
			<Router>
				<div className="app">

						{!this.state.user &&
							<div>
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container">
				<Link className="navbar-brand" to="#">ChatzApp</Link>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to={"/login"}>Login</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={"/register"}>Register</Link>
						</li>
					</ul>
				</div>
			</div>
			</nav>
							</div>
						}

						{this.state.user &&
							<div>
							<nav className="navbar navbar-expand-lg navbar-light">
								<div className="container">
									<Link className="navbar-brand" to="#">ChatzApp</Link>
									{this.state.user.displayName!==null?<b style={{paddingTop:'1px'}}>{'Logged in as : '+this.state.user.displayName}</b>:null}
									<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
										<ul className="navbar-nav ml-auto">
											<li className="nav-item">
												<Link className="nav-link" onClick={this.logOutUser}>Logout</Link>
											</li>
										</ul>
									</div>
								</div>
								</nav>
							<Contact/>
								</div>
						}

					<Switch>
						<Route path="/" exact render={() => <Home user={this.state.user}/>} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const NoMatch = ({location}) => <div>No route match for {location.pathname}</div>;

ReactDOM.render(
	<AppRouter />,
	document.getElementById('root')
);
