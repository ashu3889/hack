	import React from "react";
	import styles from '../cards.css';

	const OperationButton = ({ shuffle, sort , suffleText ,sortText}) => {
	  return(
	    <div  className="col-md-2">
	        <button className="btn btn-success shufflecard" onClick ={() => shuffle()}>{suffleText}</button>
	        <button className="btn btn-primary sortcard" onClick ={() => sort()}>{sortText}</button>
	    </div>
	    )
	};

	export default OperationButton;