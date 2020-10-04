import React from 'react';
import Firebase,{db} from './firebase.js'
import { Link } from 'react-router-dom';


class Register extends React.Component{
  onUserNameChange=(event)=>{
      this.setState({username:event.target.value})
    }
  onEmailChange=(event)=>{
      this.setState({email:event.target.value})
    }
  onPasswordChange=(event)=>{
      this.setState({password:event.target.value})
    }
  handleSubmit=(event)=>{
    event.preventDefault();
    let stateSet=(er)=>{
      this.setState({error:er})
    }

    const userData=()=>{

      db.collection("user").doc(this.state.email).set({
      name: this.state.username,
      email: this.state.email,
      contacts:[]
      })
        .then(()=>{
          console.log("Document successfully written!");
          	this.props.history.push('/');
        })
        .catch((error)=>{
          stateSet(error)
        });
    }
    Firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email,this.state.password)
			.then(() => {
				const user = Firebase.auth().currentUser;
				user
					.updateProfile({displayName:this.state.username})
					.then(() => {
            userData()
					})
					.catch((error)=> {
						stateSet(error)
					});
			})
			.catch((error)=> {
				stateSet(error)
			});
  }

	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			error: null
		}
  }

  render(){
    return(
			<div className="auth--container">
        <form onSubmit={this.handleSubmit} className="auth-inner mt-5" style={{marginLeft:'540px'}}>
                <h3></h3>

                <div className="form-group" onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter Username" onChange={this.onUserNameChange} />
                </div>

                <div className="form-group" onSubmit={this.handleSubmit}>
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.onEmailChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.onPasswordChange} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <p className="forgot-password text-right">
                <p>Already have an account? <Link className="login-btn" to="/login">Login here</Link></p>
                </p>
            </form>
            {this.state.error && <p className="error-message" style={{textAlign:'center'}}>{this.state.error.message}</p>}
			</div>
		);
	}
}
export default Register;
