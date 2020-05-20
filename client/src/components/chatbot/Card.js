import React from 'react';

const Card = (props) => {
  console.log(props.payload);
  return (
  <div style={{float: 'left', paddingRight:30, width:270}}>
    <div className="card">
      <div className="card-image" style={{width: 240}} >
        <img alt={props.payload.title} src={props.payload.poster_path}/>
        <span className="card-title">{props.payload.title}</span>
      </div>
      <div className="card-content">
        <p>{props.payload.overview}</p>
        
      </div>
       <div className="card-action">
       <p><a>{props.payload.release_date}</a></p>
       </div>
     </div>
  </div>
  )
}

export default Card;