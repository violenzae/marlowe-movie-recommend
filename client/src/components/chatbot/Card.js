import React from 'react';

const Card = (props) => {
  console.log(props.payload);
  let imgSrc=`https://image.tmdb.org/t/p/w342/${props.payload.poster_path}`
  return (
  <div className="center" style={{width:342, display: 'inline-block'}}>
    
    
    <div className="card center">
 
      <div className="card-image" style={{width: 342}} >
        {props.payload.poster_path &&
        <img alt={props.payload.title} src={imgSrc}/>}
       
      </div>
      <span className="card-title">{props.payload.title}</span>
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