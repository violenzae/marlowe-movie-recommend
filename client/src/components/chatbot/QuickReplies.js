import React from 'react';
import QuickReply from './QuickReply';
import Logo from '../../img/mag.png';

class QuickReplies extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClick = (event, payload, text) => {
    this.props.replyClick(event, payload, text);
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this._handleClick} reply={reply}/>
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i);
      })
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="col s12 m10 offset-m2 l8 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
          <a className="btn-floating btn-large waves-effect waves-light red" >
            <img src={Logo}/>
          </a>
          
          <div id="quick-replies" className="col s10">
            {this.props.text && <p>
              {this.props.text.stringValue}
              </p>}
              {this.renderQuickReplies(this.props.payload)}
          </div>
        </div>
      </div>  
    </div>
    );
  }

}

export default QuickReplies;