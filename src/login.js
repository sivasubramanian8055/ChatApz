import React from 'react';
import {Link} from 'react-router-dom';
import firebase from './firebase';


class Login extends React.Component{
  onEmailChange=(event)=>{
      this.setState({email:event.target.value})
    }
  onPasswordChange=(event)=>{
      this.setState({password:event.target.value})
    }
    handleSubmit =(event)=> {
      let stateSet=(er)=>{
        this.setState({error:er})
      }
		event.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email,this.state.password)
			.then(user => {
				this.props.history.push('/');
			})
			.catch((error)=> {
				stateSet(error)
			});
	}
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null
		}
	}
  render(){
		return(
			<div>
        <form onSubmit={this.handleSubmit} className="auth-inner mt-5" style={{marginLeft:'540px'}}>
                <h3>Sign In</h3>

                <div className="form-group" onSubmit={this.handleSubmit}>
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.onEmailChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.onPasswordChange} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                  <p>Don't have an account yet? <Link className="login-btn" to="/register">Register here</Link></p>
                </p>
            </form>
            {this.state.error && <p className="error-message" style={{textAlign:'center'}}>{this.state.error.message}</p>}
			</div>
		);
	}

}

export default Login;
