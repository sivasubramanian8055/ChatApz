import React from 'react';
import Firebase,{db} from './firebase.js';
class Home extends React.Component{
	render(){
		return(
			<div className="home-container">
			{Firebase.auth().currentUser===null?
				<h1 style={{paddingTop:'300px',paddingLeft:'600px'}}>Welcome to ChatzApp</h1>:null
			}
			</div>
		);
	}
}
export default Home;
