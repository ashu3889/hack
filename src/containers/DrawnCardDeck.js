	import React ,{Component} from 'react';
	import {shufflecards,sortcards,deletecards ,sortDrawnCards,shuffleDrawnCard} from '../action/action.js';
	import { connect } from "react-redux";
	import Card from '../component/Card.js';
	import OperationButton from '../component/OperationButton.js';


	export class ShuffleDeck extends Component{     

	    render(){

	        let element =this.props.carddata.map((item, i) => {  
	          return (
		         <Card  
		            data={item.value}
		            onCardSelect={() => ''} 
		            count={item.count} 
		            classtype={item.type}
		            key={i}
		            type='drawn'
		       />
		      )	 
	        })

	    return (
	        <div className="drawndeck">
	         <h1>Drawn Cards</h1>
	            <div  className="col-md-10"> {element}</div>
	            <OperationButton 
	                shuffle={() => {this.props.shuffleDrawnCard()}} 
	                sort={() => {this.props.sortDrawnCards()}} 
	                sortText="Sort Drawn  Deck" 
	                suffleText="Suffle Drawn Deck"
	            />
	        </div>
	    )
	  }
	}


	function mapStateToProps(state){
	    return  {
	       carddata : state.drawncards,
	     }
    };

	export default connect(mapStateToProps,{shufflecards,sortcards,deletecards,sortDrawnCards,shuffleDrawnCard})(ShuffleDeck);


