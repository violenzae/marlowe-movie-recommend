import React from 'react';
import Logo from '../../img/mag.png';

const Message = (props) => {
  return (
  <div className="col s12 m8 offset-m2 l6 offset-l3">
    <div className="card-panel grey lighten-5 z-depth-1">
      <div className="row valign-wrapper">
        {props.speaks==='bot' &&

          <a className="btn-floating btn-large waves-effect waves-light red">
            <img src={Logo}/>
          </a>

        }
        <div className="col s10">
          <span className="black-text">
            {props.text}
          </span>
        </div>
        {props.speaks==='me' &&
          <a className="btn-floating btn-large waves-effect waves-light red">
            {props.speaks}
          </a>
        }
      </div>
    </div>
  </div>
  )
};

export default Message;