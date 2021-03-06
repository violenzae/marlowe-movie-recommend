import React from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';
import Card from './Card';
import QuickReplies from './QuickReplies';
import TitleNeon2 from '../../img/neon2.png'


const cookies = new Cookies();

class Chatbot extends React.Component {
  messagesEnd;
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      messages: [],
      genre: "",
      year: "",
      cards: null,
      fields: null,
      params: false,
      intro: false
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
  }

  endIntro = () => {
    this.setState({intro: false});
  }

  async df_text_query(text) {
    await this.resolveAfterXSeconds(1);
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: text,
        },
      },
    };

    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("/api/df_text_query", {
      text: text,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says], fields: res.data});
    }

    if(this.state.fields.allRequiredParamsPresent == true) {
      if (this.state.fields.parameters.fields.genre) {
      let genre = res.data.parameters.fields.genre.stringValue.toLowerCase();
      let year = res.data.parameters.fields.year.stringValue;

      switch (genre){
        case "science fiction":
          this.setState({genre: "878", year: year})
          break;
        case "action":
          this.setState({genre: "28", year: year})
          break;
        case "comedy":
          this.setState({genre: "35", year: year})
          break;
        case "crime":
          this.setState({genre: "80", year: year})
          break;
        case "documentary":
          this.setState({genre: "99", year: year})
          break;
        case "western":
          this.setState({genre: "37", year: year})
          break;
        case "romance":
          this.setState({genre: "10749", year: year})
          break;
        default:
          this.df_text_query("i'm a big dumb dumb who can't read good!");
          break;
        }

        if (parseInt(year) <= 1900 || parseInt(year) >= 2021){
          this.df_text_query("I am either from the future or have traumatic brain injury and don't know how numbers work.");
          
        }
      }
    }
  }

  async df_event_query(event) {
    await this.resolveAfterXSeconds(1);
    const res = await axios.post("/api/df_event_query", {
      event: event,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }
  


 async componentDidMount() {
    this.setState({intro: true});
    await this.resolveAfterXSeconds(1);
    this.df_event_query("Welcome");

  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.textInput.current.focus();
    if (this.state.params === true) {
      let year = this.state.year;
      let genre = this.state.genre;
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=280512bf8cd265d4e94449e922ca180e&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&year=${year}&with_genres=${genre}`)
          .then(result => { 
            
            this.setState({ cards: result.data.results});
            this.setState({params: false});


          })
          .catch(error => {
            console.log(error);
          });
      
        
      }
    }
  

  _handleQuickReplyPayload = (event, payload, text) => {
    event.preventDefault();
    event.stopPropagation();
    
    switch (payload) {
      case "recommend_yes":
        this.setState({params: true})
        this.df_event_query("SHOW_RECOMMENDATIONS")
        break;
      default:
        this.df_text_query(text);
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <div style={{padding: 30, alignItems: 'center', textAlign: 'center' }} key={i}><Card style={{display: 'inline-block'}} key={i} payload={card} /></div>);
  }

  redo = () => {
    this.df_event_query("Welcome")
    this.setState({cards: null})
  }

  renderOneMessage(message, i) {
    
    
     if (this.state.cards) {
      let cards = this.state.cards;

      return (

                <div style={{textAlign: "center"}}>
                  {this.renderCards(
                    cards
                  )}
                  <button onClick={this.redo} className="btn red">Again?</button>
                </div>
      );
    } 

    

    if (message.msg && message.msg.text && message.msg.text.text) {
      
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );}
    
    else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.quick_replies) {
      return <QuickReplies
      text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
      key={i}
      replyClick = {this._handleQuickReplyPayload}
      speaks = {message.speaks}
      payload={message.msg.payload.fields.quick_replies.listValue.values} />
    }
  }

  resolveAfterXSeconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, x = 1000);
    });
  }

  renderMessages(stateMessages) {
    if(this.state.intro) {
      return(
        <div style={{color: 'white'}}>
          <p>Marlowe is a bot detective with a passion for sniffing and discovering the unknown and obscure. Answer his questions, and he'll find you the most obscure movies that fit your request.</p>
          <p>You can also shoot the breeze with him for a stiff drink of hard-boiled whimsy.</p>
          <button className="btn black" style={{border: 'solid white 1px'}} onClick={this.endIntro}>Hmm..</button>
        </div>
      )
    }
    if(this.state.cards){
      return this.renderOneMessage();
    }
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
      } else {
      return null;
    }
  }

  handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  };

  render() {
    return (
      <React.Fragment>
      <div style={{height: '100%', width: '100%'}}>
        <nav className="black" style={{paddingBottom: "30px"}}>
          
            <div className="nav-wrapper  black ">
              <a className="brand-logo right">
                <img  src={TitleNeon2}/>
              </a>
            </div>
          </nav>
        <div
          id="chatbot"
          style={{ height: "500px", width: "100%", overflow: "auto" }}
        >
          
          {this.renderMessages(this.state.messages)}
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
         
        </div>
        <div className="col s12">
        <input style={{margin:0, paddingLeft: '1%', paddingRight: '1%', width: '98%', color: 'white'}} placeholder="Type a message"
            ref={this.textInput}
            type="text"
            onKeyPress={this.handleInputKeyPress}
          />
        </div>
        
      </div>
      <div>
      <p style={{color: 'white'}}>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
      </div>
      </React.Fragment>
    );
  }
}


export default Chatbot;