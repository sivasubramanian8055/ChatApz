import React, { Component } from 'react';
import Firebase,{db} from './firebase.js';
import {Modal,Button} from 'react-bootstrap';
import Chatbox from './chatBox';
class Contact extends Component {
  async componentDidMount(){
      this.setState({email:Firebase.auth().currentUser.email})
      await this.loadContacts()
      await this.loadAllUsers()
	}
  async loadAllUsers(){
    db.collection("user").
    onSnapshot((querySnapshot)=>{
        var users = [];
        querySnapshot.forEach((doc)=>{
            users.push({name:doc.data().name,email:doc.data().email});
        });
        this.setState({users:users})
    });
  }
  async loadContacts(){
    db.collection("user").doc(Firebase.auth().currentUser.email)
     .onSnapshot((doc)=>{
       if(doc.data()!==undefined)
        this.setState({contact:doc.data().contacts})
     })
  }
  updateChatRoom=(email1,email2,chat,name)=>{
    let obj={  senderMail:email2,
      chatRoom:chat,
      userName:name}
    db.collection("user").doc(email1).update({
     contacts: Firebase.firestore.FieldValue.arrayUnion(obj)
});
  }
  createChatRoom=(em,name)=>{
    var us=  Firebase.auth().currentUser
    let dates=new Date()
    var obj={
    message:"created by "+us.displayName,
    date:dates.toLocaleString("en-IN"),
    sentBy:this.state.email
    }
    db.collection("chatRoom").add(
      {chatHistory:[obj]}
    )
      .then((docRef)=>{
        console.log("Document successfully written!");
        this.updateChatRoom(this.state.email,em,docRef.id,name)
        this.updateChatRoom(em,this.state.email,docRef.id,us.displayName)

      })
      .catch((error)=>{
          console.error("Error updating document: ", error);
      });
  }
onFilter=()=>{
let filt=[]
let final=[]
this.state.contact.map((user)=>{
  filt.push(user.senderMail)
})
this.state.users.map((contact)=>{
  if((!filt.includes(contact.email))&&this.state.email!==contact.email)
  {final.push(contact)}
})
this.setState({users:final})
}
  constructor(props){
    super(props);
    this.state = {users:[],
                  modalShow:false,
                  email:'',
                  contact:[],
                  currentTexter:'',
                  messageSender:''
                }
  }
  render() {

    return (
      <div className="container-fluid mt-5">
      <div className="row">
      <div className="col-4">
      <div className="auth-inner adjust">
      {this.state.contact.length==0?<p>Add a contact now</p>:null}
      <p>
      {
        this.state.contact.map((data)=>{
            return(<Button variant="primary" style={{marginBottom:'10px'}} onClick={()=>{this.setState({currentTexter:data.chatRoom});this.setState({messageSender:data.userName})}}>{data.senderMail}</Button>)

        }

        )
      }
      </p>
     </div>
     <div className="auth-inner2 row">
     <Button variant="dark" style={{width:'100%'}} onClick={()=>{this.setState({modalShow:true});this.onFilter()}}>
      Add contacts
    </Button>
     </div>
     <Modal
       show={this.state.modalShow}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       onHide={()=>{this.setState({modalShow:false})}}
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
           Users
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <p>
          {
            this.state.users.map((user)=>{
              if(Firebase.auth().currentUser.email!==user.email)
              return(<div className="col"> <Button onClick={()=>{this.setState({modalShow:false});this.createChatRoom(user.email,user.name)}}>{user.email}</Button></div>)

            }

            )
          }
         </p>
       </Modal.Body>
     </Modal>
     </div>
     <Chatbox chatID={this.state.currentTexter} messageSender={this.state.messageSender}/>
     </div>
      </div>
    );
  }
}

export default Contact;
