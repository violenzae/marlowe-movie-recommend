import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import Landing from './pages/Landing';
// import About from './pages/About';
// import Shop from './shop/Shop';
import Header from './Header';
import Chatbot from './chatbot/Chatbot';


const App = () => {
  return (

    <React.Fragment>
      <div className="container" style={{height: '100%'}}>
        <div className="row" style={{margin: 'auto'}}>
          <div className="col s6"><Header /></div>
          <div className="col s6"><Chatbot/></div>
        </div>
      </div>
    </React.Fragment>

  )
}

export default App;