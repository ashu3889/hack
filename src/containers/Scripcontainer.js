	import React ,{Component} from 'react';
	import {} from '../action/action.js';
	import { connect } from "react-redux";
	import Card from '../component/Card.js';
	import OperationButton from '../component/OperationButton.js';


	export class CardDeckBody extends Component{

	    constructor(props){
              super(props);
          }


componentWillReceiveProps(nextProps) {

;

}

	    render(){
	    

	        return(
	           <div>

              <p>hello data </p>
	           </div>
	        )
	    }
	}

	function mapStateToProps(state){
	    return  {
	       carddata : state.cards,
	     }
    };

	export default connect(mapStateToProps,{})(CardDeckBody);


