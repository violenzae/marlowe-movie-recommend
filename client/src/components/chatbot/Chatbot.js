import React from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';
import Card from './Card';
import QuickReplies from './QuickReplies';

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
      params: false
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
    console.log(cookies.get("userID"));
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
      this.setState({ messages: [...this.state.messages, says] });
    }


       if (res.data.parameters.fields.year.stringValue != "" &&  res.data.parameters.fields.year.stringValue != null ) {
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
          this.df_text_query("i'm not following your instructions ;)");
          break;
      
      }
      console.log("queryresult: ", res.data.parameters);
      console.log(this.state.genre);
      console.log(this.state.year);
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

  
    // for (let card of res.data
  


 async componentDidMount() {
    await this.resolveAfterXSeconds(1);
    this.df_event_query("Welcome");

  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.textInput.current.focus();
    if (this.state.params === true) {
      let year = this.state.year;
      let genre = this.state.genre;
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&year=${year}&with_genres=${genre}`)
        // .then(result => this.setState({cards: result.data}));
          .then(result => { 
            
            this.setState({ cards: result.data.results});
            console.log(result.data.results);
            console.log("cards: ", this.state.cards);
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
      case "training_masterclass":
        this.df_event_query("MASTERCLASS");
        break;
      case "recommend_yes":
        //async here to make api call
        this.setState({params: true})
        this.df_event_query("SHOW_RECOMMENDATIONS")
        break;
      default:
        this.df_text_query(text);
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card} />);
  }

  renderOneMessage(message, i) {
    
     if (this.state.cards) {
      let cards = this.state.cards;
      console.log("cards: ", cards);

      return (
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                <a
                  href="/"
                  className="btn-floating btn-large waves-effect waves-light red"
                >
                </a>
              </div>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width:
                      cards.length *
                      270,
                  }}
                >
                  {this.renderCards(
                    cards
                  )}
                </div>
              </div>
            </div>
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
      <div style={{ height: '40%', width: '100%', border: '1px solid lightgrey'}}>
        <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">Marlowe</a>
            </div>
          </nav>
        <div
          id="chatbot"
          style={{ height: "100%", width: "100%", overflow: "auto" }}
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
        <input style={{margin:0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} placeholder="Type a message"
            ref={this.textInput}
            type="text"
            onKeyPress={this.handleInputKeyPress}
          />
        </div>
      </div>
    );
  }
}


export default Chatbot;