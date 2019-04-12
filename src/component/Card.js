	import React from "react";
	import styles from '../cards.css';

	const Card = ({ onCardSelect, item,classtype,data,type }) => {
		return(
			<div  className="col-md-1" >
			  <div className={`card template ${classtype }`}> 
			  {
			  	(type === 'deck')
			  	? <button type="button"  onClick={() => onCardSelect(item)} className="btn btn-xs btn-danger selecticon"><span className="glyphicon glyphicon-check"></span>&nbsp;</button>
			    : ''
			  }      
			  <span className="rank">{data}</span></div>
			</div>
	    )
    };

    export default Card;



