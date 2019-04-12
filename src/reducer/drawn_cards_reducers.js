	import _ from "lodash";

	export default function(state= [], action){
	    
	    switch (action.type){
	        case 'AddDrawnCard' :
	            let newstate = state.concat(action.payload);
	             return newstate ;
	        case 'SortDrawnCard' :
	            return _.sortBy(state, 'count');
	        case 'ShufflerawnCard' :
	            return _.shuffle(state);
	        default:
	            return state;
	    }
	}