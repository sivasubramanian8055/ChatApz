import React from 'react';
import Firebase,{db} from './firebase.js';
import {Button,Form} from 'react-bootstrap';
class Chatbox extends React.Component{
	async componentDidMount(){
      this.setState({email:Firebase.auth().currentUser.email})
      await this.loadChats()
	}
	async componentDidUpdate(prevProps) {

  if (this.props.chatID !== prevProps.chatID) {
    await this.loadChats()
  }
}
	async loadChats(){
		let stateSet=(arr)=>{
			this.setState({chats:arr.chatHistory})
		}
		if(this.props.chatID!=''){

		db.collection("chatRoom").doc(this.props.chatID)
    .onSnapshot(function(doc) {
			stateSet(doc.data())
    });

	}
	}

	sendMessage=(event)=>{
	event.preventDefault();
	let dates=new Date()
	let obj={
		message:this.state.message,
		date:dates.toLocaleString("en-IN"),
		sentBy:this.state.email
	}
	this.setState({message:''})
	console.log(this.props.chatID)
	if(this.props.chatID!=='')
	{db.collection("chatRoom").doc(this.props.chatID).update({
	chatHistory: Firebase.firestore.FieldValue.arrayUnion(obj)
});
}
}

	constructor(props){
    super(props);
    this.state = {chats:[],
			            message:'',
									email:''
                }
  }
	render(){
		return(
			<div className="col">
			<b>{this.props.messageSender}</b>
			<div className="auth-inner3 adjust">
				{this.props.messageSender===''?<p>Add a contact or click a contact to initiate chat</p>:null}
				{this.state.chats.map((chat)=>{
					if(chat.sentBy===this.state.email)
					return(<div style={{textAlign:'right',paddingRight:'8px',wordWrap:'break-word',maxWidth:'870px',paddingBottom:'4px'}}><div>{chat.message}</div><sub className="forgot-password">{chat.date}</sub></div>)
					else
					return(<div style={{wordWrap:'break-word',maxWidth:'870px',paddingBottom:'4px'}}><div>{chat.message}</div><div className="forgot-password1">{chat.date}</div></div>)
				})}
				</div>
				<div className="auth-inner4">
				{this.props.chatID!==''?<Form onSubmit={this.sendMessage}>
				<input type="text" style={{width:'90%'}} value={this.state.message} onChange={(event)=>{this.setState({message:event.target.value})}}/>
				<button type="submit" class="btn btn-dark" style={{width:'10%'}}>Submit</button>
				</Form>:null}
			</div>
			</div>
		);
	}
}
export default Chatbox;
