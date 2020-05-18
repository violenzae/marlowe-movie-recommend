import React from 'react';
import axios from 'axios/index';

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
    const res = await axios.post(/api/df_text_query, {text});
  }

  async df_event_query(event) {

  }

  
  render(){
    return (
      <div style={{height: 400, width: 400, float: 'right'}}>
        <div id="chatbot" style={{height: '100%', width: '100%', overflow: 'auto'}}>
          <h2>Chatbot</h2>
          <input type="text"/>
        </div>
      </div>
    )
  }
}


export default Chatbot;