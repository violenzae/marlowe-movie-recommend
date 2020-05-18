import React from 'react';
import axios from 'axios/index';
import Message from './Message';

class Chatbot extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
  }
  
  async df_text_query(text) {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: text
        }
      }
    }

    this.setState({messages: [...this.state.messages]}, says);
    const res = await axios.post(/api/df_text_query, {text});
    
    for (let msg of res.data.fulfillmentMessages){
      says = {
        speaks: 'bot',
        msg: msg
      }
      this.setState({messages: [...this.state.messages]}, says);
    }
  }

  async df_event_query(event) {
    const res = await axios.post('/api/df_event_query', {event});

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'me',
        msg: msg
      }
      this.setState({messages: [...this.state.messages, says]});
    }

  }

  renderMessages(stateMessages) {
    if(stateMessages) {
      return stateMessages.map((message, i) => {
        return <Message key={i} speaks = {message.speaks} text ={message.msg.text.text} />
      }) 
    } else {
      return null;
    }
  }
  
  render(){
    return (
      <div style={{height: 400, width: 400, float: 'right'}}>
        <div id="chatbot" style={{height: '100%', width: '100%', overflow: 'auto'}}>
          <h2>Chatbot</h2>
          {this.renderMessages(this.state.messages)}
          <input type="text"/>
        </div>
      </div>
    )
  }
}


export default Chatbot;